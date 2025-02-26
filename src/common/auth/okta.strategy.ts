import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-openidconnect'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class OktaStrategy extends PassportStrategy(Strategy, 'oidc') {
  private readonly logger = new Logger(OktaStrategy.name)

  constructor (private readonly configService: ConfigService) {
    const oktaDomain = configService.get<string>('okta.domain')
    const clientId = configService.get<string>('okta.clientId')
    const clientSecret = configService.get<string>('okta.clientSecret')
    const baseUrl = configService.get<string>('app.baseUrl', 'http://localhost:3000')
    const callbackURL = `${baseUrl}/auth/callback`

    console.log(`issuer= https://${oktaDomain}`) // TODO(gb): remove trace
    console.log(`authorizationURL= https://${oktaDomain}/oauth2/default/v1/authorize`) // TODO(gb): remove trace
    console.log(`tokenURL= https://${oktaDomain}/oauth2/default/v1/token`) // TODO(gb): remove trace
    console.log(`userInfoURL= https://${oktaDomain}/oauth2/default/v1/userinfo`) // TODO(gb): remove trace
    console.log(`clientID= ${clientId}`) // TODO(gb): remove trace
    console.log(`clientSecret= ${clientSecret}`) // TODO(gb): remove trace
    console.log(`callbackURL= ${callbackURL}`) // TODO(gb): remove trace
    console.log('scope= \'openid profile\'') // TODO(gb): remove trace
    console.log('response_type: \'code\'') // TODO(gb): remove trace

    super({
      issuer: `https://${oktaDomain}/oauth2/default`,
      authorizationURL: `https://${oktaDomain}/oauth2/default/v1/authorize`,
      tokenURL: `https://${oktaDomain}/oauth2/default/v1/token`,
      userInfoURL: `https://${oktaDomain}/oauth2/default/v1/userinfo`,
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: callbackURL,
      scope: 'profile',
      response_type: 'code',
      passReqToCallback: true
    })

    this.logger.debug('OktaStrategy initialized')
  }

  async validate (
    req: any,
    issuer: string,
    profile: any,
    idToken: string,
    accessToken: string,
    refreshToken: string
  ): Promise<any> {
    try {
      this.logger.debug(`OktaStrategy.validate(): ${JSON.stringify(profile)}`)

      if (!profile) {
        this.logger.error('No profile received from Okta')
        throw new UnauthorizedException('Invalid user profile')
      }

      const user = {
        issuer,
        profile,
        idToken,
        accessToken,
        refreshToken
      }

      this.logger.debug(`Returning user: ${JSON.stringify(user)}`)
      return user
    } catch (error) {
      this.logger.error(`Validation error: ${error.message}`)
      this.logger.error(error.stack)
      throw error
    }
  }
}
