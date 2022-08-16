import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EventSubscription } from '../entities/event-subscription.entity'
import { Repository } from 'typeorm'
import { CreateEventSubscriptionDto } from '../dto/create-event-subscription.dto'

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
    return await this.eventSubscriptionRepository.save(eventSubscription)
  }
}
