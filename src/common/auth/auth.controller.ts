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
    this.logger.debug(`Request headers: ${JSON.stringify(req.headers)}`)
    this.logger.debug(`Session: ${JSON.stringify(req.session)}`)

    try {
      const authenticate = fastifyPassport.authenticate('oidc', {
        successRedirect: '/ui/admin',
        failureRedirect: '/ui/login',
        failureMessage: true
      }) as (req: FastifyRequest, res: FastifyReply) => Promise<void>

      this.logger.debug('About to call authenticate')
      await authenticate(req, res)
      this.logger.debug('Authentication initiated')
    } catch (error) {
      this.logger.error('Login authentication error:')
      this.logger.error(error.message)
      this.logger.error(error.stack)
      this.logger.error('Full error:', error)
      return res.redirect('/ui/login?error=auth_failed')
    }
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
        failureMessage: true
      }) as (req: FastifyRequest, res: FastifyReply) => Promise<void>

      this.logger.debug('About to call authenticate')
      await authenticate(req, res)
      this.logger.debug('Authentication completed successfully')
    } catch (error) {
      this.logger.error('Callback authentication error:')
      this.logger.error(error.message)
      this.logger.error(error.stack)
      return res.redirect('/ui/login?error=auth_failed')
    }
  }

  @Get('test')
  async test (@Req() req: FastifyRequest, @Res() res: FastifyReply): Promise<void> {
    this.logger.debug('Test endpoint called')
    return res.send({ message: 'Auth controller is working' })
  }
}
