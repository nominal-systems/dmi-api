import { EventSubscriptionService } from './event-subscription.service'
import { Test, TestingModule } from '@nestjs/testing'
import { MockUtils } from '../../common/test/mock-utils'
import { Repository } from 'typeorm'
import { EventSubscription } from '../entities/event-subscription.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { IntegrationsService } from '../../integrations/integrations.service'
import { Event, EventSchema } from '../entities/event.entity'
import { EventType } from '../constants/event-type.enum'
import { EventHubProducerClient } from '@azure/event-hubs'
import * as mongoose from 'mongoose'

jest.mock('@azure/event-hubs')

const EventModel = mongoose.models[Event.name] ?? mongoose.model(Event.name, EventSchema)

const repositoryMockFactory: () => MockUtils<Repository<any>> = jest.fn(() => ({
  find: jest.fn()
}))

describe('EventSubscriptionService', () => {
  let service: EventSubscriptionService
  let eventSubscriptionRepositoryMock: MockUtils<Repository<EventSubscription>>
  const integrationsServiceMock = {
    findOne: jest.fn()
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventSubscriptionService,
        {
          provide: getRepositoryToken(EventSubscription),
          useFactory: repositoryMockFactory
        },
        {
          provide: IntegrationsService,
          useValue: integrationsServiceMock
        }
      ]
    }).compile()

    service = module.get<EventSubscriptionService>(EventSubscriptionService)
    eventSubscriptionRepositoryMock = module.get(getRepositoryToken(EventSubscription))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('notifySubscriptions', () => {
    const tryAdd = jest.fn()
    // `body` is a pre-serialized Buffer (see `serializeEvent`), not a plain object
    const getPublishedBody = (): any => JSON.parse((tryAdd.mock.calls[0][0].body as Buffer).toString('utf-8'))
    const producerMock = {
      createBatch: jest.fn().mockResolvedValue({ tryAdd }),
      sendBatch: jest.fn().mockResolvedValue(undefined),
      close: jest.fn().mockResolvedValue(undefined)
    }

    beforeEach(() => {
      jest.clearAllMocks()
      producerMock.createBatch.mockResolvedValue({ tryAdd })
      ;(EventHubProducerClient as unknown as jest.Mock).mockImplementation(() => producerMock)

      integrationsServiceMock.findOne.mockResolvedValue({
        practice: { organizationId: 'org-1' }
      })
      ;(eventSubscriptionRepositoryMock.find as jest.Mock).mockResolvedValue([
        {
          id: 'subscription-1',
          subscription_options: {
            sa_key_name: 'key-name',
            sa_key_value: 'key-value',
            hub_namespace: 'namespace',
            hub_name: 'hub'
          }
        }
      ])
    })

    it('does not throw for a real Mongoose document and strips both the presentedFrom and nested order manifest attachments', async () => {
      const event = new EventModel({
        type: EventType.REPORT_CREATED,
        integrationId: 'integration-1',
        data: {
          reportId: 'report-1',
          report: {
            id: 'report-1',
            order: {
              id: 'order-1',
              manifest: {
                id: 'manifest-1',
                uri: 'blob://manifest-1',
                contentType: 'application/pdf',
                data: 'base64-order-manifest-content'
              }
            },
            presentedFrom: [
              {
                id: 'attachment-1',
                uri: 'blob://attachment-1',
                contentType: 'application/pdf',
                data: 'base64-presented-from-content'
              }
            ]
          }
        }
      })

      await expect(service.notifySubscriptions(event)).resolves.not.toThrow()

      expect(tryAdd).toHaveBeenCalledTimes(1)
      const publishedBody = getPublishedBody()

      expect(publishedBody.data.report.presentedFrom[0].data).toBeUndefined()
      expect(publishedBody.data.report.presentedFrom[0].id).toBe('attachment-1')
      expect(publishedBody.data.report.order.manifest.data).toBeUndefined()
      expect(publishedBody.data.report.order.manifest.id).toBe('manifest-1')

      // The original document must be left untouched
      expect(event.data.report.presentedFrom[0].data).toBe('base64-presented-from-content')
      expect(event.data.report.order.manifest.data).toBe('base64-order-manifest-content')
    })

    it('strips an order manifest attachment for a real Mongoose document', async () => {
      const event = new EventModel({
        type: EventType.ORDER_CREATED,
        integrationId: 'integration-1',
        data: {
          orderId: 'order-1',
          order: {
            id: 'order-1',
            manifest: {
              id: 'manifest-1',
              uri: 'blob://manifest-1',
              contentType: 'application/pdf',
              data: 'base64-manifest-content'
            }
          }
        }
      })

      await service.notifySubscriptions(event)

      const publishedBody = getPublishedBody()
      expect(publishedBody.data.order.manifest.data).toBeUndefined()
      expect(event.data.order.manifest.data).toBe('base64-manifest-content')
    })

    it('does not throw when an order has no manifest attachment', async () => {
      const event = new EventModel({
        type: EventType.ORDER_UPDATED,
        integrationId: 'integration-1',
        data: {
          orderId: 'order-1',
          status: 'submitted',
          order: { id: 'order-1', status: 'submitted', manifest: null }
        }
      })

      await expect(service.notifySubscriptions(event)).resolves.not.toThrow()

      const publishedBody = getPublishedBody()
      expect(publishedBody.data.order.manifest).toBeNull()
    })

    it('does not throw when a report has no order manifest or presentedFrom attachments', async () => {
      const event = new EventModel({
        type: EventType.REPORT_UPDATED,
        integrationId: 'integration-1',
        data: {
          reportId: 'report-1',
          orderId: 'order-1',
          report: { id: 'report-1', order: { id: 'order-1' } }
        }
      })

      await expect(service.notifySubscriptions(event)).resolves.not.toThrow()
    })
  })
})
