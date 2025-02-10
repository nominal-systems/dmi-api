import { ExecutionContext, Injectable, Logger } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FastifyReply } from 'fastify'
import fastifyPassport from 'fastify-passport'

// Define the extended FastifyReply type
interface ExtendedFastifyReply extends FastifyReply {
  setHeader?: (name: string, value: string) => ExtendedFastifyReply
  end?: (data?: any) => ExtendedFastifyReply
}

@Injectable()
export class AdminGuard extends AuthGuard('oidc') {
  private readonly logger = new Logger(AdminGuard.name)

  async canActivate (context: ExecutionContext): Promise<boolean> {
    this.logger.debug('AdminGuard.canActivate() called')
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse<ExtendedFastifyReply>()
    this.logger.debug(`Session contents: ${JSON.stringify(request.session)}`)

    this.logger.debug(`Request URL: ${request.url}`)
    this.logger.debug(`Request method: ${request.method}`)
    this.logger.debug(`Request headers: ${JSON.stringify(request.headers)}`)
    this.logger.debug(`Is authenticated: ${request.isAuthenticated?.()}`)
    this.logger.debug(`Session: ${JSON.stringify(request.session)}`)
    this.logger.debug(`User: ${JSON.stringify(request.user)}`)

    // Check if we're already in the auth flow
    const isAuthPath = request.url.startsWith('/auth/')
    if (isAuthPath) {
      this.logger.debug('Already in auth flow, allowing request')
      return true
    }

    if (!request.isAuthenticated?.()) {
      this.logger.debug('User not authenticated, redirecting to /auth/login')
      response.status(302).redirect('/auth/login')
      return false
    }

    try {
      const result = (await super.canActivate(context)) as boolean
      this.logger.debug(`Authentication result: ${result}`)
      return result
    } catch (error) {
      this.logger.error(`Authentication error: ${error.message}`)
      this.logger.error(error.stack)
      response.status(302).redirect('/auth/login')
      return false
    }
  }
}

// Register serializers for session support
fastifyPassport.registerUserSerializer(async (user: any) => {
  console.log(`registerUserSerializer()= ${JSON.stringify(user, null, 2)}`) // TODO(gb): remove trace
  return JSON.stringify(user)
})

fastifyPassport.registerUserDeserializer(async (serialized: string) => {
  console.log(`registerUserDeserializer= ${JSON.stringify(serialized, null, 2)}`) // TODO(gb): remove trace
  return JSON.parse(serialized)
})
