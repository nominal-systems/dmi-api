import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, QueryOptions } from 'mongoose'
import { OrdersService } from '../../orders/orders.service'
import { Organization } from '../../organizations/entities/organization.entity'
import { Event, EventDocument } from '../entities/event.entity'
import { AddEventDto } from '../dto/add-event.dto'
import { EventsQueryDto } from '../dto/events-query.dto'
import { ModuleRef } from '@nestjs/core'
import { EventDeliveryService } from './event-delivery.service'
import { stringifyId } from '../../common/utils/shared.utils'
import { PaginationDto } from '../../common/dtos/pagination.dto'

@Injectable()
export class EventsService implements OnModuleInit {
  private readonly logger = new Logger(EventsService.name)
  private ordersService: OrdersService

  constructor (
    private readonly moduleRef: ModuleRef,
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
    @Inject(EventDeliveryService) private readonly eventDeliveryService: EventDeliveryService
  ) {
  }

  onModuleInit (): void {
    this.ordersService = this.moduleRef.get(OrdersService, { strict: false })
  }

  async findById (
    id: string
  ): Promise<Event> {
    const doc = await this.eventModel.findById(id, { __v: 0 }, { lean: true })
    return (doc != null ? stringifyId(doc) : doc) as Event
  }

  async findAll (
    query: FilterQuery<EventDocument>,
    options: QueryOptions = { lean: true }
  ): Promise<Event[]> {
    const docs = await this.eventModel.find(query, { __v: 0 }, options)
    return docs.map(stringifyId)
  }

  async find (
    query: FilterQuery<EventDocument>,
    paginationDto: PaginationDto
  ): Promise<Event[]> {
    const { page, limit } = paginationDto

    const docs = await this.eventModel.find(query, { __v: 0, data: 0 }, {
      limit: limit,
      skip: (page - 1) * limit,
      sort: { seq: -1 },
      lean: true
    })
    return docs.map(stringifyId)
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
    try {
      await this.eventDeliveryService.enqueue(event)
    } catch (error) {
      this.logger.error(`Failed to enqueue event '${event.type}' for delivery`, error)
    }
    return event
  }

  async getEventsForOrganization (
    organization: Organization,
    eventsQueryDto: EventsQueryDto,
    paginationDto: PaginationDto
  ): Promise<Event[]> {
    const { seq } = eventsQueryDto
    const { page, limit } = paginationDto
    const query: FilterQuery<EventDocument> = { seq: { $gt: seq } }
    const skip = (page - 1) * limit
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
        acc.hour = { $hour: '$createdAt' }
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
        acc.hour = '$_id.hour'
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
