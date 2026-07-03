import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EventSubscription } from '../entities/event-subscription.entity'
import { FindManyOptions, Repository } from 'typeorm'
import { CreateEventSubscriptionDto } from '../dto/create-event-subscription.dto'
import { FindOneOfTypeOptions, toFindOneOptions } from '../../common/typings/find-one-of-type-options.interface'

@Injectable()
export class EventSubscriptionService {
  private readonly logger = new Logger(EventSubscriptionService.name)

  constructor (
    @InjectRepository(EventSubscription)
    private readonly eventSubscriptionRepository: Repository<EventSubscription>
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

}
