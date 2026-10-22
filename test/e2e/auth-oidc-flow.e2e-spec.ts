import { Controller, Get, INestApplication, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { Test } from '@nestjs/testing'
import fastifyCookie from '@fastify/cookie'
import fastifySession from '@fastify/session'
import fastifyPassport from '@fastify/passport'
import { createServer, Server } from 'http'
import { AddressInfo } from 'net'
import { AuthController } from '../../src/common/auth/auth.controller'
import { OktaStrategy } from '../../src/common/auth/okta.strategy'
import { OidcAuthGuard } from '../../src/common/guards/oidc-auth.guard'
import { passportCompatHook } from '../../src/common/plugins/fastify-plugins'

/**
 * Regression tests for dmi-api-admin-ui#138: a blank page after re-login through Okta.
 *
 * - Admin API requests without a session started their own OIDC flow, and passport-openidconnect kept a single
 *   pending state per session, so any request during the Okta round trip broke the login in progress.
 * - A failed callback answered an empty 200 instead of redirecting: Nest sets the route's 200 before the handler
 *   and passport's `failureRedirect` reused it.
 *
 * Runs the real AuthController and OktaStrategy against a fake identity provider, with a session store as slow as
 * the MongoDB one.
 */

const STORE_LATENCY_MS = 25
const BASE_URL = 'https://dmi.example.com/dmi'
const CLIENT_ID = 'client-id'

class SlowStore {
  private readonly sessions = new Map<string, any>()

  get (sid: string, cb: (err: Error | null, session?: any) => void): void {
    const session = this.sessions.get(sid)
    setTimeout(() => cb(null, session != null ? JSON.parse(session) : null), STORE_LATENCY_MS)
  }

  set (sid: string, session: any, cb: (err?: Error | null) => void): void {
    this.sessions.set(sid, JSON.stringify(session))
    setTimeout(() => cb(null), STORE_LATENCY_MS)
  }

  destroy (sid: string, cb: (err?: Error | null) => void): void {
    this.sessions.delete(sid)
    setTimeout(() => cb(null), STORE_LATENCY_MS)
  }
}

@UseGuards(OidcAuthGuard)
@Controller('admin')
class TestAdminController {
  @Get('providers')
  providers (): string[] {
    return ['antech-v6']
  }
}

/** Token and userinfo endpoints of a fake OpenID provider. The ID token is not signed: the strategy doesn't check. */
function startIdentityProvider (): Promise<{ server: Server; issuer: string }> {
  const server = createServer((req, res) => {
    const issuer = `http://127.0.0.1:${(server.address() as AddressInfo).port}`
    const claims = {
      iss: issuer,
      sub: 'user-1',
      aud: CLIENT_ID,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
      preferred_username: 'test.user@example.com',
    }
    res.setHeader('Content-Type', 'application/json')
    if (req.url === '/oauth2/v1/token') {
      const idToken = ['none', claims, 'sig']
        .map((part) => Buffer.from(typeof part === 'string' ? part : JSON.stringify(part)).toString('base64url'))
        .join('.')
      res.end(JSON.stringify({ access_token: 'access-token', token_type: 'Bearer', id_token: idToken }))
    } else if (req.url === '/oauth2/v1/userinfo') {
      res.end(JSON.stringify({ sub: claims.sub, preferred_username: claims.preferred_username }))
    } else {
      res.statusCode = 404
      res.end('{}')
    }
  })
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      resolve({ server, issuer: `http://127.0.0.1:${(server.address() as AddressInfo).port}` })
    })
  })
}

