import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule } from '@nestjs/config'
import { AuthController } from './auth.controller'
import { OktaStrategy } from './okta.strategy'

@Module({
  imports: [
    PassportModule.register({ session: true }),
    ConfigModule
  ],
  providers: [OktaStrategy],
  controllers: [AuthController],
  exports: [PassportModule]
})
export class AuthModule {}
