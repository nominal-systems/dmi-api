import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { OrganizationsService } from '../../organizations/organizations.service'

@Injectable()
export class ApiGuard implements CanActivate {
  constructor (private organizationsService: OrganizationsService) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const apiKey = request.headers['x-api-key']

    if (!apiKey) return false

    const organization = await this.organizationsService.findOne({
      options: { where: [{ prodKey: apiKey }, { testKey: apiKey }] },
    })

    if (!organization) return false

    const { testKey, prodKey, ...rest } = organization

    request.organization = rest

    return true
  }
}
