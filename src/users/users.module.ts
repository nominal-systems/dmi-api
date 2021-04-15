import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { JwtStrategy } from './jwt.strategy'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entity/user.entity'
import { UserSubscriber } from './entity/user.subscriber'

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '30m' }
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, UserSubscriber],
  exports: [UsersService, JwtModule]
})
export class UsersModule {}
