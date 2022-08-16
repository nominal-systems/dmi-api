import { ConflictException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EventSubscription } from '../entities/event-subscription.entity'
import { Repository } from 'typeorm'
import { CreateEventSubscriptionDto } from '../dto/create-event-subscription.dto'
import { Event } from '../entities/event.entity'

@Injectable()
export class EventSubscriptionService {
  private readonly logger = new Logger(EventSubscriptionService.name)

  constructor (
    @InjectRepository(EventSubscription)
    private readonly eventSubscriptionRepository: Repository<EventSubscription>
  ) {}

  async createEventSubscription (
    organizationId: string,
    createEventSubscriptionDto: CreateEventSubscriptionDto
  ): Promise<EventSubscription> {
    const eventSubscription = this.eventSubscriptionRepository.create(createEventSubscriptionDto)
    eventSubscription.organizationId = organizationId
    try {
      return await this.eventSubscriptionRepository.save(eventSubscription)
    } catch (error) {
      throw new ConflictException(
        `Event subscription '${createEventSubscriptionDto.event_subscription_type}' already exists for event type '${createEventSubscriptionDto.event_type}' and this organization`
      )
    }
  }

  async notifySubscriptions (event: Event): Promise<void> {
    const subscriptions = await this.eventSubscriptionRepository.find({
      where: {
        event_type: event.type
      }
    })

    for (const subscription of subscriptions) {
      this.logger.debug(`Notifying subscription: ${subscription.id} of event '${event.type}'`)
    }
  }
}
