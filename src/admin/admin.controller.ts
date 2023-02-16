import { Controller, Delete, Get, Param, Post, Res, UseGuards } from '@nestjs/common'
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

@Controller('admin')
@UseGuards(BasicAuthGuard)
export class AdminController {
  constructor (
    private readonly organizationsService: OrganizationsService,
    private readonly providerConfigurationsService: ProviderConfigurationsService,
    private readonly eventSubscriptionsService: EventSubscriptionService,
    private readonly integrationsService: IntegrationsService
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

  @Post('integrations/:id/stop')
  async stopIntegration (
    @Res() res: Response,
    @Param('id') integrationId: string
  ): Promise<void> {
    const integration = await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['practice', 'providerConfiguration']
      }
    })

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
}
