import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'

/**
 * Admin API guard for the Okta session. Answers 401 instead of starting a login: every flow started from an API
 * request overwrote the OIDC state of the login in progress. Clients restart the login with a browser navigation
 * (`/ui` → `/auth/login`).
 */
@Injectable()
export class OidcAuthGuard implements CanActivate {
  canActivate (context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    if (request.isAuthenticated()) {
      return true
    }
    throw new UnauthorizedException()
  }
}
