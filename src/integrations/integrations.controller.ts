import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards
} from '@nestjs/common'
import { SelectQueryBuilder } from 'typeorm'
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
  async getAllIntegrations (
    @Organization() organization: OrganizationEntity
  ): Promise<Integration[]> {
    return await this.integrationsService.findAll({
      where: (qb: SelectQueryBuilder<Integration>) => {
        qb.where('providerConfiguration.organizationId = :organizationId', {
          organizationId: organization.id
        })
      },
      join: {
        alias: 'integration',
        leftJoin: {
          providerConfiguration: 'integration.providerConfiguration'
        }
      }
    })
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createIntegration (
    @Body() createIntegrationDto: CreateIntegrationDto
  ): Promise<Integration> {
    return await this.integrationsService.create(createIntegrationDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteIntegration (
    @Organization() organization: OrganizationEntity,
    @Param('id') integrationId: string
  ): Promise<void> {
    return await this.integrationsService.delete(organization, integrationId)
  }
}
