import { Controller, Get, Logger, Req, Res } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ConfigService } from '@nestjs/config'
import fastifyPassport from 'fastify-passport'

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor (private readonly configService: ConfigService) {}

  @Get('login')
  async login (@Req() req: FastifyRequest, @Res() res: FastifyReply): Promise<void> {
    this.logger.debug('Login endpoint called')

    const oktaDomain = this.configService.get<string>('okta.domain')
    const clientId = this.configService.get<string>('okta.clientId', '')
    const baseUrl = this.configService.get<string>('app.baseUrl', 'http://localhost:3000')
    const redirectUri = `${baseUrl}/auth/callback`

    // Construct the authorization URL manually
    const authUrl = new URL(`https://${oktaDomain}/oauth2/default/v1/authorize`)
    authUrl.searchParams.append('client_id', clientId)
    authUrl.searchParams.append('response_type', 'code')
    authUrl.searchParams.append('scope', 'openid profile email offline_access')
    authUrl.searchParams.append('redirect_uri', redirectUri)
    authUrl.searchParams.append('state', Math.random().toString(36).substring(7))

    this.logger.debug(`Redirecting to Okta: ${authUrl.toString()}`)

    return res.redirect(authUrl.toString())
  }

  @Get('callback')
  async callback (@Req() req: FastifyRequest, @Res() res: FastifyReply): Promise<void> {
    this.logger.debug('Callback endpoint called')
    this.logger.debug(`Query parameters: ${JSON.stringify(req.query)}`)
    this.logger.debug(`Headers: ${JSON.stringify(req.headers)}`)
    this.logger.debug(`URL: ${req.url}`)

    try {
      const authenticate = fastifyPassport.authenticate('oidc', {
        successRedirect: '/ui/admin',
        failureRedirect: '/ui/login',
        authInfo: false,
        failureMessage: true
      }) as (req: FastifyRequest, res: FastifyReply) => Promise<void>

      await authenticate(req, res)
    } catch (error) {
      this.logger.error('Callback authentication error:')
      this.logger.error(error.message)
      this.logger.error(error.stack)

      // Log the full error object
      this.logger.error('Full error object:')
      this.logger.error(JSON.stringify(error, null, 2))

      return res.redirect('/ui/login?error=auth_failed')
    }
  }
}
