import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthController } from './auth.controller'
import { OktaStrategy } from './okta.strategy'
import { JwtModule } from '@nestjs/jwt'
import { AdminJwtStrategy } from './admin-jwt.strategy'
import { AdminJwtAuthGuard } from '../guards/admin-jwt-auth.guard'
import { OidcAuthGuard } from '../guards/oidc-auth.guard'
import { AdminGuard } from '../guards/admin.guard'

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
    OktaStrategy,
    OidcAuthGuard,
    AdminJwtStrategy,
    AdminJwtAuthGuard
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
