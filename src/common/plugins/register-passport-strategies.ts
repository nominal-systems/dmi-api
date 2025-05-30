import { INestApplicationContext } from '@nestjs/common'
import fastifyPassport from 'fastify-passport'
import { AdminConfig, AppConfig } from '../../config/config.interface'
import { ConfigService } from '@nestjs/config'

export async function registerPassportStrategies (app: INestApplicationContext): Promise<void> {
  const configService = app.get<ConfigService<AppConfig>>(ConfigService)
  const adminConfig = configService.get<AdminConfig>('admin')
  if (adminConfig?.authStrategy === 'okta') {
    const oktaStrategy = app.get('ADMIN_OKTA_STRATEGY')
    const oktaJwtStrategy = app.get('ADMIN_OKTA_JWT_STRATEGY')
    fastifyPassport.use('oidc', oktaStrategy as any)
    fastifyPassport.use('okta-jwt', oktaJwtStrategy as any)
  }
}
