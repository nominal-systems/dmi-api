import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'
import { SelectQueryBuilder } from 'typeorm'
import { Order } from '../../orders/entities/order.entity'
import { OrdersService } from '../../orders/orders.service'
import { Organization } from '../../organizations/entities/organization.entity'
import { Event, EventDocument } from '../entities/event.entity'
import { AddEventDto } from '../dto/add-event.dto'
import { EventsQueryDto } from '../dto/events-query.dto'
import { ModuleRef } from '@nestjs/core'
import { EventSubscriptionService } from './event-subscription.service'

@Injectable()
export class EventsService implements OnModuleInit {
  private readonly logger = new Logger(EventsService.name)
  private ordersService: OrdersService

  constructor (
    private readonly moduleRef: ModuleRef,
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
    @Inject(EventSubscriptionService) private readonly eventSubscriptionService: EventSubscriptionService
  ) {}

  onModuleInit (): void {
    this.ordersService = this.moduleRef.get(OrdersService, { strict: false })
  }

  async findAll (options: FilterQuery<EventDocument> = {}): Promise<Event[]> {
    return await this.eventModel.find(options, { __v: 0, _id: 0 }).lean()
  }

  async addEvent (eventDto: AddEventDto): Promise<Event> {
    this.logger.debug(`Event: '${eventDto.type}'`)
    const event = await this.eventModel.create(eventDto)
    await this.eventSubscriptionService.notifySubscriptions(event)
    return event
  }

  async getEventsForOrganization (
    organization: Organization,
    query: EventsQueryDto
  ): Promise<Event[]> {
    const { seq, practiceId } = query
    const options: FilterQuery<EventDocument> = { seq: { $gt: seq } }

    if (practiceId != null) {
      const ordersForPractice = await this.ordersService.findAll({
        where: (qb: SelectQueryBuilder<Order>) => {
          qb.where('integration.practiceId = :practiceId', {
            practiceId
          }).andWhere(
            'providerConfiguration.organizationId = :organizationId',
            { organizationId: organization.id }
          )
        },
        join: {
          alias: 'order',
          leftJoinAndSelect: {
            integration: 'order.integration',
            providerConfiguration: 'integration.providerConfiguration'
          }
        }
      })

      const orderIds = ordersForPractice.map(order => order.id)

      options['value.orderId'] = {
        $in: orderIds
      }
    }

    return await this.findAll(options)
  }
}