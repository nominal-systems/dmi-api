import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { BasicStrategy } from './basic.strategy'
import { ConfigModule } from '@nestjs/config'
import { AuthController } from './auth.controller'
import { OktaStrategy } from './okta.strategy'

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [BasicStrategy, OktaStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
