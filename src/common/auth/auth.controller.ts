import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  UnauthorizedException
} from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ConfigService } from '@nestjs/config'
import fastifyPassport from 'fastify-passport'
import { AdminUserCredentialsDto } from '../../users/dtos/admin-user-credentials.dto'
import { JwtService } from '@nestjs/jwt'

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor (
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
  }

  @Get('login')
  async login (@Req() req: FastifyRequest, @Res() res: FastifyReply): Promise<void> {
    // Capture the redirect query parameter and store it in the session.
    const query = req.query as { redirect?: string }
    if (query.redirect) {
      req.session.redirectUrl = query.redirect
      this.logger.debug(`Stored redirect URL: ${query.redirect}`)
    }

    try {
      this.logger.debug('Starting Okta authentication...')
      const authenticate = fastifyPassport.authenticate('oidc', {
        session: true,
        failureRedirect: '/ui/login',
        authInfo: false,
        failureMessage: true
      }) as (req: FastifyRequest, res: FastifyReply) => Promise<void>

      await authenticate(req, res)
      this.logger.debug('Authentication initiated successfully')
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
    this.logger.debug('Received callback from Okta')
    this.logger.debug(`Query parameters: ${JSON.stringify(req.query)}`)

    // Check for Okta policy errors
    const query = req.query as { error?: string; error_description?: string }
    if (query.error) {
      this.logger.error(`Okta authentication error: ${query.error}`)
      this.logger.error(`Error description: ${query.error_description}`)
      return await res.redirect(`/ui/login?error=${query.error}&description=${encodeURIComponent(query.error_description || '')}`)
    }

    try {
      // Retrieve the originally requested URL from the session.
      const redirectUrl = req.session.redirectUrl || '/ui' // default fallback
      this.logger.debug(`Retrieved redirect URL from session: ${redirectUrl}`)

      // Clean up the stored redirect so it doesn't persist for future requests.
      delete req.session.redirectUrl

      // We still need this to complete the authentication process
      const authenticate = fastifyPassport.authenticate('oidc', {
        session: true,
        failureRedirect: '/ui/login'
      }) as (req: FastifyRequest, res: FastifyReply) => Promise<void>

      // Complete the authentication
      this.logger.debug('Completing authentication...')
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
      this.logger.error('Full error:', error)
      return await res.redirect('/ui/login?error=auth_failed')
    }
  }

  @Get('test')
  async test (@Req() req: FastifyRequest, @Res() res: FastifyReply): Promise<void> {
    this.logger.debug('Test endpoint called')
    return await res.send({ message: 'Auth controller is working' })
  }

  @Post('admin/login')
  @HttpCode(HttpStatus.OK)
  async authenticate (
    @Body() credentials: AdminUserCredentialsDto
  ): Promise<{ token: string }> {
    const adminCredentials = this.configService.get('admin')
    if (credentials.username === adminCredentials.username && credentials.password === adminCredentials.password) {
      const token = await this.jwtService.signAsync({}, { subject: 'admin' })
      return { token }
    }

    throw new UnauthorizedException('Username or password is incorrect')
  }
}
