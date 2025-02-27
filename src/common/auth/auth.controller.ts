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

      await authenticate(req, res)
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

    try {
      // Retrieve the originally requested URL from the session.
      const redirectUrl = req.session.redirectUrl || '/ui' // default fallback

      // Clean up the stored redirect so it doesn't persist for future requests.
      delete req.session.redirectUrl

      // We still need this to complete the authentication process
      const authenticate = fastifyPassport.authenticate('oidc', {
        session: true,
        failureRedirect: '/ui/login'
      }) as (req: FastifyRequest, res: FastifyReply) => Promise<void>

      // Complete the authentication
      await authenticate(req, res)

      // At this point, the user should be authenticated and the session established
      if (req.user == null) {
        this.logger.error('Authentication completed but no user was set')
        return await res.redirect('/ui/login?error=auth_failed')
      }

      this.logger.debug(`User authenticated: ${JSON.stringify(req.user.profile.username)}. Redirecting to ${redirectUrl}`)

      // Explicitly set status and perform redirect
      res.status(302)
      res.header('Location', redirectUrl)
      return await res.send()
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
