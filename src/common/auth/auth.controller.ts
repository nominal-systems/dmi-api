import { Controller, Get, Logger, Req, Res } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ConfigService } from '@nestjs/config'
import fastifyPassport from 'fastify-passport'

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor (private readonly configService: ConfigService) {
  }

  @Get('login')
  async login (@Req() req: FastifyRequest, @Res() res: FastifyReply): Promise<void> {
    this.logger.debug('Login endpoint called')

    // Capture the redirect query parameter and store it in the session.
    const query = req.query as { redirect?: string }
    if (query.redirect) {
      req.session.redirectUrl = query.redirect
    }

    try {
      const authenticate = fastifyPassport.authenticate('oidc', {
        session: true,
        failureRedirect: '/ui/login',
        authInfo: false,
        failureMessage: true
      }) as (req: FastifyRequest, res: FastifyReply) => Promise<void>

      this.logger.debug('About to call authenticate')
      await authenticate(req, res)
      console.log('After authenticate, req.user:', req.user)
      this.logger.debug('Authentication initiated')
    } catch (error) {
      this.logger.error('Login authentication error:')
      this.logger.error(error.message)
      this.logger.error(error.stack)
      this.logger.error('Full error:', error)
      return await res.redirect('/ui/login?error=auth_failed')
    }
  }

  @Get('callback')
  async callback (
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply
  ): Promise<void> {
    this.logger.debug('Callback endpoint called')

    try {
      // Retrieve the originally requested URL from the session.
      const redirectUrl = req.session.redirectUrl || '/ui/admin' // default fallback
      console.log(`redirectUrl= ${JSON.stringify(redirectUrl, null, 2)}`) // TODO(gb): remove trace

      // Clean up the stored redirect so it doesn't persist for future requests.
      delete req.session.redirectUrl

      const authenticate = fastifyPassport.authenticate('oidc', {
        session: true,
        successRedirect: redirectUrl,
        failureRedirect: '/ui/login',
        authInfo: false,
        failureMessage: true
      }) as (req: FastifyRequest, res: FastifyReply) => Promise<void>

      this.logger.debug('About to call authenticate')
      await authenticate(req, res)
      this.logger.debug('Authentication completed successfully')


    } catch (error) {
      this.logger.error('Callback authentication error:')
      this.logger.error(error.message)
      this.logger.error(error.stack)
      return await res.redirect('/ui/login?error=auth_failed')
    }
  }

  @Get('test')
  async test (@Req() req: FastifyRequest, @Res() res: FastifyReply): Promise<void> {
    this.logger.debug('Test endpoint called')
    return await res.send({ message: 'Auth controller is working' })
  }
}
