import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { User } from '../users/entity/user.entity'
import { OrganizationsService } from './organizations.service'

@Injectable()
export class OrganizationMemberGuard implements CanActivate {
  constructor (
    private reflector: Reflector,
    private organizationsService: OrganizationsService,
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const disabledGuards = this.reflector.get<string[]>(
      'disabledGuards',
      context.getHandler(),
    )

    if (disabledGuards && disabledGuards.includes(OrganizationMemberGuard.name)) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const needsOwner = this.reflector.get<string[]>(
      'needsOrganizationOwner',
      context.getHandler(),
    )
    const organizationId = request.params.id
    const user: User = request.user

    if (needsOwner) {
      const organization = await this.organizationsService.findOne({
        id: organizationId,
      })

      if (organization.owner.id !== user.id) {
        return false
      }
    }

    return user.organization && user.organization.id === organizationId
  }
}
