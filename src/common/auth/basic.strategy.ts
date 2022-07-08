import { BasicStrategy as Strategy } from 'passport-http'
import { PassportStrategy } from '@nestjs/passport'
import { Inject, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor (
    @Inject('ConfigService') readonly configService: ConfigService
  ) {
    super({
      passReqToCallback: true
    })
  }

  public validate = async (req, username, password): Promise<boolean> => {
    if (
      this.configService.get('admin.username') === username &&
      this.configService.get('admin.password') === password
    ) {
      return true
    }
    throw new UnauthorizedException()
  }
}
