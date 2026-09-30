import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { ModuleRef } from '@nestjs/core'
import { EventsService } from './events.service'
import { EventSubscriptionService } from './event-subscription.service'
import { PracticesService } from '../../practices/practices.service'
import { Event } from '../entities/event.entity'
import { Organization } from '../../organizations/entities/organization.entity'

describe('EventsService', () => {
  let service: EventsService

  const eventModelMock = {
    find: jest.fn().mockResolvedValue([]),
    countDocuments: jest.fn().mockResolvedValue(0)
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
        { provide: EventSubscriptionService, useValue: {} },
        { provide: PracticesService, useValue: practicesServiceMock },
        { provide: ModuleRef, useValue: { get: jest.fn() } }
      ]
    }).compile()

    service = module.get<EventsService>(EventsService)
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
})
