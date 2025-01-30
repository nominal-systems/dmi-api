import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-openidconnect'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class OktaStrategy extends PassportStrategy(Strategy, 'oidc') {
  constructor (private readonly configService: ConfigService) {
    const oktaDomain = configService.get<string>('okta.domain')
    const oktaClientId = configService.get<string>('okta.clientId')
    const oktaClientSecret = configService.get<string>('okta.secret')
    const baseUrl = configService.get<string>('app.baseUrl', 'http://localhost:3000')

    super({
      issuer: `https://${oktaDomain}/oauth2/default`,
      authorizationURL: `https://${oktaDomain}/oauth2/default/v1/authorize`,
      tokenURL: `https://${oktaDomain}/oauth2/default/v1/token`,
      userInfoURL: `https://${oktaDomain}/oauth2/default/v1/userinfo`,
      clientID: oktaClientId,
      clientSecret: oktaClientSecret,
      callbackURL: `${baseUrl}/auth/callback`,
      scope: ['openid', 'profile', 'email'],
      passReqToCallback: true
    })
  }

  async validate (
    req: any,
    issuer: string,
    profile: any,
    idToken: string,
    accessToken: string,
    refreshToken: string,
    done: Function
  ): Promise<any> {
    const user = {
      issuer,
      profile,
      idToken,
      accessToken,
      refreshToken
    }
    done(null, user)
  }
}
