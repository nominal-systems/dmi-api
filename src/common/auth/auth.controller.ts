import { Controller, Get, Req, Res } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import fastifyPassport from 'fastify-passport'

@Controller('auth')
export class AuthController {
  @Get('login')
  async login (@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    await fastifyPassport.authenticate('oidc')(req, res)
  }

  @Get('callback')
  async callback (@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    await fastifyPassport.authenticate('oidc', {
      successRedirect: '/protected',
      failureRedirect: '/auth/login'
    })(req, res)
  }

  @Get('logout')
  async logout (@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    req.logout()
    res.redirect('/')
  }
}
