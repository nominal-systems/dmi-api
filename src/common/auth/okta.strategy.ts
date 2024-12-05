import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-openidconnect'
import { ConfigService } from '@nestjs/config'
import { User } from './user.interface'

@Injectable()
export class OktaStrategy extends PassportStrategy(Strategy, 'oidc') {
  constructor (
    @Inject('ConfigService') readonly configService: ConfigService
  ) {
    const oktaDomain = configService.get<string>('okta.domain', '')
    console.log(`oktaDomain= ${JSON.stringify(oktaDomain, null, 2)}`) // TODO(gb): remove trace
    const oktaClientId = configService.get<string>('okta.clientId', '')
    console.log(`oktaClientId= ${JSON.stringify(oktaClientId, null, 2)}`) // TODO(gb): remove trace
    super(
      {
        issuer: `https://${oktaDomain}/oauth2/default`,
        authorizationURL: `https://${configService.get<string>('okta.domain', '')}/oauth2/default/v1/authorize`,
        tokenURL: `https://${configService.get<string>('okta.domain', '')}/oauth2/default/v1/token`,
        userInfoURL: `https://${configService.get<string>('okta.domain', '')}/oauth2/default/v1/userinfo`,
        clientID: oktaClientId,
        clientSecret: configService.get<string>('okta.secret', ''),
        // TODO(gb): load this from env?
        callbackURL: 'http://localhost:3000/auth/callback',
        scope: 'openid profile email'
      },
      async (
        issuer: string,
        profile: any,
        context: any,
        idToken: string,
        accessToken: string,
        refreshToken: string,
        params: any,
        done: (error: any, user?: User) => void
      ) => {
        const user: User = {
          issuer,
          profile,
          idToken,
          accessToken,
          refreshToken,
          params
        }
        done(null, user)
      }
    )
  }
}
