import { Controller, Get, INestApplication, Res, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { Test } from '@nestjs/testing'
import { FastifyReply } from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifySession from '@fastify/session'
import { FrontendAuthGuard } from '../../src/common/guards/frontend-auth.guard'

/**
 * Regression test for the blank admin UI after sessions moved to MongoDB.
 *
 * FrontendAuthGuard sends a redirect and returns true, letting the route handler run and rely
 * on `__frontendAuthRedirected` to skip the file send. But `reply.redirect()` only queues the
 * response — fastify's onSend hooks run first, and with an asynchronous session store
 * (connect-mongo) the save inside that hook takes a network round trip. While the 302 sat
 * parked there, Nest applied the route's default success status to the not-yet-flushed reply,
 * silently overwriting it to 200. The client got an empty 200 (location header attached but
 * never followed): a blank page for any visitor carrying a session cookie, i.e. anyone who had
 * started a login.
 *
 * The store here mimics connect-mongo's latency with a delayed in-memory store — the bug does
 * not reproduce with a synchronous store, which is why it appeared only after the MongoDB
 * migration.
 */

const STORE_LATENCY_MS = 25

class SlowStore {
  private readonly sessions = new Map<string, any>()

  get (sid: string, cb: (err: Error | null, session?: any) => void): void {
    const session = this.sessions.get(sid) ?? null
    setTimeout(() => cb(null, session), STORE_LATENCY_MS)
  }

  set (sid: string, session: any, cb: (err?: Error | null) => void): void {
    this.sessions.set(sid, session)
    setTimeout(() => cb(null), STORE_LATENCY_MS)
  }

  destroy (sid: string, cb: (err?: Error | null) => void): void {
    this.sessions.delete(sid)
    setTimeout(() => cb(null), STORE_LATENCY_MS)
  }

  touch (_sid: string, _session: any, cb: (err?: Error | null) => void): void {
    setTimeout(() => cb(null), STORE_LATENCY_MS)
  }
}

/** Mimics FrontendController: guard first, handler skips the send after a redirect. */
@UseGuards(FrontendAuthGuard)
@Controller('ui')
class TestFrontendController {
  @Get()
  async index (@Res() res: FastifyReply): Promise<void> {
    if ((res.request as any)?.__frontendAuthRedirected || res.sent) return
    await res.type('text/html').send('<html>INDEX</html>')
  }
}

/** Mimics AuthController.login storing OIDC state in the session before redirecting. */
@Controller('auth')
class TestAuthController {
  @Get('login')
  async login (@Res({ passthrough: false }) res: FastifyReply): Promise<void> {
    const req = res.request as any
    req.session.redirectUrl = 'https://dmi.example.com/ui'
    res.redirect('https://okta.example.com/authorize', 302)
    await res
  }
}

describe('Frontend redirect with an async session store (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TestFrontendController, TestAuthController],
      providers: [
        FrontendAuthGuard,
        { provide: JwtService, useValue: { verify: jest.fn() } },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string, defaultValue?: any) => {
              if (key === 'admin.authStrategy') return 'okta'
              if (key === 'baseUrl') return 'https://dmi.example.com'
              return defaultValue
            }),
          },
        },
      ],
    }).compile()

    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter())
    const fastify = (app as NestFastifyApplication).getHttpAdapter().getInstance()
    await fastify.register(fastifyCookie as any)
    await fastify.register(fastifySession as any, {
      secret: 'AAABBBCCCDDDEEEFFFGGGHHHIIIJJJKK',
      store: new SlowStore() as any,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 30 * 60 * 1000 },
    })
    // fastify-passport is not registered here; simulate its request decoration
    fastify.addHook('onRequest', async (req: any) => {
      if (req.headers['x-test-authenticated'] === 'yes') {
        req.isAuthenticated = () => true
        req.user = { profile: { username: 'test.user@example.com' } }
      }
    })
    await app.init()
    await (app as NestFastifyApplication).getHttpAdapter().getInstance().ready()
    await app.listen(0)
  })

  afterAll(async () => {
    await app.close()
  })

  const baseUrl = async (): Promise<string> => await app.getUrl()

  it('redirects a cookie-less request to the login flow', async () => {
    const res = await fetch(`${await baseUrl()}/ui`, { redirect: 'manual' })
    expect(res.status).toBe(302)
    expect(res.headers.get('location')).toContain('/auth/login?redirect=')
  })

  it('redirects a request that carries a session cookie (regression: blank page)', async () => {
    // First hit /auth/login so the session stores OIDC-like state and a cookie is issued
    const login = await fetch(`${await baseUrl()}/auth/login`, { redirect: 'manual' })
    expect(login.status).toBe(302)
    const sessionCookie = (login.headers.get('set-cookie') ?? '').split(';')[0]
    expect(sessionCookie).toContain('sessionId=')

    // A follow-up /ui visit with that session must still be a redirect, not an empty 200
    const res = await fetch(`${await baseUrl()}/ui`, {
      redirect: 'manual',
      headers: { cookie: sessionCookie },
    })
    expect(res.status).toBe(302)
    expect(res.headers.get('location')).toContain('/auth/login?redirect=')
    expect(await res.text()).toBe('')
  })

  it('still serves the page for authenticated requests', async () => {
    const res = await fetch(`${await baseUrl()}/ui`, {
      redirect: 'manual',
      headers: { 'x-test-authenticated': 'yes' },
    })
    expect(res.status).toBe(200)
    expect(await res.text()).toContain('INDEX')
  })
})
