import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { OidcAuthGuard } from './oidc-auth.guard'
import { AdminJwtAuthGuard } from './admin-jwt-auth.guard'
import { OktaJwtAuthGuard } from './okta-jwt-auth.guard'
import { AdminConfig } from '../../config/config.interface'

@Injectable()
export class AdminGuard implements CanActivate {
  constructor (
    private readonly configService: ConfigService,
    private readonly oidcAuthGuard: OidcAuthGuard,
    private readonly jwtAuthGuard: AdminJwtAuthGuard,
    private readonly oktaJwtAuthGuard: OktaJwtAuthGuard
  ) {
  }

  async canActivate (ctx: ExecutionContext): Promise<boolean> {
    const adminConfig = this.configService.get<AdminConfig>('admin')
    if (adminConfig?.authStrategy === 'okta') {
      const req = ctx.switchToHttp().getRequest()
      if (req.headers.authorization) {
        return this.oktaJwtAuthGuard.canActivate(ctx) as Promise<boolean>
      }
      return this.oidcAuthGuard.canActivate(ctx) as Promise<boolean>
    }
    return this.jwtAuthGuard.canActivate(ctx) as Promise<boolean>
  }
}
