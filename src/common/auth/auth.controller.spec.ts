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

  beforeEach(() => {
    controller = new AuthController(configServiceMock, jwtServiceMock)
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
        query: {},
        session: { redirectUrl: 'https://dmi.example.com/dmi/ui/integrations' },
      }
      const res: any = {
        status: jest.fn(),
        header: jest.fn(),
        send: jest.fn(),
        redirect: jest.fn(),
      }
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
      const req: any = { query: {}, session: {} }
      const res: any = {
        status: jest.fn(),
        header: jest.fn(),
        send: jest.fn(),
        redirect: jest.fn(),
      }
      ;(fastifyPassport.authenticate as jest.Mock).mockReturnValue(async () => {})

      await controller.callback(req, res)

      expect(res.redirect).toHaveBeenCalledWith(expect.stringContaining('error=auth_failed'))
    })
  })
})
