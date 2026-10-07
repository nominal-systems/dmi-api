import { ConflictException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EventSubscription } from '../entities/event-subscription.entity'
import { FindManyOptions, Repository } from 'typeorm'
import { CreateEventSubscriptionDto } from '../dto/create-event-subscription.dto'
import { Event, EventDocument } from '../entities/event.entity'
import { EventHubProducerClient } from '@azure/event-hubs'
import { AzureNamedKeyCredential } from '@azure/core-auth'
import { FindOneOfTypeOptions, toFindOneOptions } from '../../common/typings/find-one-of-type-options.interface'
import { IntegrationsService } from '../../integrations/integrations.service'
import { EventType } from '../constants/event-type.enum'
import { SubscriptionDeliveryResult } from '../interfaces/subscription-delivery-result.interface'

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
    const eventSubscription = await this.eventSubscriptionRepository.findOne(toFindOneOptions(args))

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
        event_type: event.type as EventType,
        organizationId: integration.practice.organizationId
      }
    })

    // TODO(gb): optimize this by sending all subscriptions in one batch?
    for (const subscription of subscriptions) {
      const result = await this.sendToSubscription(subscription, event)
      switch (result.status) {
        case 'sent':
          this.logger.log(`Notifying subscription: ${subscription.id} of event '${event.type}'`)
          break
        case 'too_large': {
          const { _id: eventId } = event as EventDocument
          this.logger.error(
            `Event too large for subscription: ${subscription.id}, event '${event.type}' was NOT delivered ` +
            `(eventId=${String(eventId)}, seq=${event.seq}, integrationId=${event.integrationId}, accessionId=${event.accessionId}, ` +
            `size=${result.sizeInBytes} bytes, max=${result.maxSizeInBytes} bytes)`
          )
          break
        }
        case 'error':
          this.logger.error(`Error notifying subscription: ${subscription.id} of event '${event.type}'`, result.error.stack)
          break
      }
    }
  }

  private async sendToSubscription (
    subscription: EventSubscription,
    event: Event
  ): Promise<SubscriptionDeliveryResult> {
    const opts = subscription.subscription_options
    let producer: EventHubProducerClient | undefined
    try {
      const credential = new AzureNamedKeyCredential(opts.sa_key_name, opts.sa_key_value)
      const namespace = [opts.hub_namespace, '.servicebus.windows.net'].join('')
      producer = new EventHubProducerClient(namespace, opts.hub_name, credential)
      const eventData: Record<string, any> = event.data ?? {}
      const partitionKey: string | undefined = eventData.reportId ?? eventData.orderId ?? event.accessionId
      const eventDataBatch = await producer.createBatch({ ...(partitionKey != null && { partitionKey }) })
      // tryAdd() returns false when the event exceeds the hub's max message size,
      // and sending the resulting empty batch is a silent no-op.
      if (!eventDataBatch.tryAdd({ body: event })) {
        return {
          subscriptionId: subscription.id,
          status: 'too_large',
          sizeInBytes: Buffer.byteLength(JSON.stringify(event)),
          maxSizeInBytes: eventDataBatch.maxSizeInBytes
        }
      }
      await producer.sendBatch(eventDataBatch)
      return { subscriptionId: subscription.id, status: 'sent' }
    } catch (error) {
      return {
        subscriptionId: subscription.id,
        status: 'error',
        error: error instanceof Error ? error : new Error(String(error))
      }
    } finally {
      await producer?.close().catch((error) => {
        this.logger.warn(`Error closing producer for subscription: ${subscription.id}: ${String(error?.message ?? error)}`)
      })
    }
  }
}
