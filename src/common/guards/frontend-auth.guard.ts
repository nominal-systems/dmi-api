import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class FrontendAuthGuard implements CanActivate {
  constructor (
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {
  }

  canActivate (context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<FastifyRequest>()
    const response = context.switchToHttp().getResponse<FastifyReply>()
    const strategy = this.configService.get<string>('admin.authStrategy')

    // Allow public access to the login page
    if (request.url.startsWith('/ui/login')) return true

    // -- OIDC Mode --
    if (strategy === 'okta') {
      // Allow if session-based auth
      if (request.isAuthenticated?.()) return true

      // Otherwise redirect to Okta login
      const redirectUrl = encodeURIComponent(request.url)
      response.redirect(`/auth/login?redirect=${redirectUrl}`)
      return false
    }

    // JWT Mode
    if (strategy === 'jwt') {
      try {
        const token = (request as any).cookies?.JWT_TOKEN
        if (token) {
          this.jwtService.verify(token)
          return true
        }
      } catch (err) {
        const redirectUrl = encodeURIComponent(request.url)
        response.redirect(`/ui/login?redirect=${redirectUrl}`)
        return false
      }
    }

    // Fallback: deny
    return false
  }
}
