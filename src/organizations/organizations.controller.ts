import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { DisableGuards } from '../common/decorators/disable-guards.decorator'
import { User } from '../common/decorators/user.decorator'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { TransformInterceptor } from '../common/interceptors/transform.interceptor'
import { CreateOrganizationDto } from './dtos/create-organization.dto'
import { OrganizationKeys } from './dtos/organization-keys.dto'
import { NeedsOrganizationOwner } from './needsOwner.decorator'
import { OrganizationMemberGuard } from './organization-member.guard'
import { OrganizationsService } from './organizations.service'

@Controller('organizations')
@UseGuards(JwtAuthGuard, OrganizationMemberGuard)
export class OrganizationsController {
  constructor (private readonly organizationsService: OrganizationsService) {}

  @Get(':id')
  async findOrganization (@Param('id') organizationId: string) {
    const organization = await this.organizationsService.findOne({
      id: organizationId,
      options: {
        relations: ['owner', 'members', 'practices', 'providerConfigurations'],
      },
    })

    if (!organization) {
      throw new NotFoundException("The organization doesn't exist")
    }

    return organization
  }

  @Post()
  @DisableGuards(OrganizationMemberGuard.name)
  async createOrganization (
    @Body() createOrganizationDto: CreateOrganizationDto,
    @User() user,
  ) {
    return await this.organizationsService.create(createOrganizationDto, user)
  }

  @Get(':id/keys')
  @UseInterceptors(new TransformInterceptor(OrganizationKeys))
  async getKeys (@Param('id') organizationId: string) {
    return await this.organizationsService.findOne({
      id: organizationId,
      options: {
        select: ['testKey', 'prodKey'],
      },
    })
  }

  @Put(':id/keys')
  @NeedsOrganizationOwner()
  async regenerateKeys (@Param('id') organizationId: string) {
    return await this.organizationsService.regenerateKeys(organizationId)
  }
}
