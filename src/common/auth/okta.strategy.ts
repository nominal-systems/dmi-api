import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-openidconnect'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class OktaStrategy extends PassportStrategy(Strategy, 'oidc') {
  private readonly logger = new Logger(OktaStrategy.name)

  constructor (private readonly configService: ConfigService) {
    const oktaDomain = configService.get<string>('okta.domain')
    const clientID = configService.get<string>('okta.clientId')
    const clientSecret = configService.get<string>('okta.clientSecret')
    const baseUrl = configService.get<string>('app.baseUrl', 'http://localhost:3000')
    const callbackURL = `${baseUrl}/auth/callback`

    // Log configuration
    console.log('Okta Strategy Configuration:')
    console.log(`Domain: ${oktaDomain}`)
    console.log(`Client ID: ${clientID}`)
    console.log(`Callback URL: ${callbackURL}`)
    console.log(`Base URL: ${baseUrl}`)

    super({
      issuer: `https://${oktaDomain}/oauth2/default`,
      authorizationURL: `https://${oktaDomain}/oauth2/default/v1/authorize`,
      tokenURL: `https://${oktaDomain}/oauth2/default/v1/token`,
      userInfoURL: `https://${oktaDomain}/oauth2/default/v1/userinfo`,
      clientID,
      clientSecret,
      callbackURL,
      scope: 'profile email offline_access',
      passReqToCallback: true,
      state: true,
      pkce: true,
      response_type: 'code',
      sessionKey: 'oauth2:okta',
      skipUserProfile: false,
      proxy: false
    })

    this.logger.debug('OktaStrategy initialized')
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
    try {
      this.logger.debug('Validate method called')
      this.logger.debug(`Issuer: ${issuer}`)
      this.logger.debug(`Profile: ${JSON.stringify(profile)}`)
      this.logger.debug(`ID Token: ${idToken}`)

      if (!profile) {
        return done(new UnauthorizedException('Invalid user profile'), null)
      }

      const user = {
        issuer,
        profile,
        idToken,
        accessToken,
        refreshToken
      }

      return done(null, user)
    } catch (error) {
      this.logger.error(`Validation error: ${error.message}`)
      return done(error, null)
    }
  }
}
