import { ExecutionContext } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { OidcAuthGuard } from './oidc-auth.guard'

describe('OidcAuthGuard', () => {
  let guard: OidcAuthGuard
  const configService = {} as ConfigService
  const baseProto = Object.getPrototypeOf(OidcAuthGuard.prototype)

  beforeEach(() => {
    guard = new OidcAuthGuard(configService)
    jest.clearAllMocks()
  })

  const createContext = (url: string, authenticated = false): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({
          url,
          isAuthenticated: () => authenticated,
        }),
      }),
    } as unknown as ExecutionContext)

  it('returns true for auth paths', async () => {
    const spy = jest.spyOn(baseProto, 'canActivate')
    const result = await guard.canActivate(createContext('/auth/login'))
    expect(result).toBe(true)
    expect(spy).not.toHaveBeenCalled()
  })

  it('returns true for authenticated requests', async () => {
    const spy = jest.spyOn(baseProto, 'canActivate')
    const result = await guard.canActivate(createContext('/admin', true))
    expect(result).toBe(true)
    expect(spy).not.toHaveBeenCalled()
  })

  it('executes strategy for unauthenticated requests', async () => {
    const ctx = createContext('/admin')
    const spy = jest.spyOn(baseProto, 'canActivate').mockResolvedValue(true as any)
    const result = await guard.canActivate(ctx)
    expect(spy).toHaveBeenCalledWith(ctx)
    expect(result).toBe(true)
  })
})
