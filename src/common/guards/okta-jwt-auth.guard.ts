import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class OktaJwtAuthGuard extends AuthGuard('okta-jwt') {}
