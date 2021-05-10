import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { OrganizationsService } from '../../organizations/services/organizations.service'
import { ClassType } from '../typings/class.type'

@Injectable()
export class ApiGuard implements CanActivate {
  constructor (
    private readonly reflector: Reflector,
    private readonly organizationsService: OrganizationsService
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const disabledGuards = this.reflector.get<ClassType[]>(
      'disabledGuards',
      context.getHandler()
    )

    if (disabledGuards?.includes(ApiGuard)) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const apiKey = request.headers['x-api-key']

    if (apiKey == null) return false

    let organization

    try {
      organization = await this.organizationsService.findOne({
        options: { where: [{ prodKey: apiKey }, { testKey: apiKey }] }
      })
    } catch (error) {
      if (error instanceof NotFoundException) return false

      throw error
    }

    const { testKey, prodKey, ...rest } = organization

    request.organization = rest

    return true
  }
}
