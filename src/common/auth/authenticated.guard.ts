// auth/authenticated.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate (context: ExecutionContext): boolean {
    const request: FastifyRequest = context.switchToHttp().getRequest()
    const reply: FastifyReply = context.switchToHttp().getResponse()

    if (request.isAuthenticated()) {
      return true
    } else {
      reply.redirect('/auth/login')
      return false
    }
  }
}
