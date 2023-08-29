import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UseGuards
} from '@nestjs/common'
import { Response } from 'express'
import { ProviderConfiguration } from '../providers/entities/provider-configuration.entity'
import { ProviderConfigurationsService } from '../providers/services/provider-configurations.service'
import { BasicAuthGuard } from '../common/guards/basic-auth.guard'
import { Integration } from '../integrations/entities/integration.entity'
import { IntegrationsService } from '../integrations/integrations.service'
import { EventSubscriptionService } from '../events/services/event-subscription.service'
import { EventSubscription } from '../events/entities/event-subscription.entity'
import { OrganizationsService } from '../organizations/services/organizations.service'
import { Organization } from '../organizations/entities/organization.entity'
import { IntegrationStatus } from '../integrations/constants/integration-status.enum'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateIntegrationDto } from '../integrations/dtos/create-integration.dto'
import { ReferenceDataQueryParams } from '../providers/dtos/reference-data-queryparams.dto'
import { RefsService } from '../refs/refs.service'

@Controller('admin')
@UseGuards(BasicAuthGuard)
export class AdminController {
  constructor (
    private readonly organizationsService: OrganizationsService,
    private readonly providerConfigurationsService: ProviderConfigurationsService,
    private readonly eventSubscriptionsService: EventSubscriptionService,
    private readonly integrationsService: IntegrationsService,
    @InjectRepository(Integration)
    private readonly integrationsRepository: Repository<Integration>,
    private readonly refsService: RefsService
  ) {
  }

  @Get('organizations')
  async getOrganizations (): Promise<Organization[]> {
    return await this.organizationsService.findAll()
  }

  @Get('providerConfigurations')
  async getProviderConfigurations (): Promise<ProviderConfiguration[]> {
    return await this.providerConfigurationsService.findAll()
  }

  @Get('providerConfigurations/:id')
  async getProviderConfiguration (
    @Param('id') providerConfigurationId: string
  ): Promise<ProviderConfiguration> {
    return await this.providerConfigurationsService.findOne({
      id: providerConfigurationId,
      options: {
        relations: ['integrations']
      }
    })
  }

  @Put('providerConfigurations/:id')
  async updateProviderConfigurations (
    @Param('id') providerConfigurationId: string,
    @Body() updatedProviderConfiguration: any
  ): Promise<ProviderConfiguration> {
    const providerConfiguration = await this.providerConfigurationsService.findOne({
      id: providerConfigurationId,
      options: { relations: ['organization'] }
    })

    if (providerConfiguration == null) {
      throw new Error('Integration not found')
    }

    await this.providerConfigurationsService.update(
      providerConfiguration.organization,
      providerConfiguration.providerId,
      providerConfigurationId,
      updatedProviderConfiguration
    )

    return await this.providerConfigurationsService.findOne({ id: providerConfigurationId })
  }

  @Get('event-subscriptions')
  async getEventSubscriptions (): Promise<EventSubscription[]> {
    return await this.eventSubscriptionsService.findAll()
  }

  @Get('integrations')
  async getIntegrations (): Promise<Integration[]> {
    return await this.integrationsService.findAll({
      relations: ['practice', 'providerConfiguration']
    })
  }

  @Get('integrations/:id')
  async getIntegration (
    @Param('id') integrationId: string
  ): Promise<Integration> {
    return await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['practice', 'providerConfiguration']
      }
    })
  }

  @Delete('integrations/:id')
  async deleteIntegration (
    @Param('id') integrationId: string
  ): Promise<void> {
    const integration = await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['practice', 'providerConfiguration']
      }
    })

    if (integration == null) {
      throw new Error('Integration not found')
    }

    await this.integrationsService.doDelete(integration)
  }

  @Patch('integrations/:id')
  async updateIntegration (
    @Param('id') integrationId: string,
    @Body() updateIntegration: Pick<CreateIntegrationDto, 'integrationOptions'>
  ): Promise<Integration> {
    const integration = await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['practice', 'providerConfiguration']
      }
    })

    if (integration == null) {
      throw new Error('Integration not found')
    }

    await this.integrationsService.update(integrationId, updateIntegration)

    return await this.integrationsService.findById(integrationId)
  }

  @Post('integrations/:id/stop')
  async stopIntegration (
    @Res() res: Response,
    @Param('id') integrationId: string,
    @Query('force', new DefaultValuePipe(false), ParseBoolPipe) force: boolean
  ): Promise<void> {
    const queryBuilder = this.integrationsRepository.createQueryBuilder('integration')
      .leftJoinAndSelect('integration.practice', 'practice')
      .leftJoinAndSelect('integration.providerConfiguration', 'providerConfiguration')
      .where('integration.id = :id', { id: integrationId })

    if (force) {
      queryBuilder.withDeleted()
    }

    const integration = await queryBuilder.getOne()

    if (integration === undefined) {
      throw new NotFoundException('Integration not found')
    }

    if (integration.status === IntegrationStatus.STOPPED) {
      res.status(201).send('Integration is already stopped')
    } else {
      await this.integrationsService.doStop(integration)
      res.status(201).send('Integration stopped')
    }
  }

  @Post('integrations/:id/start')
  async startIntegration (
    @Res() res: Response,
    @Param('id') integrationId: string
  ): Promise<void> {
    const integration = await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['practice', 'providerConfiguration']
      }
    })

    if (integration.status === IntegrationStatus.RUNNING) {
      res.status(201).send('Integration is already running')
    } else {
      await this.integrationsService.doStart(integrationId, integration.providerConfiguration, integration.integrationOptions)
      res.status(201).send('Integration started')
    }
  }

  @Post('integrations/:id/restart')
  async restartIntegration (
    @Res() res: Response,
    @Param('id') integrationId: string
  ): Promise<void> {
    const integration = await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['practice', 'providerConfiguration']
      }
    })

    await this.integrationsService.restart(integration)
    res.status(201).send('Integration restarted')
  }

  @Post('refs/sync/:providerId')
  async sync (
    @Param('providerId') providerId: string,
    @Query() { integrationId }: ReferenceDataQueryParams
  ): Promise<void> {
    try {
      await this.refsService.syncSpecies(providerId, integrationId)
      await this.refsService.syncBreeds(providerId, integrationId)
      await this.refsService.syncSexes(providerId, integrationId)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @Post('refs/sync/:providerId/:type')
  async syncType (
    @Param('providerId') providerId: string,
    @Param('type') type: string,
    @Query() { integrationId }: ReferenceDataQueryParams
  ): Promise<void> {
    try {
      switch (type) {
        case 'species':
          await this.refsService.syncSpecies(providerId, integrationId)
          break
        case 'breeds':
          await this.refsService.syncBreeds(providerId, integrationId)
          break
        case 'sexes':
          await this.refsService.syncSexes(providerId, integrationId)
          break
        default:
          throw new BadRequestException('Invalid type')
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
