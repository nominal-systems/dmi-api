import { Controller, Get, Req, Res } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ConfigService } from '@nestjs/config'
import fastifyPassport from 'fastify-passport'

@Controller('auth')
export class AuthController {
  constructor (private readonly configService: ConfigService) {
  }

  @Get('login')
  async login (@Req() req: FastifyRequest, @Res() res: FastifyReply): Promise<void> {
    console.log('login()') // TODO(gb): remove trace
    const authenticate = fastifyPassport.authenticate('oidc', {
      successRedirect: '/ui/admin',
      failureRedirect: '/ui/login',
      authInfo: false
    }) as (req: FastifyRequest, res: FastifyReply) => Promise<void>

    await authenticate(req, res)
  }

  @Get('callback')
  async callback (@Req() req: FastifyRequest, @Res() res: FastifyReply): Promise<void> {
    console.log('callback') // TODO(gb): remove trace
    const authenticate = fastifyPassport.authenticate('oidc', {
      successRedirect: '/ui/admin',
      failureRedirect: '/ui/login',
      authInfo: false
    }) as (req: FastifyRequest, res: FastifyReply) => Promise<void>

    await authenticate(req, res)
  }

  @Get('logout')
  async logout (@Req() req: FastifyRequest, @Res() res: FastifyReply): Promise<void> {
    await req.logout()

    const oktaDomain = this.configService.get<string>('okta.domain')
    const clientId = this.configService.get<string>('okta.clientId')
    const baseUrl = this.configService.get<string>('app.baseUrl', 'http://localhost:3000')

    const logoutUrl = `https://${oktaDomain}/oauth2/default/v1/logout?client_id=${clientId}&post_logout_redirect_uri=${baseUrl}`
    return res.redirect(logoutUrl)
  }
}
