import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { BasicStrategy } from './basic.strategy'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [BasicStrategy]
})
export class AuthModule {}
