import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ProviderConfiguration } from '../providers/entities/provider-configuration.entity'
import { ProviderConfigurationsService } from '../providers/services/provider-configurations.service'
import { BasicAuthGuard } from '../common/guards/basic-auth.guard'
import { Integration } from '../integrations/entities/integration.entity'
import { IntegrationsService } from '../integrations/integrations.service'
import { EventSubscriptionService } from '../events/services/event-subscription.service'
import { EventSubscription } from '../events/entities/event-subscription.entity'

@Controller('admin')
@UseGuards(BasicAuthGuard)
export class AdminController {
  constructor (
    private readonly providerConfigurationsService: ProviderConfigurationsService,
    private readonly eventSubscriptionsService: EventSubscriptionService,
    private readonly integrationsService: IntegrationsService
  ) {
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

  @Post('integrations/:id/stop')
  async pauseIntegration (
    @Param('id') integrationId: string
  ): Promise<void> {
    const { providerConfiguration } = await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['providerConfiguration', 'providerConfiguration.organization']
      }
    })

    return await this.integrationsService.stopJobs(providerConfiguration.organization, integrationId)
  }
}
