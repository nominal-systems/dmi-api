import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { OidcAuthGuard } from './oidc-auth.guard'
import { AdminJwtAuthGuard } from './admin-jwt-auth.guard'

@Injectable()
export class AdminGuard implements CanActivate {
  constructor (
    private readonly configService: ConfigService,
    private readonly oidcAuthGuard: OidcAuthGuard,
    private readonly jwtAuthGuard: AdminJwtAuthGuard
  ) {
  }

  async canActivate (ctx: ExecutionContext): Promise<boolean> {
    const authStrategy = this.configService.get<string>('admin.authStrategy')
    return authStrategy === 'jwt'
      ? this.jwtAuthGuard.canActivate(ctx) as Promise<boolean>
      : this.oidcAuthGuard.canActivate(ctx) as Promise<boolean>
  }
}
