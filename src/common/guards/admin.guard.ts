import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
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

  constructor () {
    super({
      passReqToCallback: true
    })
  }

  async canActivate (context: ExecutionContext): Promise<boolean> {
    this.logger.debug('AdminGuard.canActivate() called')
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse<ExtendedFastifyReply>()

    this.logger.debug(`Request URL: ${request.url}`)
    this.logger.debug(`Request method: ${request.method}`)
    this.logger.debug(`Request headers: ${JSON.stringify(request.headers)}`)

    const logger = this.logger

    // Add Express-like methods to the Fastify response
    response.setHeader = function (name: string, value: string) {
      logger.debug(`Setting header: ${name}=${value}`)
      this.header(name, value)
      return this
    }

    response.end = function (data?: any) {
      logger.debug(`Ending response with data: ${data}`)
      this.send(data)
      return this
    }

    try {
      this.logger.debug('Attempting to authenticate...')
      const result = (await super.canActivate(context)) as boolean
      this.logger.debug(`Authentication result: ${result}`)
      return result
    } catch (error) {
      this.logger.error(`Authentication error: ${error.message}`)
      this.logger.error(error.stack)

      // Check if we're already in the auth flow
      const isAuthPath = request.url.startsWith('/auth/')
      if (isAuthPath) {
        this.logger.debug('Already in auth flow, throwing error')
        throw error // Don't redirect if we're already in the auth flow
      }

      this.logger.debug('Redirecting to /auth/login')
      await response.redirect('/auth/login')
      return false
    }
  }

  handleRequest (err: any, user: any, info: any) {
    this.logger.debug(`AdminGuard.handleRequest() called`)
    this.logger.debug(`User: ${JSON.stringify(user)}`)
    this.logger.debug(`Error: ${err?.message}`)
    this.logger.debug(`Error stack: ${err?.stack}`)
    this.logger.debug(`Info: ${JSON.stringify(info)}`)

    if (err || !user) {
      throw err || new UnauthorizedException()
    }
    return user
  }
}

// Register serializers for session support
fastifyPassport.registerUserSerializer(async (user: any) => {
  return JSON.stringify(user)
})

fastifyPassport.registerUserDeserializer(async (serialized: string) => {
  return JSON.parse(serialized)
})
