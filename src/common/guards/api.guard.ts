import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
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

    const organization = await this.organizationsService.findOne({
      options: { where: [{ prodKey: apiKey }, { testKey: apiKey }] }
    })

    if (organization == null) return false

    const { testKey, prodKey, ...rest } = organization

    request.organization = rest

    return true
  }
}
