import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'
import { SelectQueryBuilder } from 'typeorm'
import { Order } from '../orders/entities/order.entity'
import { OrdersService } from '../orders/orders.service'
import { Organization } from '../organizations/entities/organization.entity'
import { Event, EventDocument } from './entities/event.entity'

@Injectable()
export class EventsService {
  constructor (
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @Inject(OrdersService) private ordersService: OrdersService
  ) {}

  async findAll (options?: FilterQuery<Event>) {
    return await this.eventModel.find(options, { __v: 0, _id: 0 }).lean()
  }

  async getEventsForOrganization (
    organization: Organization,
    query: { seq: number; practiceId: string }
  ) {
    const { seq, practiceId } = query
    const options: FilterQuery<Event> = { seq: { $gt: seq } }

    if (practiceId) {
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
