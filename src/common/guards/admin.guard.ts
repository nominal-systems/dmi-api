import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { OidcAuthGuard } from './oidc-auth.guard'
import { AdminJwtAuthGuard } from './admin-jwt-auth.guard'
import { AdminConfig } from '../../config/config.interface'

@Injectable()
export class AdminGuard implements CanActivate {
  constructor (
    private readonly configService: ConfigService,
    private readonly oidcAuthGuard: OidcAuthGuard,
    private readonly jwtAuthGuard: AdminJwtAuthGuard
  ) {
  }

  async canActivate (ctx: ExecutionContext): Promise<boolean> {
    const adminConfig = this.configService.get<AdminConfig>('admin')
    return adminConfig?.authStrategy === 'okta'
      ? this.oidcAuthGuard.canActivate(ctx) as Promise<boolean>
      : this.jwtAuthGuard.canActivate(ctx) as Promise<boolean>
  }
}
