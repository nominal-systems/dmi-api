import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { DisableGuards } from '../common/decorators/disable-guards.decorator'
import { User } from '../common/decorators/user.decorator'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { TransformInterceptor } from '../common/interceptors/transform.interceptor'
import { User as UserEntity } from '../users/entity/user.entity'
import { CreateInvitationDTO } from './dtos/create-invitation.dto'
import { CreateOrganizationDto } from './dtos/create-organization.dto'
import { OrganizationKeys } from './dtos/organization-keys.dto'
import { UpdateInvitationDTO } from './dtos/update-invitation.dto'
import { Invitation } from './entities/invitation.entity'
import { Organization } from './entities/organization.entity'
import { InvitationsService } from './services/invitations.service'
import { NeedsOrganizationOwner } from './needsOwner.decorator'
import { OrganizationMemberGuard } from './organization-member.guard'
import { OrganizationsService } from './services/organizations.service'

@Controller('organizations')
@UseGuards(JwtAuthGuard, OrganizationMemberGuard)
export class OrganizationsController {
  constructor (
    private readonly invitationsService: InvitationsService,
    private readonly organizationsService: OrganizationsService
  ) {}

  @Get(':id')
  async findOrganization (
    @Param('id') organizationId: string
  ): Promise<Organization> {
    const organization = await this.organizationsService.findOne({
      id: organizationId,
      options: {
        relations: ['owner', 'members', 'practices', 'providerConfigurations']
      }
    })

    return organization
  }

  @Post()
  @DisableGuards(OrganizationMemberGuard)
  async createOrganization (
    @Body() createOrganizationDto: CreateOrganizationDto,
    @User() user
  ): Promise<Organization> {
    return await this.organizationsService.create(createOrganizationDto, user)
  }

  @Get(':id/keys')
  @UseInterceptors(new TransformInterceptor(OrganizationKeys))
  async getKeys (
    @Param('id') organizationId: string
  ): Promise<OrganizationKeys> {
    return await this.organizationsService.getOrganizationsKeys(organizationId)
  }

  @Put(':id/keys')
  @NeedsOrganizationOwner()
  async regenerateKeys (
    @Param('id') organizationId: string
  ): Promise<OrganizationKeys> {
    return await this.organizationsService.regenerateKeys(organizationId)
  }

  @Get(':id/invitations')
  async getInvitations (
    @User() user: UserEntity,
    @Param('id') id: string
  ): Promise<Invitation[]> {
    return await this.invitationsService.findAllForOrganization({
      user,
      organizationId: id
    })
  }

  @Get(':organizationId/invitations/:invitationId')
  async getInvitation (
    @Param() { organizationId, invitationId }
  ): Promise<Invitation> {
    return await this.invitationsService.findOneForOrganization({
      invitationId,
      organizationId
    })
  }

  @Post(':id/invitations')
  @NeedsOrganizationOwner()
  async createInvitation (
    @Body() createInvitationDto: CreateInvitationDTO
  ): Promise<Invitation> {
    return await this.invitationsService.create(createInvitationDto)
  }

  @Put(':organizationId/invitations/:invitationId')
  @DisableGuards(OrganizationMemberGuard)
  async updateInvitation (
    @User() user: UserEntity,
    @Param('invitationId') invitationId: string,
    @Body() invitationDto: UpdateInvitationDTO
  ): Promise<Invitation> {
    return await this.invitationsService.update({
      user,
      id: invitationId,
      invitation: invitationDto
    })
  }
}
