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

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>()
    const response = context.switchToHttp().getResponse<FastifyReply>()
    const strategy = this.configService.get<string>('admin.authStrategy')
    const baseUrl = this.configService.get<string>('baseUrl', '')
    const oktaUser = request.user as { profile?: { username?: string } } | undefined

    // Allow public access to the login page
    if (request.url.startsWith('/ui/login')) return true

    // -- OIDC Mode --
    if (strategy === 'okta') {
      // Allow if session-based auth
      if (request.isAuthenticated?.() && oktaUser?.profile?.username) return true

      // Otherwise redirect to Okta login
      ;(request as any).__frontendAuthRedirected = true
      const redirectUrl = encodeURIComponent(`${baseUrl}${request.url}`)
      response.redirect(`${baseUrl}/auth/login?redirect=${redirectUrl}`)
      await this.flush(response)
      return true
    }

    // JWT Mode
    if (strategy === 'jwt') {
      const token = (request as any).cookies?.JWT_TOKEN
      try {
        if (token) {
          this.jwtService.verify(token)
          return true
        }
      } catch {}
      (request as any).__frontendAuthRedirected = true
      const redirectUrl = encodeURIComponent(request.url)
      response.redirect(`${baseUrl}/ui/login?redirect=${redirectUrl}`)
      await this.flush(response)
      return true
    }

    // Fallback: deny
    return false
  }

  /**
   * Waits until the redirect response has fully flushed to the client.
   *
   * `reply.redirect()` only queues the response: fastify's onSend hooks run first, and since
   * sessions moved to MongoDB the session-store save inside that hook takes a network round
   * trip. If the guard returns while the redirect is still parked there, Nest proceeds and
   * applies the route's default success status to the not-yet-flushed reply, silently
   * overwriting the 302 with a 200. The client then receives an empty 200 (with the location
   * header still attached, but never followed) — a blank page instead of the login flow.
   *
   * This never happened with the in-memory session store because the save completed
   * synchronously, flushing the 302 before the guard returned. FastifyReply is thenable:
   * awaiting it resolves once the response stream has ended, making the overwrite a no-op.
   */
  private async flush (response: FastifyReply): Promise<void> {
    try {
      await response
    } catch {
      // The client aborted mid-flush; the request is over either way.
    }
  }
}
