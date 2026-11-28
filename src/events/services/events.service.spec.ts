import { Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { ModuleRef } from '@nestjs/core'
import { EVENTS_COUNT_CAP, EventsService } from './events.service'
import { EventSubscriptionService } from './event-subscription.service'
import { PracticesService } from '../../practices/practices.service'
import { Event } from '../entities/event.entity'
import { Organization } from '../../organizations/entities/organization.entity'
import { AddEventDto } from '../dto/add-event.dto'
import { EventNamespace } from '../constants/event-namespace.enum'
import { EventType } from '../constants/event-type.enum'

describe('EventsService', () => {
  let service: EventsService

  const eventModelMock = {
    find: jest.fn().mockResolvedValue([]),
    countDocuments: jest.fn().mockResolvedValue(0),
    create: jest.fn()
  }
  const eventSubscriptionServiceMock = {
    notifySubscriptions: jest.fn()
  }
  const practicesServiceMock = {
    findAll: jest.fn()
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: getModelToken(Event.name), useValue: eventModelMock },
        { provide: EventSubscriptionService, useValue: eventSubscriptionServiceMock },
        { provide: PracticesService, useValue: practicesServiceMock },
        { provide: ModuleRef, useValue: { get: jest.fn() } }
      ]
    }).compile()

    service = module.get<EventsService>(EventsService)
  })

  describe('addEvent', () => {
    const eventDto = {
      namespace: EventNamespace.ORDERS,
      type: EventType.ORDER_CREATED,
      providerId: 'idexx',
      practiceId: 'practice-a',
      integrationId: 'integration-a',
      accessionId: 'accession-a',
      data: { orderId: 'order-a' }
    } as unknown as AddEventDto

    // A Cosmos DB 429 as the driver surfaces it
    const throttledError = (): Error => Object.assign(
      new Error("Error=16500, RetryAfterMs=1, Details='Response status code does not indicate success: TooManyRequests (429); Substatus: 3200'"),
      { name: 'MongoServerError', code: 16500 }
    )

    let warnSpy: jest.SpyInstance

    beforeEach(() => {
      eventModelMock.create.mockReset()
      eventSubscriptionServiceMock.notifySubscriptions.mockReset()
      warnSpy = jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => undefined)
    })

    afterEach(() => {
      warnSpy.mockRestore()
    })

    it('stores the event and notifies the subscriptions once', async () => {
      const event = { _id: 'event-1', seq: 1, ...eventDto }
      eventModelMock.create.mockResolvedValueOnce(event)

      await expect(service.addEvent(eventDto)).resolves.toBe(event)

      expect(eventModelMock.create).toHaveBeenCalledTimes(1)
      expect(eventModelMock.create).toHaveBeenCalledWith(eventDto)
      expect(eventSubscriptionServiceMock.notifySubscriptions).toHaveBeenCalledTimes(1)
      expect(eventSubscriptionServiceMock.notifySubscriptions).toHaveBeenCalledWith(event, undefined)
      expect(warnSpy).not.toHaveBeenCalled()
    })

    it('retries a throttled insert and notifies the subscriptions once it is stored', async () => {
      const event = { _id: 'event-1', seq: 2, ...eventDto }
      eventModelMock.create
        .mockRejectedValueOnce(throttledError())
        .mockResolvedValueOnce(event)

      await expect(service.addEvent(eventDto)).resolves.toBe(event)

      expect(eventModelMock.create).toHaveBeenCalledTimes(2)
      expect(eventSubscriptionServiceMock.notifySubscriptions).toHaveBeenCalledTimes(1)
      expect(eventSubscriptionServiceMock.notifySubscriptions).toHaveBeenCalledWith(event, undefined)
      expect(warnSpy).toHaveBeenCalledTimes(1)
      expect(warnSpy.mock.calls[0][0]).toContain(`Write of '${EventType.ORDER_CREATED}' event throttled by the database (attempt 1, retrying in 100 ms)`)
      expect(warnSpy.mock.calls[0][0]).toContain('TooManyRequests (429)')
    })

    it('rejects with the last throttled error once the retries are spent, and notifies nobody', async () => {
      const third = throttledError()
      eventModelMock.create
        .mockRejectedValueOnce(throttledError())
        .mockRejectedValueOnce(throttledError())
        .mockRejectedValueOnce(third)

      await expect(service.addEvent(eventDto)).rejects.toBe(third)

      expect(eventModelMock.create).toHaveBeenCalledTimes(3)
      expect(eventSubscriptionServiceMock.notifySubscriptions).not.toHaveBeenCalled()
    })

    it('rejects at once when the insert fails for another reason', async () => {
      const duplicate = Object.assign(new Error('E11000 duplicate key error'), { name: 'MongoServerError', code: 11000 })
      eventModelMock.create.mockRejectedValueOnce(duplicate)

      await expect(service.addEvent(eventDto)).rejects.toBe(duplicate)

      expect(eventModelMock.create).toHaveBeenCalledTimes(1)
      expect(eventSubscriptionServiceMock.notifySubscriptions).not.toHaveBeenCalled()
      expect(warnSpy).not.toHaveBeenCalled()
    })
  })

  describe('getEventsForOrganization', () => {
    const organization = { id: 'org-1' } as Organization

    it("scopes the query to the organization's practice ids", async () => {
      practicesServiceMock.findAll.mockResolvedValue([
        { id: 'practice-a' },
        { id: 'practice-b' }
      ])

      await service.getEventsForOrganization(organization, { seq: 0 }, { page: 1, limit: 10 })

      // Practices are resolved for this organization only, selecting just the id
      expect(practicesServiceMock.findAll).toHaveBeenCalledWith({
        where: { organizationId: 'org-1' },
        select: ['id']
      })

      // Both the data query and the count query are scoped by those practice ids
      const dataQuery = eventModelMock.find.mock.calls[0][0]
      const countQuery = eventModelMock.countDocuments.mock.calls[0][0]
      expect(dataQuery.practiceId).toEqual({ $in: ['practice-a', 'practice-b'] })
      expect(countQuery.practiceId).toEqual({ $in: ['practice-a', 'practice-b'] })
    })

    it('returns no events for an organization with no practices (empty $in, never an unfiltered query)', async () => {
      practicesServiceMock.findAll.mockResolvedValue([])

      const result = await service.getEventsForOrganization(
        organization, { seq: 0 }, { page: 1, limit: 10 }
      )

      // The critical no-leak guarantee: the practiceId filter must still be
      // present as an empty $in (matches nothing), not dropped (matches all).
      const countQuery = eventModelMock.countDocuments.mock.calls[0][0]
      const dataQuery = eventModelMock.find.mock.calls[0][0]
      expect(countQuery.practiceId).toEqual({ $in: [] })
      expect(dataQuery.practiceId).toEqual({ $in: [] })
      expect(result).toEqual({ total: 0, data: [] })
    })

    it('applies the seq cursor and pagination alongside the practice scope', async () => {
      practicesServiceMock.findAll.mockResolvedValue([{ id: 'practice-a' }])

      await service.getEventsForOrganization(organization, { seq: 42 }, { page: 3, limit: 25 })

      const query = eventModelMock.find.mock.calls[0][0]
      const options = eventModelMock.find.mock.calls[0][2]
      expect(query.seq).toEqual({ $gt: 42 })
      expect(options).toMatchObject({ limit: 25, skip: 50, sort: { seq: -1 } })
    })

    it('returns total and data from the scoped query', async () => {
      practicesServiceMock.findAll.mockResolvedValue([{ id: 'practice-a' }])
      eventModelMock.countDocuments.mockResolvedValueOnce(3)
      eventModelMock.find.mockResolvedValueOnce([
        { _id: 'e1', practiceId: 'practice-a' },
        { _id: 'e2', practiceId: 'practice-a' }
      ])

      const result = await service.getEventsForOrganization(
        organization, { seq: 0 }, { page: 1, limit: 10 }
      )

      expect(result.total).toBe(3)
      expect(result.data).toHaveLength(2)
      expect(result.data[0]).toMatchObject({ _id: 'e1', practiceId: 'practice-a' })
    })
  })

  describe('publishEvent()', () => {
    it('should persist the event, notify subscriptions and return both', async () => {
      const dto = { type: 'report:updated', integrationId: 'integration-1' } as AddEventDto
      const created = { _id: 'event-1', seq: 7, ...dto }
      const deliveries = [{ subscriptionId: 'subscription-1', status: 'sent' }]
      eventModelMock.create.mockResolvedValueOnce(created)
      eventSubscriptionServiceMock.notifySubscriptions.mockResolvedValueOnce(deliveries)

      await expect(service.publishEvent(dto)).resolves.toEqual({ event: created, deliveries })
      expect(eventModelMock.create).toHaveBeenCalledWith(dto)
      expect(eventSubscriptionServiceMock.notifySubscriptions).toHaveBeenCalledWith(created, undefined)
    })

    it('should pass the delivery options on to the subscriptions', async () => {
      const created = { _id: 'event-1', seq: 7 }
      const deliveryOptions = { retryOptions: { maxRetries: 1 }, timeoutInMs: 20000 }
      eventModelMock.create.mockResolvedValueOnce(created)
      eventSubscriptionServiceMock.notifySubscriptions.mockResolvedValueOnce([])

      await service.publishEvent({ type: 'report:updated' } as AddEventDto, deliveryOptions)

      expect(eventSubscriptionServiceMock.notifySubscriptions).toHaveBeenCalledWith(created, deliveryOptions)
    })
  })

  describe('addEvent()', () => {
    it('should still return only the persisted event', async () => {
      const created = { _id: 'event-1', seq: 7 }
      eventModelMock.create.mockResolvedValueOnce(created)
      eventSubscriptionServiceMock.notifySubscriptions.mockResolvedValueOnce([])

      await expect(service.addEvent({ type: 'order:created' } as AddEventDto)).resolves.toBe(created)
      expect(eventSubscriptionServiceMock.notifySubscriptions).toHaveBeenCalledWith(created, undefined)
    })
  })

  describe('find()', () => {
    it('sorts by createdAt descending, applies pagination, and stringifies ids', async () => {
      const query = { createdAt: { $gte: new Date('2026-09-30T00:00:00Z'), $lte: new Date('2026-10-01T00:00:00Z') } }
      eventModelMock.find.mockResolvedValueOnce([{ _id: 123, type: 'order:created' }])

      const result = await service.find(query, { page: 2, limit: 20 })

      expect(eventModelMock.find).toHaveBeenCalledWith(
        query,
        { __v: 0, data: 0 },
        { limit: 20, skip: 20, sort: { createdAt: -1 }, lean: true }
      )
      expect(result).toEqual([{ _id: '123', type: 'order:created' }])
    })
  })

  describe('countCapped()', () => {
    it('stops one past the default cap', async () => {
      const query = { providerId: { $in: ['idexx'] } }
      eventModelMock.countDocuments.mockResolvedValueOnce(0)

      await service.countCapped(query)

      expect(eventModelMock.countDocuments).toHaveBeenCalledWith(query, { limit: EVENTS_COUNT_CAP + 1 })
    })

    it('returns { total: 0, capped: false } when no documents match', async () => {
      eventModelMock.countDocuments.mockResolvedValueOnce(0)

      await expect(service.countCapped({})).resolves.toEqual({ total: 0, capped: false })
    })

    it('returns the exact count when below the cap', async () => {
      eventModelMock.countDocuments.mockResolvedValueOnce(42)

      await expect(service.countCapped({})).resolves.toEqual({ total: 42, capped: false })
    })

    it('reports a total of exactly the cap as not capped', async () => {
      eventModelMock.countDocuments.mockResolvedValueOnce(EVENTS_COUNT_CAP)

      await expect(service.countCapped({})).resolves.toEqual({ total: EVENTS_COUNT_CAP, capped: false })
    })

    it('caps the total and flags capped when count exceeds the cap', async () => {
      eventModelMock.countDocuments.mockResolvedValueOnce(EVENTS_COUNT_CAP + 1)

      await expect(service.countCapped({})).resolves.toEqual({ total: EVENTS_COUNT_CAP, capped: true })
    })

    it('respects a custom cap', async () => {
      eventModelMock.countDocuments.mockResolvedValueOnce(51)

      await expect(service.countCapped({ type: 'order:created' }, 50)).resolves.toEqual({ total: 50, capped: true })
      expect(eventModelMock.countDocuments).toHaveBeenCalledWith({ type: 'order:created' }, { limit: 51 })
    })
  })
})
