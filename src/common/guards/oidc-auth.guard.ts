import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class OidcAuthGuard extends AuthGuard('oidc') {
  constructor (private readonly configService: ConfigService) {
    super()
  }

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    // Allow requests that are already authenticated or part of the auth flow
    const isAuthPath: boolean = request.url.startsWith('/auth/')
    if (isAuthPath || request.isAuthenticated()) {
      return true
    }

    // Begin Passport authentication flow when unauthenticated
    return super.canActivate(context) as Promise<boolean>
  }
}
