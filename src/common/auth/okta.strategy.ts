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
    const baseUrl = configService.get<string>('baseUrl', '')
    const callbackURL = `${baseUrl}/auth/callback`

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

    // Debug logging
    this.logger.debug('Okta Configuration:')
    this.logger.debug(`Domain: ${oktaDomain}`)
    this.logger.debug(`Client ID: ${clientId}`)
    this.logger.debug(`Base URL: ${baseUrl}`)
    this.logger.debug(`Callback URL: ${callbackURL}`)
    this.logger.log(`OktaStrategy initialized for ${oktaDomain}`)
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

      return user
    } catch (error) {
      this.logger.error(`Validation error: ${error.message}`)
      this.logger.error(error.stack)
      throw error
    }
  }
}
