import { Logger, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthController } from './auth.controller'
import { OktaStrategy } from './okta.strategy'
import { JwtModule } from '@nestjs/jwt'
import { AdminJwtStrategy } from './admin-jwt.strategy'
import { AdminJwtAuthGuard } from '../guards/admin-jwt-auth.guard'
import { OidcAuthGuard } from '../guards/oidc-auth.guard'
import { AdminGuard } from '../guards/admin.guard'
import { AdminConfig } from '../../config/config.interface'

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ session: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '30m' }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [
    AdminGuard,
    OidcAuthGuard,
    AdminJwtAuthGuard,
    {
      provide: 'ADMIN_OKTA_STRATEGY',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const adminConfig = configService.get<AdminConfig>('admin')
        Logger.log('Using auth strategy: ' + adminConfig?.authStrategy.toUpperCase(), 'AuthModule')
        if (adminConfig?.authStrategy === 'okta') return new OktaStrategy(configService)
        if (adminConfig?.authStrategy === 'jwt') return new AdminJwtStrategy(configService)
      }
    }
  ],
  controllers: [AuthController],
  exports: [
    PassportModule,
    JwtModule,
    OidcAuthGuard,
    AdminJwtAuthGuard
  ]
})
export class AuthModule {}
