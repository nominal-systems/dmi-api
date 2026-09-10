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
  UnauthorizedException,
} from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ConfigService } from '@nestjs/config'
import fastifyPassport from '@fastify/passport'
import { AdminUserCredentialsDto } from '../../users/dtos/admin-user-credentials.dto'
import { JwtService } from '@nestjs/jwt'

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)
  private readonly strategy: 'jwt' | 'okta'
  private readonly baseUrl: string
  private readonly adminCredentials: { username: string; password: string }
  private readonly oktaConfig?: {
    issuer: string
    issuerBase: string
    logoutURL: string
    clientId: string
  }

  constructor (configService: ConfigService, private readonly jwtService: JwtService) {
    this.strategy = configService.get<'jwt' | 'okta'>('admin.authStrategy') || 'jwt'
    this.baseUrl = configService.get<string>('baseUrl', '') ?? ''
    this.adminCredentials = configService.get('admin') ?? { username: '', password: '' }

    if (this.strategy === 'okta') {
      const issuer = configService.get<string>('okta.issuer') ?? ''
      const issuerBase = issuer.includes('/oauth2') ? issuer : `${issuer}/oauth2`

      this.oktaConfig = {
        issuer,
        issuerBase,
        logoutURL: `${issuerBase}/v1/logout`,
        clientId: configService.get<string>('okta.clientId') ?? '',
      }
    }
  }

  @Get('profile')
  async profile (@Req() req: FastifyRequest): Promise<any> {
    if (this.strategy === 'jwt') {
      const token = req.headers.authorization?.split('Bearer ')[1] ?? ''
      const payload = this.jwtService.verify<{ sub: string }>(token)
      return {
        username: payload.sub,
      }
    }

    return req.user?.profile ?? null
  }

  /**
   * True once something else has already committed a response on this reply.
   *
   * `reply.sent` alone is not enough: fastify-passport resolves its promise immediately
   * after calling `reply.redirect()`, so control comes back here while that redirect is
   * still travelling through the `onSend` hooks — and the MongoDB session store makes
   * that leg async. `reply.sent` (which only tracks `raw.writableEnded`) and
   * `raw.headersSent` are both still false in that window, so a second `send()` slips
   * through and the two `writeHead` calls race. The loser throws ERR_HTTP_HEADERS_SENT
   * from inside the hook chain, outside any try/catch, and takes the process down (#356).
   * A staged `location` header is the synchronous signal that a redirect is on its way.
   */
  private replyAlreadyCommitted (res: FastifyReply): boolean {
    return res.sent || res.raw.headersSent || res.getHeader('location') != null
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
        failureRedirect: `${this.baseUrl}/ui/login`,
        authInfo: false,
        failureMessage: true,
      }) as (req: FastifyRequest, res: FastifyReply) => Promise<void>

      await authenticate(req, res)
      this.logger.debug('Authentication initiated successfully')
    } catch (error) {
      this.logger.error('Login authentication error:')
      this.logger.error(error.message)
      this.logger.error(error.stack)
      this.logger.error('Full error:', error)
      if (this.replyAlreadyCommitted(res)) {
        this.logger.error('A response was already committed; not redirecting again')
        return
      }
      return await res.redirect(`${this.baseUrl}/ui/login?error=auth_failed`)
    }
  }

  @Get('callback')
  async callback (@Req() req: FastifyRequest, @Res() res: FastifyReply): Promise<void> {
    this.logger.debug('Received callback from Okta')
    this.logger.debug(`Query parameters: ${JSON.stringify(req.query)}`)

    // Check for Okta policy errors
    const query = req.query as { error?: string; error_description?: string; code?: string }
    if (query.error) {
      this.logger.error(`Okta authentication error: ${query.error}`)
      this.logger.error(`Error description: ${query.error_description}`)
      return await res.redirect(
        `${this.baseUrl}/ui/login?error=${query.error}&description=${encodeURIComponent(
          query.error_description || '',
        )}`,
      )
    }

    // Without an authorization code this is not a real Okta callback. Passport's OIDC
    // strategy reads a code-less request as the *start* of an authorization flow and
    // issues its own redirect to Okta, which then collides with the redirect this
    // handler sends once it finds no user — an unauthenticated GET /auth/callback was
    // enough to kill a replica (#356). Answer it here, before passport ever runs.
    if (query.code == null || query.code === '') {
      this.logger.warn('Callback received without an authorization code; redirecting to login')
      return await res.redirect(`${this.baseUrl}/ui/login?error=auth_failed`)
    }

    try {
      // Retrieve the originally requested URL from the session.
      const redirectUrl = req.session.redirectUrl || `${this.baseUrl}/ui` // default fallback
      this.logger.debug(`Retrieved redirect URL from session: ${redirectUrl}`)

      // Clean up the stored redirect so it doesn't persist for future requests.
      delete req.session.redirectUrl

      // We still need this to complete the authentication process
      const authenticate = fastifyPassport.authenticate('oidc', {
        session: true,
        failureRedirect: `${this.baseUrl}/ui/login`,
      }) as (req: FastifyRequest, res: FastifyReply) => Promise<void>

      // Complete the authentication
      this.logger.debug('Completing authentication...')
      await authenticate(req, res)

      // `failureRedirect`, and any redirect the strategy issues itself, already answered
      // the request. Anything we send now is a second response on the same reply (#356).
      if (this.replyAlreadyCommitted(res)) {
        this.logger.warn('Authentication committed its own response; not redirecting again')
        return
      }

      // At this point, the user should be authenticated and the session established
      if (req.user == null) {
        this.logger.error('Authentication completed but no user was set')
        return await res.redirect(`${this.baseUrl}/ui/login?error=auth_failed`)
      }

      this.logger.debug(
        `User authenticated: ${JSON.stringify(
          req.user.profile?.username,
        )}. Redirecting to ${redirectUrl}`,
      )

      // Note: fastify-passport stores the serialized user directly at `session.passport`, and
      // `req.user` is that same object. Normalizing to `session.passport.user = req.user` here
      // would make the object reference itself, which the MongoDB session store cannot
      // serialize ("Converting circular structure to JSON"). The preHandler hook in
      // fastify-plugins.ts already restores `req.user` from the flat `session.passport` shape.

      // Explicitly set status and perform redirect
      res.status(302)
      res.header('Location', redirectUrl)
      return await res.send()
    } catch (error) {
      this.logger.error('Callback authentication error:')
      this.logger.error(error.message)
      this.logger.error(error.stack)
      this.logger.error('Full error:', error)
      if (this.replyAlreadyCommitted(res)) {
        this.logger.error('A response was already committed; not redirecting again')
        return
      }
      return await res.redirect(`${this.baseUrl}/ui/login?error=auth_failed`)
    }
  }

  @Get('test')
  async test (@Req() req: FastifyRequest, @Res() res: FastifyReply): Promise<void> {
    this.logger.debug('Test endpoint called')
    return await res.send({ message: 'Auth controller is working' })
  }

  @Post('admin/login')
  @HttpCode(HttpStatus.OK)
  async authenticate (@Body() credentials: AdminUserCredentialsDto): Promise<{ token: string }> {
    if (
      credentials.username === this.adminCredentials.username &&
      credentials.password === this.adminCredentials.password
    ) {
      const token = await this.jwtService.signAsync({}, { subject: 'Admin' })
      return { token }
    }

    throw new UnauthorizedException('Username or password is incorrect')
  }

  @Get('logout')
  async logout (@Req() req: FastifyRequest, @Res() res: FastifyReply): Promise<void> {
    if (this.strategy === 'okta' && this.oktaConfig) {
      const { logoutURL, clientId } = this.oktaConfig
      const idToken = (req.user as any)?.idToken || (req.session as any)?.passport?.user?.idToken

      try {
        if (typeof (req as any).logout === 'function') {
          (req as any).logout()
        }
        if (req.session?.destroy) {
          await new Promise<void>((resolve) => req.session.destroy(() => resolve()))
        }
      } catch (err) {
        this.logger.error('Error destroying session during logout', err as any)
      }

      const postLogoutRedirect = `${this.baseUrl}/ui/login`
      const logoutUrl =
        `${logoutURL}?` +
        `client_id=${clientId}&post_logout_redirect_uri=${encodeURIComponent(postLogoutRedirect)}` +
        (idToken ? `&id_token_hint=${idToken}` : '')

      res.status(302)
      res.header('Location', logoutUrl.trim())
      return await res.send()
    }

    res.status(302)
    res.header('Location', `${this.baseUrl}/ui/login`)
    return await res.send()
  }
}
