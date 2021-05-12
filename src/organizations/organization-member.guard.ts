import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ClassType } from '../common/typings/class.type'
import { User } from '../users/entity/user.entity'
import { OrganizationsService } from './services/organizations.service'

@Injectable()
export class OrganizationMemberGuard implements CanActivate {
  constructor (
    private readonly reflector: Reflector,
    private readonly organizationsService: OrganizationsService
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const disabledGuards = this.reflector.get<ClassType[]>(
      'disabledGuards',
      context.getHandler()
    )

    if (disabledGuards?.includes(OrganizationMemberGuard)) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const needsOwner = this.reflector.get<string[]>(
      'needsOrganizationOwner',
      context.getHandler()
    )
    const organizationId = request.params.organizationId ?? request.params.id
    const user: User = request.user

    if (needsOwner != null) {
      const organization = await this.organizationsService.findOne({
        id: organizationId
      })

      if (organization.ownerId !== user.id) {
        return false
      }
    }

    return user.organization?.id === organizationId
  }
}
