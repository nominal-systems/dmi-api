import { ConflictException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EventSubscription } from '../entities/event-subscription.entity'
import { FindManyOptions, Repository } from 'typeorm'
import { CreateEventSubscriptionDto } from '../dto/create-event-subscription.dto'
import { Event } from '../entities/event.entity'
import { EventHubProducerClient } from '@azure/event-hubs'
import { AzureNamedKeyCredential } from '@azure/core-auth'
import { FindOneOfTypeOptions } from '../../common/typings/find-one-of-type-options.interface'
import { IntegrationsService } from '../../integrations/integrations.service'

@Injectable()
export class EventSubscriptionService {
  private readonly logger = new Logger(EventSubscriptionService.name)

  constructor (
    @InjectRepository(EventSubscription)
    private readonly eventSubscriptionRepository: Repository<EventSubscription>,
    @Inject(IntegrationsService)
    private readonly integrationsService: IntegrationsService
  ) {
  }

  async find (
    options?: FindManyOptions<EventSubscription>
  ): Promise<EventSubscription[]> {
    return await this.eventSubscriptionRepository.find(options)
  }

  async findOne (args: FindOneOfTypeOptions<EventSubscription>): Promise<EventSubscription> {
    const eventSubscription = await this.eventSubscriptionRepository.findOne(
      args.id,
      args.options
    )

    if (eventSubscription == null) {
      throw new NotFoundException('The event subscription was not found')
    }

    return eventSubscription
  }

  async findAll (
    options?: FindManyOptions<EventSubscription>
  ): Promise<EventSubscription[]> {
    return await this.eventSubscriptionRepository.find(options)
  }

  async create (
    organizationId: string,
    createEventSubscriptionDto: CreateEventSubscriptionDto
  ): Promise<EventSubscription> {
    const eventSubscription = this.eventSubscriptionRepository.create(createEventSubscriptionDto)
    eventSubscription.organizationId = organizationId
    try {
      return await this.eventSubscriptionRepository.save(eventSubscription)
    } catch (error) {
      // TODO(gb): catch more specific errors
      throw new ConflictException(
        `Event subscription '${createEventSubscriptionDto.subscription_type}' already exists for event type '${createEventSubscriptionDto.event_type}' and this organization`
      )
    }
  }

  async delete (organizationId: string, subscriptionId: string): Promise<void> {
    const eventSubscription = await this.eventSubscriptionRepository.findOne({
      where: {
        id: subscriptionId,
        organizationId: organizationId
      }
    })

    if (eventSubscription == null) {
      throw new NotFoundException('The event subscription was not found')
    }

    await this.eventSubscriptionRepository.delete(eventSubscription.id)
  }

  async notifySubscriptions (event: Event): Promise<void> {
    // Find integration to get organizationId
    const integration = await this.integrationsService.findOne({
      id: event.integrationId,
      options: {
        relations: ['practice']
      }
    })

    if (integration == null) return

    // Find event subscriptions for organization/event type
    const subscriptions = await this.eventSubscriptionRepository.find({
      where: {
        event_type: event.type,
        organizationId: integration.practice.organizationId
      }
    })

    // TODO(gb): optimize this by sending all subscriptions in one batch?
    for (const subscription of subscriptions) {
      try {
        const opts = subscription.subscription_options
        const credential = new AzureNamedKeyCredential(opts.sa_key_name, opts.sa_key_value)
        const namespace = [opts.hub_namespace, '.servicebus.windows.net'].join('')
        const producer = new EventHubProducerClient(namespace, opts.hub_name, credential)
        const eventDataBatch = await producer.createBatch()
        eventDataBatch.tryAdd({ body: event })
        await producer.sendBatch(eventDataBatch)
        await producer.close()
        this.logger.log(`Notifying subscription: ${subscription.id} of event '${event.type}'`)
      } catch (error) {
        this.logger.error(`Error notifying subscription: ${subscription.id} of event '${event.type}'`, error)
      }
    }
  }
}
