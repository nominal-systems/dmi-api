import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards
} from '@nestjs/common'
import { Organization } from '../common/decorators/organization.decorator'
import { ApiGuard } from '../common/guards/api.guard'
import { Organization as OrganizationEntity } from '../organizations/entities/organization.entity'
import { CreateIntegrationDto } from './dtos/create-integration.dto'
import { Integration } from './entities/integration.entity'
import { IntegrationsService } from './integrations.service'

@Controller('integrations')
@UseGuards(ApiGuard)
export class IntegrationsController {
  constructor (private readonly integrationsService: IntegrationsService) {}

  @Get()
  async getAllIntegrations (): Promise<Integration[]> {
    return await this.integrationsService.findAll()
  }

  @Post()
  async createIntegration (
    @Body() createIntegrationDto: CreateIntegrationDto
  ): Promise<Integration> {
    return await this.integrationsService.create(createIntegrationDto)
  }

  @Delete(':id')
  async deleteIntegration (
    @Organization() organization: OrganizationEntity,
    @Param('id') integrationId: string
  ): Promise<void> {
    return await this.integrationsService.delete(organization, integrationId)
  }
}
