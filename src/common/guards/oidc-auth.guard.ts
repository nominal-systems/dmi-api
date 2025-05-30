import { ExecutionContext, Injectable, Logger } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FastifyReply } from 'fastify'
import { ConfigService } from '@nestjs/config'

// Define the extended FastifyReply type
interface ExtendedFastifyReply extends FastifyReply {
  setHeader?: (name: string, value: string) => ExtendedFastifyReply
  end?: (data?: any) => ExtendedFastifyReply
}

@Injectable()
export class OidcAuthGuard extends AuthGuard('oidc') {
  private readonly logger = new Logger(OidcAuthGuard.name)

  constructor (private readonly configService: ConfigService) {
    super()
  }

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    // Check if we're already in the auth flow
    const isAuthPath: boolean = request.url.startsWith('/auth/')
    if (isAuthPath) {
      return true
    }

    // If already authenticated, just allow access
    if (request.isAuthenticated()) {
      return true
    }

    if (!request.isAuthenticated()) {
      return false
    }

    return false
  }
}
