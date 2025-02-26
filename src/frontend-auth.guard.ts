import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'

@Injectable()
export class FrontendAuthGuard implements CanActivate {
  canActivate (context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<FastifyRequest>()
    const response = context.switchToHttp().getResponse<FastifyReply>()

    // Allow public access to the login page (if needed)
    if (request.url === '/ui/login') {
      return true
    }

    // If the user is authenticated, allow the request
    if (request.isAuthenticated && request.isAuthenticated()) {
      return true
    }

    // Otherwise, redirect to the login endpoint.
    // We encode the current URL so that after login the user gets back to where they were.
    const redirectUrl = encodeURIComponent(request.url)
    response.redirect(`/auth/login?redirect=${redirectUrl}`)
    return false
  }
}