describe('Okta login flow (e2e)', () => {
  let app: INestApplication
  let idp: Server
  let appUrl: string

  beforeAll(async () => {
    const { server, issuer } = await startIdentityProvider()
    idp = server

    const config: Record<string, any> = {
      'admin.authStrategy': 'okta',
      admin: { authStrategy: 'okta' },
      baseUrl: BASE_URL,
      'okta.issuer': issuer,
      'okta.clientId': CLIENT_ID,
      'okta.clientSecret': 'client-secret',
    }
    const configService = { get: jest.fn((key: string, defaultValue?: any) => config[key] ?? defaultValue) }

    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController, TestAdminController],
      providers: [
        OidcAuthGuard,
        { provide: ConfigService, useValue: configService },
        { provide: JwtService, useValue: { verify: jest.fn(), signAsync: jest.fn() } },
      ],
    }).compile()
    // Registers itself with fastify-passport as 'oidc'
    new OktaStrategy(configService as unknown as ConfigService) // eslint-disable-line no-new

    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter())
    const fastify = (app as NestFastifyApplication).getHttpAdapter().getInstance()
    await fastify.register(fastifyCookie as any)
    await fastify.register(fastifySession as any, {
      secret: 'AAABBBCCCDDDEEEFFFGGGHHHIIIJJJKK',
      store: new SlowStore() as any,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 30 * 60 * 1000 },
    })
    await fastify.register(fastifyPassport.initialize() as any)
    fastifyPassport.registerUserSerializer(async (user: any) => user)
    fastifyPassport.registerUserDeserializer(async (user: any) => user)
    fastify.addHook('preHandler', passportCompatHook as any)

    await app.init()
    await fastify.ready()
    await app.listen(0)
    appUrl = await app.getUrl()
  })

  afterAll(async () => {
    await app.close()
    await new Promise((resolve) => idp.close(resolve))
  })

  const sessionCookie = (res: Response): string | undefined =>
    res.headers.get('set-cookie')?.split(';')[0]

  const get = async (path: string, cookie?: string, headers: Record<string, string> = {}): Promise<Response> =>
    await fetch(`${appUrl}${path}`, {
      redirect: 'manual',
      headers: { ...headers, ...(cookie != null ? { cookie } : {}) },
    })

  /** Starts a login like the browser does and returns the state sent to Okta and the session cookie. */
  const startLogin = async (redirect: string, cookie?: string): Promise<{ state: string; cookie: string }> => {
    const res = await get(`/auth/login?redirect=${encodeURIComponent(redirect)}`, cookie)
    expect(res.status).toBe(302)
    const authorizeUrl = new URL(res.headers.get('location') as string)
    expect(authorizeUrl.pathname).toBe('/oauth2/v1/authorize')
    return { state: authorizeUrl.searchParams.get('state') as string, cookie: sessionCookie(res) ?? (cookie as string) }
  }

  const xhr = { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' }

  it('answers 401 to an admin API request without a session, and creates none', async () => {
    const res = await get('/admin/providers', undefined, xhr)

    expect(res.status).toBe(401)
    expect(res.headers.get('location')).toBeNull()
    expect(res.headers.get('set-cookie')).toBeNull()
  })

  it('does not break a login in progress when an API request arrives during the Okta round trip', async () => {
    const login = await startLogin(`${BASE_URL}/ui/events`)

    // Another tab, or a late request from the same page, with the same cookie
    expect((await get('/admin/providers', login.cookie, xhr)).status).toBe(401)

    const callback = await get(`/auth/callback?code=okta-code&state=${login.state}`, login.cookie)
    expect(callback.status).toBe(302)
    expect(callback.headers.get('location')).toBe(`${BASE_URL}/ui/events`)
  })

  it('completes two concurrent logins in the same session, each back to its own page', async () => {
    const tabA = await startLogin(`${BASE_URL}/ui/events`)
    const tabB = await startLogin(`${BASE_URL}/ui/integrations`, tabA.cookie)

    const callbackB = await get(`/auth/callback?code=code-b&state=${tabB.state}`, tabB.cookie)
    expect(callbackB.status).toBe(302)
    expect(callbackB.headers.get('location')).toBe(`${BASE_URL}/ui/integrations`)

    // Logging in regenerates the session; the browser now sends the new cookie
    const cookie = sessionCookie(callbackB) as string
    expect((await get('/admin/providers', cookie, xhr)).status).toBe(200)

    const callbackA = await get(`/auth/callback?code=code-a&state=${tabA.state}`, cookie)
    expect(callbackA.status).toBe(302)
    expect(callbackA.headers.get('location')).toBe(`${BASE_URL}/ui/events`)
  })

  it('redirects a callback whose state is unknown to the login page (regression: empty 200)', async () => {
    const login = await startLogin(`${BASE_URL}/ui`)

    const res = await get('/auth/callback?code=okta-code&state=unknown', login.cookie)

    expect(res.status).toBe(302)
    expect(res.headers.get('location')).toBe(`${BASE_URL}/ui/login`)
  })

  it.each([
    ['an Okta error', '/auth/callback?error=access_denied&error_description=Not%20assigned'],
    ['no authorization code', '/auth/callback'],
  ])('redirects a callback with %s to the login page with a 302', async (_name, path) => {
    const res = await get(path)

    expect(res.status).toBe(302)
    expect(res.headers.get('location')).toContain(`${BASE_URL}/ui/login?error=`)
  })

  it.each([
    ['outside the app', 'https://evil.example.com/'],
    // Written into Location, a CR or LF made Node throw from @fastify/session's onSend and took down the process
    ['with a line break', `${BASE_URL}/ui\r\nX-Injected: 1`],
  ])('ignores a redirect %s', async (_name, redirect) => {
    const login = await startLogin(redirect)

    const res = await get(`/auth/callback?code=okta-code&state=${login.state}`, login.cookie)

    expect(res.status).toBe(302)
    expect(res.headers.get('location')).toBe(`${BASE_URL}/ui`)
  })

  // Same crash through Okta's `error`, and without a login: a cookie-less /auth/login hands out the session it needs
  it('encodes a line break in the Okta error it forwards', async () => {
    const { cookie } = await startLogin(`${BASE_URL}/ui`)

    const res = await get('/auth/callback?error=access_denied%0D%0AX-Injected:%201', cookie)

    expect(res.status).toBe(302)
    expect(res.headers.get('location')).toBe(`${BASE_URL}/ui/login?error=access_denied%0D%0AX-Injected%3A%201&description=`)
  })
})
