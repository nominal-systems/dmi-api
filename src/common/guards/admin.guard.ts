import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
  constructor (
    private readonly jwtService: JwtService
  ) {
    super()
  }

  canActivate (context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const authorization = request.headers.authorization
    try {
      this.jwtService.verify(authorization?.split('Bearer ')[1])
    } catch (error) {
      return false
    }

    return true
  }
}
