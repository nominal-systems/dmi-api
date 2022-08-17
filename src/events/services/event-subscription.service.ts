import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EventSubscription } from '../entities/event-subscription.entity'
import { Repository } from 'typeorm'
import { CreateEventSubscriptionDto } from '../dto/create-event-subscription.dto'
import { Event } from '../entities/event.entity'
import { EventHubProducerClient } from '@azure/event-hubs'
import { AzureNamedKeyCredential } from '@azure/core-auth'
import { FindOneOfTypeOptions } from '../../common/typings/find-one-of-type-options.interface'

@Injectable()
export class EventSubscriptionService {
  private readonly logger = new Logger(EventSubscriptionService.name)

  constructor (
    @InjectRepository(EventSubscription)
    private readonly eventSubscriptionRepository: Repository<EventSubscription>
  ) {}

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
        `Event subscription '${createEventSubscriptionDto.event_subscription_type}' already exists for event type '${createEventSubscriptionDto.event_type}' and this organization`
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
    const subscriptions = await this.eventSubscriptionRepository.find({
      where: {
        event_type: event.type
      }
    })

    // TODO(gb): optimize this by sending all subscriptions in one batch?
    for (const subscription of subscriptions) {
      const opts = subscription.subscription_options
      const credential = new AzureNamedKeyCredential(opts.sa_key_name, opts.sa_key_value)
      const producer = new EventHubProducerClient(`${opts.hub_namespace}.servicebus.windows.net`, opts.hub_name, credential)
      const eventDataBatch = await producer.createBatch()
      eventDataBatch.tryAdd({ body: event.data })
      await producer.sendBatch(eventDataBatch)
      await producer.close()
      this.logger.debug(`Notifying subscription: ${subscription.id} of event '${event.type}'`)
    }
  }
}
