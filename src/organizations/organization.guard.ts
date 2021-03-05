import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { OrganizationsService } from './organizations.service'

@Injectable()
export class OrganizationGuard implements CanActivate {
  constructor (
    private reflector: Reflector,
    private organizationsService: OrganizationsService,
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const disabledGuards = this.reflector.get<string[]>(
      'disabledGuards',
      context.getHandler(),
    )

    if (disabledGuards && disabledGuards.includes(OrganizationGuard.name)) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const needsOwner = this.reflector.get<string[]>(
      'needsOrganizationOwner',
      context.getHandler(),
    )
    const organizationId = request.params.id
    const user = request.user

    if (needsOwner) {
      const organization = await this.organizationsService.findOne({
        _id: organizationId,
      })

      if (organization.owner.toString() !== user._id.toString()) {
        return false
      }
    }

    return user.organization && user.organization.toString() === organizationId
  }
}
