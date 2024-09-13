import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, QueryOptions } from 'mongoose'
import { OrdersService } from '../../orders/orders.service'
import { Organization } from '../../organizations/entities/organization.entity'
import { Event, EventDocument } from '../entities/event.entity'
import { AddEventDto } from '../dto/add-event.dto'
import { EventsQueryDto } from '../dto/events-query.dto'
import { ModuleRef } from '@nestjs/core'
import { EventSubscriptionService } from './event-subscription.service'
import { PaginationDto } from '../../common/dtos/pagination.dto'
import { PAGINATION_PAGE_LIMIT } from '../../common/constants/pagination.constant'

@Injectable()
export class EventsService implements OnModuleInit {
  private readonly logger = new Logger(EventsService.name)
  private ordersService: OrdersService

  constructor (
    private readonly moduleRef: ModuleRef,
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
    @Inject(EventSubscriptionService) private readonly eventSubscriptionService: EventSubscriptionService
  ) {
  }

  onModuleInit (): void {
    this.ordersService = this.moduleRef.get(OrdersService, { strict: false })
  }

  async findById (
    id: string
  ): Promise<Event> {
    return await this.eventModel.findById(id, { __v: 0 }, { lean: true }) as Event
  }

  async findAll (
    query: FilterQuery<EventDocument>,
    options: QueryOptions = { lean: true }
  ): Promise<Event[]> {
    return await this.eventModel.find(query, { __v: 0 }, options)
  }

  async find (
    query: FilterQuery<EventDocument>,
    paginationDto: PaginationDto
  ): Promise<Event[]> {
    const limit = paginationDto.limit !== undefined ? paginationDto.limit : PAGINATION_PAGE_LIMIT
    const skip = (paginationDto.page - 1) * limit

    return await this.eventModel.find(query, { __v: 0, data: 0 }, {
      limit,
      skip,
      sort: { seq: -1 },
      lean: true
    })
  }

  async count (
    query: FilterQuery<EventDocument>
  ): Promise<number> {
    return await this.eventModel.countDocuments(query)
  }

  async addEvent (
    eventDto: AddEventDto
  ): Promise<Event> {
    this.logger.debug(`Event: '${eventDto.type}'`)
    const event = await this.eventModel.create(eventDto)
    await this.eventSubscriptionService.notifySubscriptions(event)
    return event
  }

  async getEventsForOrganization (
    organization: Organization,
    eventsQueryDto: EventsQueryDto,
    paginationDto: PaginationDto = { page: 1, limit: 10 }
  ): Promise<Event[]> {
    const { seq } = eventsQueryDto
    const query: FilterQuery<EventDocument> = { seq: { $gt: seq } }
    const limit = paginationDto.limit !== undefined ? paginationDto.limit : PAGINATION_PAGE_LIMIT
    const skip = (paginationDto.page - 1) * limit
    const options: QueryOptions = {
      lean: true,
      sort: {
        seq: -1
      },
      limit,
      skip
    }

    return await this.findAll(query, options)
  }

  async stats (
    query: FilterQuery<EventDocument>,
    groupBy: string[]
  ): Promise<any> {
    const $id = groupBy.reduce((acc: any, propName) => {
      if (propName === 'createdAt') {
        acc.year = { $year: '$createdAt' }
        acc.month = { $month: '$createdAt' }
        acc.day = { $dayOfMonth: '$createdAt' }
      } else {
        acc[propName] = `$${propName}`
      }
      return acc
    }, {})

    // Group
    const $group = {
      _id: $id,
      count: { $sum: 1 }
    }

    // Project
    const $project = groupBy.reduce((acc: any, propName) => {
      if (propName === 'createdAt') {
        acc.year = '$_id.year'
        acc.month = '$_id.month'
        acc.day = '$_id.day'
      } else {
        acc[propName] = `$_id.${propName}`
      }
      return acc
    }, { _id: 0, count: 1 })

    // Aggregate
    return await this.eventModel.aggregate([
      {
        $match: query
      },
      {
        $group
      },
      {
        $project
      }
    ])
  }
}
