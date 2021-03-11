import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { OrganizationsService } from '../../organizations/organizations.service'

@Injectable()
export class ApiGuard implements CanActivate {
  constructor (private organizationsService: OrganizationsService) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const apiKey = request.headers['x-api-key']
    const user = request.user

    if (!apiKey || !user.organization) return false

    const organizationKeys = await this.organizationsService.getOrganizationsKeys(
      user.organization.id,
    )

    if (!organizationKeys) return false

    return Object.values(organizationKeys).some(
      organizationKey => organizationKey === apiKey,
    )
  }
}
