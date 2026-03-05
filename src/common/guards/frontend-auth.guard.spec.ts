import { ExecutionContext } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { FrontendAuthGuard } from './frontend-auth.guard'

describe('FrontendAuthGuard', () => {
  let guard: FrontendAuthGuard
  let configService: ConfigService
  let jwtService: JwtService

  const createContext = (request: Record<string, any>, response: Record<string, any>): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => request,
        getResponse: () => response,
      }),
    }) as unknown as ExecutionContext

  beforeEach(() => {
    configService = { get: jest.fn() } as unknown as ConfigService
    jwtService = { verify: jest.fn() } as unknown as JwtService
    guard = new FrontendAuthGuard(configService, jwtService)
  })

  it('allows authenticated Okta requests with a profile username', () => {
    (configService.get as jest.Mock).mockImplementation((key: string) => {
      if (key === 'admin.authStrategy') return 'okta'
      if (key === 'baseUrl') return 'http://localhost:4000'
      return undefined
    })

    const request = {
      url: '/ui',
      user: { profile: { username: 'test.user@example.com' } },
      isAuthenticated: jest.fn().mockReturnValue(true),
    }
    const response = { redirect: jest.fn() }

    const result = guard.canActivate(createContext(request, response))

    expect(result).toBe(true)
    expect(response.redirect).not.toHaveBeenCalled()
  })

  it('redirects unauthenticated Okta requests to /auth/login', () => {
    (configService.get as jest.Mock).mockImplementation((key: string) => {
      if (key === 'admin.authStrategy') return 'okta'
      if (key === 'baseUrl') return 'http://localhost:4000'
      return undefined
    })

    const request: any = {
      url: '/ui',
      isAuthenticated: jest.fn().mockReturnValue(false),
    }
    const response = { redirect: jest.fn() }

    const result = guard.canActivate(createContext(request, response))

    expect(result).toBe(true)
    expect(response.redirect).toHaveBeenCalledWith(
      'http://localhost:4000/auth/login?redirect=http%3A%2F%2Flocalhost%3A4000%2Fui',
    )
    expect(request.__frontendAuthRedirected).toBe(true)
  })

  it('does not treat missing Okta profile as authenticated', () => {
    (configService.get as jest.Mock).mockImplementation((key: string) => {
      if (key === 'admin.authStrategy') return 'okta'
      if (key === 'baseUrl') return 'http://localhost:4000'
      return undefined
    })

    const request: any = {
      url: '/ui',
      user: {},
      isAuthenticated: jest.fn().mockReturnValue(true),
    }
    const response = { redirect: jest.fn() }

    const result = guard.canActivate(createContext(request, response))

    expect(result).toBe(true)
    expect(response.redirect).toHaveBeenCalled()
    expect(request.__frontendAuthRedirected).toBe(true)
  })

  it('redirects unauthenticated JWT requests to /ui/login', () => {
    (configService.get as jest.Mock).mockImplementation((key: string) => {
      if (key === 'admin.authStrategy') return 'jwt'
      if (key === 'baseUrl') return 'http://localhost:4000'
      return undefined
    })
    ;(jwtService.verify as jest.Mock).mockImplementation(() => {
      throw new Error('invalid token')
    })

    const request: any = {
      url: '/ui',
      cookies: { JWT_TOKEN: 'bad-token' },
    }
    const response = { redirect: jest.fn() }

    const result = guard.canActivate(createContext(request, response))

    expect(result).toBe(true)
    expect(response.redirect).toHaveBeenCalledWith(
      'http://localhost:4000/ui/login?redirect=%2Fui',
    )
    expect(request.__frontendAuthRedirected).toBe(true)
  })
})
