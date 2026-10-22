import { ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { OidcAuthGuard } from './oidc-auth.guard'

describe('OidcAuthGuard', () => {
  const guard = new OidcAuthGuard()

  const createContext = (authenticated: boolean): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({
          url: '/admin/providers',
          isAuthenticated: () => authenticated,
        }),
      }),
    } as unknown as ExecutionContext)

  it('returns true for authenticated requests', () => {
    expect(guard.canActivate(createContext(true))).toBe(true)
  })

  // Regression: dmi-api-admin-ui#138 — starting the OIDC flow here overwrote the state of the login in progress
  it('answers 401 for unauthenticated requests instead of starting a login', () => {
    expect(() => guard.canActivate(createContext(false))).toThrow(UnauthorizedException)
  })
})
