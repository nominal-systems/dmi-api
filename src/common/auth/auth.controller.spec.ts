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
      header: jest.fn((key: string, value: any) => {
        headers[key.toLowerCase()] = value
        return reply
      }),
      getHeader: jest.fn((key: string) => headers[key.toLowerCase()]),
      send: jest.fn(() => {
        reply.sends++
        return reply
      }),
      redirect: jest.fn((url: string) => {
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
      const req: any = {
        query: { code: 'okta-code' },
        session: { redirectUrl: 'https://dmi.example.com/dmi/ui/integrations' },
      }
      const res = createReply()
      ;(fastifyPassport.authenticate as jest.Mock).mockReturnValue(async () => {
        req.session.passport = oktaUser
        req.user = oktaUser
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

      expect(res.redirect).toHaveBeenCalledWith(expect.stringContaining('error=auth_failed'))
      expect(res.sends).toBe(1)
    })

    // Regression: #356 — an unauthenticated GET /auth/callback with no code crashed the
    // process with ERR_HTTP_HEADERS_SENT thrown out of @fastify/session's onSend hook.
    it('answers a callback with no authorization code without invoking passport', async () => {
      const req: any = { query: {}, session: {} }
      const res = createReply()

      await controller.callback(req, res)

      expect(fastifyPassport.authenticate).not.toHaveBeenCalled()
      expect(res.redirect).toHaveBeenCalledWith(expect.stringContaining('error=auth_failed'))
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
