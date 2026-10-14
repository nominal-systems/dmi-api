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
import { describeError } from '../../common/utils/describe-error'
import { DeliveryOptions } from '../interfaces/delivery-options.interface'

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

  // Without options: the SDK's 3 retries 30 s apart, and no overall timeout
  async notifySubscriptions (event: Event, options: DeliveryOptions = {}): Promise<SubscriptionDeliveryResult[]> {
    // Find integration to get organizationId
    const integration = await this.integrationsService.findOne({
      id: event.integrationId,
      options: {
        relations: ['practice']
      }
    })

    if (integration == null) return []

    // Find event subscriptions for organization/event type
    const subscriptions = await this.eventSubscriptionRepository.find({
      where: {
        event_type: event.type as EventType,
        organizationId: integration.practice.organizationId
      }
    })

    const results: SubscriptionDeliveryResult[] = []
    // TODO(gb): optimize this by sending all subscriptions in one batch?
    for (const subscription of subscriptions) {
      const result = await this.sendToSubscription(subscription, event, options)
      results.push(result)
      switch (result.status) {
        case 'sent':
          this.logger.log(`Notifying subscription: ${subscription.id} of event '${event.type}'`)
          break
        case 'too_large': {
          const { _id: eventId } = event as EventDocument
          this.logger.error(
            `Event too large for subscription: ${subscription.id}, event '${event.type}' was NOT delivered ` +
            `(eventId=${String(eventId)}, seq=${event.seq}, integrationId=${event.integrationId}, accessionId=${event.accessionId}, ` +
            `jsonSize=${result.jsonSizeInBytes} bytes, max=${result.maxSizeInBytes} bytes)`
          )
          break
        }
        case 'error':
          this.logger.error(`Error notifying subscription: ${subscription.id} of event '${event.type}': ${describeError(result.error)}`, result.error.stack)
          break
      }
    }

    return results
  }

  private async sendToSubscription (
    subscription: EventSubscription,
    event: Event,
    { retryOptions, timeoutInMs }: DeliveryOptions
  ): Promise<SubscriptionDeliveryResult> {
    const opts = subscription.subscription_options
    let producer: EventHubProducerClient | undefined
    const abortSignal = timeoutInMs != null ? AbortSignal.timeout(timeoutInMs) : undefined
    try {
      const credential = new AzureNamedKeyCredential(opts.sa_key_name, opts.sa_key_value)
      const namespace = [opts.hub_namespace, '.servicebus.windows.net'].join('')
      producer = new EventHubProducerClient(namespace, opts.hub_name, credential, { retryOptions })
      const eventData: Record<string, any> = event.data ?? {}
      const partitionKey: string | undefined = eventData.reportId ?? eventData.orderId ?? event.accessionId
      const eventDataBatch = await producer.createBatch({ ...(partitionKey != null && { partitionKey }), abortSignal })
      // tryAdd() is false when over max size; sending the empty batch is a silent no-op
      if (!eventDataBatch.tryAdd({ body: event })) {
        return {
          subscriptionId: subscription.id,
          status: 'too_large',
          jsonSizeInBytes: Buffer.byteLength(JSON.stringify(event)),
          maxSizeInBytes: eventDataBatch.maxSizeInBytes
        }
      }
      await producer.sendBatch(eventDataBatch, { abortSignal })
      return { subscriptionId: subscription.id, status: 'sent' }
    } catch (error) {
      // The SDK only says "The operation was aborted."
      if (abortSignal?.aborted === true) {
        return { subscriptionId: subscription.id, status: 'error', error: new Error(`Not delivered within ${timeoutInMs} ms`) }
      }
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
