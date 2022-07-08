import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UsersService } from './users.service'
import { User } from './entity/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    private readonly usersService: UsersService,
    configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY')
    })
  }

  async validate (payload: any): Promise<User | undefined> {
    const user = await this.usersService.findOne({
      id: payload.sub,
      options: { relations: ['organization'] }
    })

    return user
  }
}
