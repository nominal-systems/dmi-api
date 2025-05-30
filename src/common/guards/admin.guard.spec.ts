import { ExecutionContext } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AdminGuard } from './admin.guard'
import { OidcAuthGuard } from './oidc-auth.guard'
import { AdminJwtAuthGuard } from './admin-jwt-auth.guard'
import { OktaJwtAuthGuard } from './okta-jwt-auth.guard'

describe('AdminGuard', () => {
  let guard: AdminGuard
  let configService: ConfigService
  const oidc = { canActivate: jest.fn() } as unknown as OidcAuthGuard
  const adminJwt = { canActivate: jest.fn() } as unknown as AdminJwtAuthGuard
  const oktaJwt = { canActivate: jest.fn() } as unknown as OktaJwtAuthGuard

  beforeEach(() => {
    configService = new ConfigService({ admin: { authStrategy: 'jwt' } }) as any
    guard = new AdminGuard(configService, oidc, adminJwt, oktaJwt)
    jest.clearAllMocks()
  })

  const createContext = (authorization?: string): ExecutionContext => ({
    switchToHttp: () => ({
      getRequest: () => ({ headers: authorization ? { authorization } : {} })
    })
  }) as unknown as ExecutionContext

  it('uses AdminJwtAuthGuard when strategy is jwt', async () => {
    (configService as any).get = jest.fn().mockReturnValue({ authStrategy: 'jwt' })
    await guard.canActivate(createContext())
    expect(adminJwt.canActivate).toHaveBeenCalled()
    expect(oidc.canActivate).not.toHaveBeenCalled()
    expect(oktaJwt.canActivate).not.toHaveBeenCalled()
  })

  it('uses OktaJwtAuthGuard when strategy is okta and Authorization header present', async () => {
    (configService as any).get = jest.fn().mockReturnValue({ authStrategy: 'okta' })
    await guard.canActivate(createContext('Bearer token'))
    expect(oktaJwt.canActivate).toHaveBeenCalled()
    expect(oidc.canActivate).not.toHaveBeenCalled()
  })

  it('uses OidcAuthGuard when strategy is okta and no Authorization header', async () => {
    (configService as any).get = jest.fn().mockReturnValue({ authStrategy: 'okta' })
    await guard.canActivate(createContext())
    expect(oidc.canActivate).toHaveBeenCalled()
    expect(oktaJwt.canActivate).not.toHaveBeenCalled()
  })
})
