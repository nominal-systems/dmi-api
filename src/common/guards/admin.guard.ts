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
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse<ExtendedFastifyReply>()

    this.logger.debug(`AdminGuard.canActivate(): ${request.method} ${request.url}`)

    // Check if we're already in the auth flow
    const isAuthPath = request.url.startsWith('/auth/')
    if (isAuthPath) {
      this.logger.debug('Already in auth flow, allowing request')
      return true
    }

    // If already authenticated, just allow access
    if (request.isAuthenticated?.()) {
      this.logger.debug(`User already authenticated: ${JSON.stringify(request.user.profile.username)}. Allowing request.`)
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
  console.log(`AdminGuard UserSerializer= ${JSON.stringify(user, null, 2)}`) // TODO(gb): remove trace
  return user
})

fastifyPassport.registerUserDeserializer(async (user: any) => {
  console.log(`AdminGuard UserDeserializer= ${JSON.stringify(user, null, 2)}`) // TODO(gb): remove trace
  return user
})
