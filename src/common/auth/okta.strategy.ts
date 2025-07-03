import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import fastifyPassport from 'fastify-passport'
import { Strategy } from 'passport-openidconnect'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

@Injectable()
export class OktaStrategy extends PassportStrategy(Strategy, 'oidc') {
  private readonly logger = new Logger(OktaStrategy.name)

  constructor(private readonly configService: ConfigService) {
    const baseUrl = configService.get<string>('baseUrl', '')
    const oktaDomain = configService.get<string>('okta.domain')
    const issuer = configService.get<string>('okta.issuer') || `https://${oktaDomain}/oauth2`
    const authorizationURL = `${issuer}/v1/authorize`
    const tokenURL = `${issuer}/v1/token`
    const userInfoURL = `${issuer}/v1/userinfo`
    const clientID = configService.get<string>('okta.clientId', '')
    const clientSecret = configService.get<string>('okta.clientSecret', '')
    const callbackURL = `${baseUrl}/auth/callback`

    super(
      {
        issuer,
        authorizationURL,
        tokenURL,
        userInfoURL,
        clientID,
        clientSecret,
        callbackURL,
        scope: 'profile',
        passReqToCallback: true,
        proxy: true,
      },
      async (
        req: any,
        issuer: string,
        profile: any,
        context: any,
        idToken: string,
        accessToken: string,
        refreshToken: string,
        params: any,
        done: (err: any, user?: any) => void,
      ) => {
        this.logger.debug('OktaStrategy validate callback invoked')
        this.logger.debug(`Session at strategy start: ${JSON.stringify(req.session)}`)
        try {
          if (!profile) {
            this.logger.error('No profile received from Okta')
            return done(new UnauthorizedException('Invalid user profile'))
          }

          const user = {
            issuer,
            profile,
            idToken,
            accessToken,
            refreshToken,
          }

          this.logger.debug(`Validated user profile: ${JSON.stringify(user.profile)}`)
          this.logger.debug('Calling done with validated user')

          return done(null, user)
        } catch (error) {
          this.logger.error(`Validation error: ${error.message}`)
          this.logger.error((error as Error).stack)
          return done(error)
        }
      },
    )

    this.name = 'oidc'
    fastifyPassport.use('oidc', this)

    // Debug logging
    this.logger.debug('Okta Configuration:')
    this.logger.debug(`Domain: ${oktaDomain}`)
    this.logger.debug(`Issuer: ${issuer}`)
    this.logger.debug(`Client ID: ${clientID}`)
    this.logger.debug(`Authorization URL: ${authorizationURL}`)
    this.logger.debug(`Token URL: ${tokenURL}`)
    this.logger.debug(`UserInfo URL: ${userInfoURL}`)
    this.logger.debug(`Base URL: ${baseUrl}`)
    this.logger.debug(`Callback URL: ${callbackURL}`)
    this.logger.log(`OktaStrategy initialized for ${oktaDomain}`)
  }
}
