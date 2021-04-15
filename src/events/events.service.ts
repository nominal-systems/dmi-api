import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'
import { SelectQueryBuilder } from 'typeorm'
import { Order } from '../orders/entities/order.entity'
import { OrdersService } from '../orders/orders.service'
import { Organization } from '../organizations/entities/organization.entity'
import { Event, EventDocument } from './entities/event.entity'
import { AddEventDto } from './dto/add-event.dto'
import { EventsQueryDto } from './dto/events-query.dto'
@Injectable()
export class EventsService {
  constructor (
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
    @Inject(OrdersService) private readonly ordersService: OrdersService
  ) {}

  async findAll (options: FilterQuery<Event> = {}): Promise<Event[]> {
    return await this.eventModel.find(options, { __v: 0, _id: 0 }).lean()
  }

  async addEvent (eventDto: AddEventDto): Promise<Event> {
    return await this.eventModel.create(eventDto)
  }

  async getEventsForOrganization (
    organization: Organization,
    query: EventsQueryDto
  ): Promise<Event[]> {
    const { seq, practiceId } = query
    const options: FilterQuery<Event> = { seq: { $gt: seq } }

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
