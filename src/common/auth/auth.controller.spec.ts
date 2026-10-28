import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import fastifyPassport from '@fastify/passport'
import { AuthController } from './auth.controller'

jest.mock('@fastify/passport', () => ({
  __esModule: true,
  default: {
    authenticate: jest.fn(),
  },
}))

describe('AuthController', () => {
  const configServiceMock = {
    get: jest.fn((key: string, defaultValue?: any) => {
      switch (key) {
        case 'admin.authStrategy':
          return 'okta'
        case 'admin':
          return { authStrategy: 'okta', username: 'admin', password: 'admin' }
        case 'baseUrl':
          return 'https://dmi.example.com/dmi'
        case 'okta.issuer':
          return 'https://okta.example.com'
        case 'okta.clientId':
          return 'client-id'
        default:
          return defaultValue
      }
    }),
  } as unknown as ConfigService

  const jwtServiceMock = { signAsync: jest.fn(), verify: jest.fn() } as unknown as JwtService

  let controller: AuthController

  // A reply stub that behaves like fastify's: headers are staged before the response is
  // written, and `send()`/`redirect()` count as committing a response. `sends` is what the
  // regression tests assert on — the crash in #356 was two responses on one reply.
  function createReply (): any {
    const headers: Record<string, any> = {}
    const reply: any = {
      sends: 0,
      sent: false,
      raw: { headersSent: false },
      status: jest.fn(),
      code: jest.fn(() => reply),
      header: jest.fn((key: string, value: any) => {
        headers[key.toLowerCase()] = value
        return reply
      }),
      getHeader: jest.fn((key: string) => headers[key.toLowerCase()]),
      send: jest.fn(() => {
        reply.sends++
        return reply
      }),
      redirect: jest.fn((url: string, _code?: number) => {
        headers.location = url
        reply.sends++
        return reply
      }),
    }
    return reply
  }

  beforeEach(() => {
    controller = new AuthController(configServiceMock, jwtServiceMock)
    ;(fastifyPassport.authenticate as jest.Mock).mockReset()
  })

  describe('callback()', () => {
    it('leaves the session JSON-serializable after login (regression: circular structure)', async () => {
      // fastify-passport's logIn stores the serialized user directly at session.passport,
      // and req.user is the very same object reference.
      const oktaUser = {
        issuer: 'https://okta.example.com',
        profile: { username: 'test.user@example.com' },
        idToken: 'id-token',
      }
      const req: any = { query: { code: 'okta-code' }, session: {} }
      const res = createReply()
      ;(fastifyPassport.authenticate as jest.Mock).mockReturnValue(async () => {
        req.session.passport = oktaUser
        req.user = oktaUser
        req.authInfo = { state: 'https://dmi.example.com/dmi/ui/integrations' }
      })

      await controller.callback(req, res)

      // The session must be storable by connect-mongo, which JSON-serializes it
      expect(() => JSON.stringify(req.session)).not.toThrow()

      // And the callback must complete with the redirect to the originally requested URL
      expect(res.status).toHaveBeenCalledWith(302)
      expect(res.header).toHaveBeenCalledWith('Location', 'https://dmi.example.com/dmi/ui/integrations')
      expect(res.send).toHaveBeenCalled()
      expect(res.redirect).not.toHaveBeenCalledWith(expect.stringContaining('error=auth_failed'))
    })

    it('redirects to the login page when authentication leaves no user', async () => {
      const req: any = { query: { code: 'okta-code' }, session: {} }
      const res = createReply()
      ;(fastifyPassport.authenticate as jest.Mock).mockReturnValue(async () => {})

      await controller.callback(req, res)

      expect(res.redirect).toHaveBeenCalledWith(expect.stringContaining('error=auth_failed'), 302)
      expect(res.sends).toBe(1)
    })

    // Regression: #356 — an unauthenticated GET /auth/callback with no code crashed the
    // process with ERR_HTTP_HEADERS_SENT thrown out of @fastify/session's onSend hook.
    it('answers a callback with no authorization code without invoking passport', async () => {
      const req: any = { query: {}, session: {} }
      const res = createReply()

      await controller.callback(req, res)

      expect(fastifyPassport.authenticate).not.toHaveBeenCalled()
      expect(res.redirect).toHaveBeenCalledWith(expect.stringContaining('error=auth_failed'), 302)
      expect(res.sends).toBe(1)
    })

    it('sends nothing more once passport has committed its own redirect', async () => {
      // This is what passport-openidconnect does when it decides to bounce the browser
      // (failureRedirect, or a fresh authorization request): it redirects and resolves
      // immediately, while the reply is still going through the async onSend chain.
      const req: any = { query: { code: 'okta-code', state: 'garbage' }, session: {} }
      const res = createReply()
      ;(fastifyPassport.authenticate as jest.Mock).mockReturnValue(async () => {
        res.redirect('https://okta.example.com/oauth2/v1/authorize?client_id=client-id')
      })

      await controller.callback(req, res)

      expect(res.sends).toBe(1)
      expect(res.redirect).not.toHaveBeenCalledWith(expect.stringContaining('error=auth_failed'))
    })

    it('does not send an error redirect on top of a reply that is already committed', async () => {
      const req: any = { query: { code: 'okta-code' }, session: {} }
      const res = createReply()
      ;(fastifyPassport.authenticate as jest.Mock).mockReturnValue(async () => {
        res.redirect('https://okta.example.com/oauth2/v1/authorize?client_id=client-id')
        throw new Error('token exchange failed after the redirect went out')
      })

      await controller.callback(req, res)

      expect(res.sends).toBe(1)
    })
  })

  // Regression: dmi-api-admin-ui#138 — Nest sets the route's 200 before the handler, and a redirect without
  // a code kept it: a failed login answered an empty 200, a blank page.
  describe('explicit 302 redirects', () => {
    it.each(['login', 'callback'] as const)('%s sets 302 before passport runs, so its failureRedirect is not a 200', async (route) => {
      const req: any = { query: { code: 'okta-code', state: 'unknown' }, session: {} }
      const res = createReply()
      let codesBeforePassport: number[] = []
      ;(fastifyPassport.authenticate as jest.Mock).mockReturnValue(async () => {
        codesBeforePassport = res.code.mock.calls.map(([code]: [number]) => code)
        res.redirect('https://dmi.example.com/dmi/ui/login')
      })

      await controller[route](req, res)

      expect(codesBeforePassport).toEqual([302])
      expect(res.sends).toBe(1)
    })

    // A CR or LF in the Location header makes Node throw from @fastify/session's onSend, which takes down the process
    it('encodes the Okta error it forwards to the login page', async () => {
      const req: any = { query: { error: 'access_denied\r\nX-Injected: 1', error_description: 'line\none' }, session: {} }
      const res = createReply()

      await controller.callback(req, res)

      expect(res.redirect).toHaveBeenCalledWith(
        'https://dmi.example.com/dmi/ui/login?error=access_denied%0D%0AX-Injected%3A%201&description=line%0Aone',
        302,
      )
    })

    it.each([
      ['an Okta error', { error: 'access_denied', error_description: 'User is not assigned' }],
      ['no authorization code', {}],
    ])('redirects a callback with %s with a 302', async (_name, query) => {
      const req: any = { query, session: {} }
      const res = createReply()

      await controller.callback(req, res)

      expect(res.redirect).toHaveBeenCalledWith(expect.stringContaining('/ui/login?error='), 302)
    })

    it('redirects with a 302 when passport throws', async () => {
      const req: any = { query: { code: 'okta-code' }, session: {} }
      const res = createReply()
      ;(fastifyPassport.authenticate as jest.Mock).mockReturnValue(async () => {
        throw new Error('token exchange failed')
      })

      await controller.callback(req, res)

      expect(res.redirect).toHaveBeenCalledWith('https://dmi.example.com/dmi/ui/login?error=auth_failed', 302)
    })
  })

  describe('redirect after login', () => {
    it('sends the validated redirect as the OIDC state of the flow', async () => {
      const req: any = { query: { redirect: 'https://dmi.example.com/dmi/ui/events' }, session: {} }
      const res = createReply()
      ;(fastifyPassport.authenticate as jest.Mock).mockReturnValue(async () => {})

      await controller.login(req, res)

      expect(fastifyPassport.authenticate).toHaveBeenCalledWith(
        'oidc',
        expect.objectContaining({ state: 'https://dmi.example.com/dmi/ui/events' }),
      )
      expect(res.code).toHaveBeenCalledWith(302)
    })

    const stateSentFor = async (redirect: string, target = controller): Promise<unknown> => {
      const req: any = { query: { redirect }, session: {} }
      ;(fastifyPassport.authenticate as jest.Mock).mockReturnValue(async () => {})

      await target.login(req, createReply())

      return (fastifyPassport.authenticate as jest.Mock).mock.calls[0][1].state
    }

    it.each([
      'https://evil.example.com/dmi/ui',
      'https://dmi.example.com/dmiother',
      '//evil.example.com',
      // Same origin, but outside the app once the browser resolves the dot segments
      'https://dmi.example.com/dmi/../x',
      'https://dmi.example.com/dmi/%2e%2e/x',
      // A CR or LF in the Location header crashed the process after login
      'https://dmi.example.com/dmi/ui\n',
      'https://dmi.example.com/dmi/ui\r\nX-Injected: 1',
    ])('ignores a redirect outside the app: %j', async (redirect) => {
      expect(await stateSentFor(redirect)).toBeUndefined()
    })

    it('keeps the query of a redirect inside the app, percent-encoded', async () => {
      expect(await stateSentFor('https://dmi.example.com/dmi/ui/events?code=café €')).toBe(
        'https://dmi.example.com/dmi/ui/events?code=caf%C3%A9%20%E2%82%AC',
      )
    })

    // Local and dev run with an empty BASE_URL, where redirects are paths
    describe('with an empty base URL', () => {
      let pathController: AuthController

      beforeEach(() => {
        const get = jest.fn((key: string, defaultValue?: any) =>
          key === 'baseUrl' ? '' : (configServiceMock.get as jest.Mock)(key, defaultValue),
        )
        pathController = new AuthController({ get } as unknown as ConfigService, jwtServiceMock)
      })

      it('keeps a path inside the app', async () => {
        expect(await stateSentFor('/ui/events?code=abc', pathController)).toBe('/ui/events?code=abc')
      })

      it.each([
        '//evil.example.com',
        '/\\evil.example.com',
        // The browser strips the tab and reads `//evil.example.com`
        '/\t/evil.example.com',
        '/\n/x',
        '/\r/x',
        'https://evil.example.com/ui',
      ])('ignores %j', async (redirect) => {
        expect(await stateSentFor(redirect, pathController)).toBeUndefined()
      })
    })

    it('keeps the other pending OIDC states when the login regenerates the session', async () => {
      const req: any = { query: { code: 'okta-code' }, session: {} }
      const res = createReply()
      ;(fastifyPassport.authenticate as jest.Mock).mockReturnValue(async () => {})

      await controller.callback(req, res)

      expect(fastifyPassport.authenticate).toHaveBeenCalledWith(
        'oidc',
        expect.objectContaining({ keepSessionInfo: true }),
      )
    })

    it('falls back to the dashboard when the state carries no valid redirect', async () => {
      const req: any = { query: { code: 'okta-code' }, session: {} }
      const res = createReply()
      ;(fastifyPassport.authenticate as jest.Mock).mockReturnValue(async () => {
        req.user = { profile: { username: 'test.user@example.com' } }
        req.authInfo = { state: 'https://evil.example.com' }
      })

      await controller.callback(req, res)

      expect(res.header).toHaveBeenCalledWith('Location', 'https://dmi.example.com/dmi/ui')
    })
  })

  describe('login()', () => {
    it('does not redirect again when authentication fails after committing a response', async () => {
      const req: any = { query: {}, session: {} }
      const res = createReply()
      ;(fastifyPassport.authenticate as jest.Mock).mockReturnValue(async () => {
        res.redirect('https://okta.example.com/oauth2/v1/authorize?client_id=client-id')
        throw new Error('boom')
      })

      await controller.login(req, res)

      expect(res.sends).toBe(1)
    })
  })
})
