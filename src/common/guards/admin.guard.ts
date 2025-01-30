import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FastifyReply } from 'fastify'

@Injectable()
export class AdminGuard extends AuthGuard('oidc') {
  constructor () {
    super()
  }

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse<FastifyReply>()

    try {
      const result = (await super.canActivate(context)) as boolean
      return result
    } catch (error) {
      // If not authenticated, redirect to Okta login
      await response.redirect('/auth/login')
      return false
    }
  }

  handleRequest (err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException()
    }
    return user
  }
}
