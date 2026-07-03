import { Inject, Injectable, Logger, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { EventHubProducerClient } from '@azure/event-hubs'
import { AzureNamedKeyCredential } from '@azure/core-auth'
import { EventSubscription } from '../entities/event-subscription.entity'
import { EventDelivery, EventDeliveryDocument, EventDeliveryStatus } from '../entities/event-delivery.entity'
import { EventDocument } from '../entities/event.entity'
import { EventType } from '../constants/event-type.enum'
import { EventSubscriptionService } from './event-subscription.service'
import { IntegrationsService } from '../../integrations/integrations.service'

const POLL_INTERVAL_MS = Number(process.env.EVENT_DELIVERY_POLL_MS ?? 2000)
const MAX_ATTEMPTS = Number(process.env.EVENT_DELIVERY_MAX_ATTEMPTS ?? 10)
const BATCH_PER_SUBSCRIPTION = 25
const CLAIM_LEASE_MS = 2 * 60 * 1000
const CIRCUIT_THRESHOLD = 5
const CIRCUIT_COOLDOWN_MS = 5 * 60 * 1000
const BASE_BACKOFF_MS = 30 * 1000
const MAX_BACKOFF_MS = 60 * 60 * 1000

interface CircuitState {
  failures: number
  openUntil: number
}

@Injectable()
export class EventDeliveryService implements OnApplicationBootstrap, OnModuleDestroy {
  private readonly logger = new Logger(EventDeliveryService.name)
  private readonly producers = new Map<string, EventHubProducerClient>()
  private readonly circuit = new Map<string, CircuitState>()
  private timer: NodeJS.Timeout
  private dispatching = false

  constructor (
    @InjectModel(EventDelivery.name)
    private readonly deliveryModel: Model<EventDeliveryDocument>,
    @Inject(EventSubscriptionService)
    private readonly eventSubscriptionService: EventSubscriptionService,
    @Inject(IntegrationsService)
    private readonly integrationsService: IntegrationsService
  ) {
  }

  onApplicationBootstrap (): void {
    this.timer = setInterval(() => {
      this.dispatch().catch(error => this.logger.error('Event delivery dispatch cycle failed', error))
    }, POLL_INTERVAL_MS)
  }

  async onModuleDestroy (): Promise<void> {
    clearInterval(this.timer)
    for (const producer of this.producers.values()) {
      await producer.close().catch(error => this.logger.debug(`Error closing producer: ${String(error?.message ?? error)}`))
    }
    this.producers.clear()
  }

  /**
   * Persist one delivery record per subscription interested in this event.
   * Called inline from the request path: local DB work only, no external I/O.
   */
  async enqueue (event: EventDocument): Promise<void> {
    const integration = await this.integrationsService.findOne({
      id: event.integrationId,
      options: {
        relations: ['practice']
      }
    })

    if (integration == null) return

    const subscriptions = await this.eventSubscriptionService.find({
      where: {
        event_type: event.type as EventType,
        organizationId: integration.practice.organizationId
      }
    })

    if (subscriptions.length === 0) return

    await this.deliveryModel.insertMany(
      subscriptions.map(subscription => ({
        subscriptionId: subscription.id,
        event: event.toObject(),
        seq: event.seq,
        status: EventDeliveryStatus.PENDING,
        nextAttemptAt: new Date()
      }))
    )
  }

  invalidateSubscription (subscriptionId: string): void {
    const producer = this.producers.get(subscriptionId)
    if (producer !== undefined) {
      this.producers.delete(subscriptionId)
      producer.close().catch(error => this.logger.debug(`Error closing producer: ${String(error?.message ?? error)}`))
    }
    this.circuit.delete(subscriptionId)
  }

  private async dispatch (): Promise<void> {
    if (this.dispatching) return
    this.dispatching = true
    try {
      await this.reclaimExpiredLeases()
      const subscriptionIds: string[] = await this.deliveryModel.distinct('subscriptionId', {
        status: EventDeliveryStatus.PENDING,
        nextAttemptAt: { $lte: new Date() }
      })
      await Promise.all(subscriptionIds.map(async subscriptionId => await this.dispatchSubscription(subscriptionId)))
    } finally {
      this.dispatching = false
    }
  }

  /**
   * Deliver pending events for one subscription, strictly in seq order.
   * A failure stops the batch so later events never overtake a failed one.
   */
  private async dispatchSubscription (subscriptionId: string): Promise<void> {
    const breaker = this.circuit.get(subscriptionId)
    if (breaker !== undefined && breaker.openUntil > Date.now()) return

    const [subscription] = await this.eventSubscriptionService.find({ where: { id: subscriptionId } })
    if (subscription == null) {
      await this.deliveryModel.updateMany(
        { subscriptionId, status: EventDeliveryStatus.PENDING },
        { $set: { status: EventDeliveryStatus.FAILED, lastError: 'Subscription no longer exists' } }
      )
      this.invalidateSubscription(subscriptionId)
      return
    }

    for (let i = 0; i < BATCH_PER_SUBSCRIPTION; i++) {
      const delivery = await this.deliveryModel.findOneAndUpdate(
        {
          subscriptionId,
          status: EventDeliveryStatus.PENDING,
          nextAttemptAt: { $lte: new Date() }
        },
        { $set: { status: EventDeliveryStatus.PROCESSING, claimedAt: new Date() } },
        { sort: { seq: 1 }, new: true }
      )
      if (delivery == null) return

      try {
        await this.deliver(subscription, delivery)
        await this.deliveryModel.updateOne(
          { _id: delivery._id },
          { $set: { status: EventDeliveryStatus.DELIVERED, deliveredAt: new Date() } }
        )
        this.circuit.delete(subscriptionId)
      } catch (error) {
        await this.recordFailure(delivery, error)
        return
      }
    }
  }

  private async deliver (subscription: EventSubscription, delivery: EventDeliveryDocument): Promise<void> {
    const producer = this.getProducer(subscription)
    const eventData: Record<string, any> = delivery.event?.data ?? {}
    const partitionKey: string | undefined = eventData.reportId ?? eventData.orderId ?? delivery.event?.accessionId
    const eventDataBatch = await producer.createBatch({ ...(partitionKey != null && { partitionKey }) })
    eventDataBatch.tryAdd({ body: delivery.event })
    await producer.sendBatch(eventDataBatch)
    this.logger.log(`Notifying subscription: ${subscription.id} of event '${delivery.event?.type}' (seq=${delivery.seq})`)
  }

  private getProducer (subscription: EventSubscription): EventHubProducerClient {
    let producer = this.producers.get(subscription.id)
    if (producer === undefined) {
      const opts = subscription.subscription_options
      const credential = new AzureNamedKeyCredential(opts.sa_key_name, opts.sa_key_value)
      const namespace = [opts.hub_namespace, '.servicebus.windows.net'].join('')
      producer = new EventHubProducerClient(namespace, opts.hub_name, credential, {
        retryOptions: {
          maxRetries: 1,
          retryDelayInMs: 1000,
          timeoutInMs: 5000
        }
      })
      this.producers.set(subscription.id, producer)
    }
    return producer
  }

  private async recordFailure (delivery: EventDeliveryDocument, error: any): Promise<void> {
    const attempts = delivery.attempts + 1
    const exhausted = attempts >= MAX_ATTEMPTS
    const backoffMs = Math.min(BASE_BACKOFF_MS * 2 ** delivery.attempts, MAX_BACKOFF_MS)
    await this.deliveryModel.updateOne(
      { _id: delivery._id },
      {
        $set: {
          status: exhausted ? EventDeliveryStatus.FAILED : EventDeliveryStatus.PENDING,
          attempts,
          nextAttemptAt: new Date(Date.now() + backoffMs),
          lastError: String(error?.message ?? error)
        }
      }
    )

    const breaker = this.circuit.get(delivery.subscriptionId) ?? { failures: 0, openUntil: 0 }
    breaker.failures += 1
    if (breaker.failures >= CIRCUIT_THRESHOLD) {
      breaker.openUntil = Date.now() + CIRCUIT_COOLDOWN_MS
      this.logger.warn(
        `Circuit opened for subscription ${delivery.subscriptionId} after ${breaker.failures} consecutive failures`
      )
    }
    this.circuit.set(delivery.subscriptionId, breaker)
    this.logger.error(
      `Error notifying subscription: ${delivery.subscriptionId} of event seq=${delivery.seq} (attempt ${attempts}${exhausted ? ', exhausted' : ''})`,
      error
    )
  }

  /**
   * Deliveries claimed by a pod that died mid-send are returned to the queue.
   */
  private async reclaimExpiredLeases (): Promise<void> {
    await this.deliveryModel.updateMany(
      {
        status: EventDeliveryStatus.PROCESSING,
        claimedAt: { $lte: new Date(Date.now() - CLAIM_LEASE_MS) }
      },
      { $set: { status: EventDeliveryStatus.PENDING } }
    )
  }
}
