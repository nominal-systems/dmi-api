import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import * as jwksRsa from 'jwks-rsa'

@Injectable()
export class OktaJwtStrategy extends PassportStrategy(Strategy, 'okta-jwt') {
  constructor(private readonly configService: ConfigService) {
    const issuer = configService.get<string>('okta.issuer') || ''
    const audience = configService.get<string>('okta.audience')
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      issuer,
      audience,
      algorithms: ['RS256'],
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: `${issuer}/v1/keys`,
      }),
    })
  }

  async validate(payload: any) {
    return payload
  }
}
