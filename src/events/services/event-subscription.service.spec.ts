import { EventSubscriptionService } from './event-subscription.service'
import { Test, TestingModule } from '@nestjs/testing'
import { EventSubscription } from '../entities/event-subscription.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { IntegrationsService } from '../../integrations/integrations.service'
import { EventHubProducerClient } from '@azure/event-hubs'
import { Event } from '../entities/event.entity'

jest.mock('@azure/event-hubs', () => ({ EventHubProducerClient: jest.fn() }))

describe('EventSubscriptionService', () => {
  let service: EventSubscriptionService
  let eventSubscriptionRepositoryMock: { find: jest.Mock }
  const integrationsServiceMock = {
    findOne: jest.fn()
  }

  beforeEach(async () => {
    eventSubscriptionRepositoryMock = { find: jest.fn() }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventSubscriptionService,
        {
          provide: getRepositoryToken(EventSubscription),
          useValue: eventSubscriptionRepositoryMock
        },
        {
          provide: IntegrationsService,
          useValue: integrationsServiceMock
        }
      ]
    }).compile()

    service = module.get<EventSubscriptionService>(EventSubscriptionService)
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('notifySubscriptions()', () => {
    const subscription = {
      id: 'subscription-1',
      subscription_options: {
        hub_namespace: 'ns',
        hub_name: 'hub',
        sa_key_name: 'key-name',
        sa_key_value: 'key-value'
      }
    }
    const event = {
      _id: 'event-1',
      seq: 42,
      type: 'report:updated',
      integrationId: 'integration-1',
      accessionId: 'ACC-1',
      data: { reportId: 'report-1', orderId: 'order-1' }
    } as unknown as Event

    let batch: { tryAdd: jest.Mock, maxSizeInBytes: number }
    let producer: { createBatch: jest.Mock, sendBatch: jest.Mock, close: jest.Mock }
    let logSpy: jest.SpyInstance
    let errorSpy: jest.SpyInstance

    beforeEach(() => {
      batch = { tryAdd: jest.fn().mockReturnValue(true), maxSizeInBytes: 1048576 }
      producer = {
        createBatch: jest.fn().mockResolvedValue(batch),
        sendBatch: jest.fn().mockResolvedValue(undefined),
        close: jest.fn().mockResolvedValue(undefined)
      }
      ;(EventHubProducerClient as unknown as jest.Mock).mockImplementation(() => producer)
      integrationsServiceMock.findOne.mockResolvedValue({ practice: { organizationId: 'org-1' } })
      eventSubscriptionRepositoryMock.find.mockResolvedValue([subscription])
      logSpy = jest.spyOn((service as any).logger, 'log').mockImplementation(() => {})
      errorSpy = jest.spyOn((service as any).logger, 'error').mockImplementation(() => {})
    })

    it('should send the event partitioned by reportId and log the delivery', async () => {
      await service.notifySubscriptions(event)

      expect(producer.createBatch).toHaveBeenCalledWith({ partitionKey: 'report-1' })
      expect(batch.tryAdd).toHaveBeenCalledWith({ body: event })
      expect(producer.sendBatch).toHaveBeenCalledWith(batch)
      expect(producer.close).toHaveBeenCalled()
      expect(logSpy).toHaveBeenCalledWith("Notifying subscription: subscription-1 of event 'report:updated'")
      expect(errorSpy).not.toHaveBeenCalled()
    })

    it('should not send an empty batch and log an error when the event is too large', async () => {
      batch.tryAdd.mockReturnValue(false)

      await service.notifySubscriptions(event)

      expect(producer.sendBatch).not.toHaveBeenCalled()
      expect(producer.close).toHaveBeenCalled()
      expect(logSpy).not.toHaveBeenCalled()
      expect(errorSpy).toHaveBeenCalledTimes(1)
      const message: string = errorSpy.mock.calls[0][0]
      expect(message).toContain('subscription-1')
      expect(message).toContain('NOT delivered')
      expect(message).toContain('eventId=event-1')
      expect(message).toContain('seq=42')
      expect(message).toContain('integrationId=integration-1')
      expect(message).toContain('accessionId=ACC-1')
      expect(message).toContain(`jsonSize=${Buffer.byteLength(JSON.stringify(event))} bytes`)
      expect(message).toContain('max=1048576 bytes')
    })

    it('should close the producer and log an error when sending fails', async () => {
      producer.sendBatch.mockRejectedValue(new Error('boom'))

      await service.notifySubscriptions(event)

      expect(producer.close).toHaveBeenCalled()
      expect(logSpy).not.toHaveBeenCalled()
      expect(errorSpy).toHaveBeenCalledWith(
        "Error notifying subscription: subscription-1 of event 'report:updated'",
        expect.stringContaining('boom')
      )
    })

    it('should still report the delivery when closing the producer fails', async () => {
      producer.close.mockRejectedValue(new Error('close failed'))
      const warnSpy = jest.spyOn((service as any).logger, 'warn').mockImplementation(() => {})

      await service.notifySubscriptions(event)

      expect(logSpy).toHaveBeenCalledWith("Notifying subscription: subscription-1 of event 'report:updated'")
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('close failed'))
      expect(errorSpy).not.toHaveBeenCalled()
    })

    it('should keep notifying the remaining subscriptions after a failure', async () => {
      eventSubscriptionRepositoryMock.find.mockResolvedValue([subscription, { ...subscription, id: 'subscription-2' }])
      batch.tryAdd.mockReturnValueOnce(false).mockReturnValueOnce(true)

      await service.notifySubscriptions(event)

      expect(producer.sendBatch).toHaveBeenCalledTimes(1)
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('subscription-1'))
      expect(logSpy).toHaveBeenCalledWith("Notifying subscription: subscription-2 of event 'report:updated'")
    })

    it('should do nothing when the integration is not found', async () => {
      integrationsServiceMock.findOne.mockResolvedValue(undefined)

      const results = await service.notifySubscriptions(event)

      expect(results).toEqual([])
      expect(eventSubscriptionRepositoryMock.find).not.toHaveBeenCalled()
      expect(EventHubProducerClient).not.toHaveBeenCalled()
    })

    it('should return a sent result per delivered subscription', async () => {
      const results = await service.notifySubscriptions(event)

      expect(results).toEqual([{ subscriptionId: 'subscription-1', status: 'sent' }])
    })

    it('should return a too_large result when the event does not fit', async () => {
      batch.tryAdd.mockReturnValue(false)

      const results = await service.notifySubscriptions(event)

      expect(results).toEqual([{
        subscriptionId: 'subscription-1',
        status: 'too_large',
        jsonSizeInBytes: Buffer.byteLength(JSON.stringify(event)),
        maxSizeInBytes: 1048576
      }])
    })

    it('should return an error result when sending fails', async () => {
      producer.sendBatch.mockRejectedValue(new Error('boom'))

      const results = await service.notifySubscriptions(event)

      expect(results).toEqual([{
        subscriptionId: 'subscription-1',
        status: 'error',
        error: expect.objectContaining({ message: 'boom' })
      }])
    })

    it('should return one result per subscription, in order', async () => {
      eventSubscriptionRepositoryMock.find.mockResolvedValue([subscription, { ...subscription, id: 'subscription-2' }])
      batch.tryAdd.mockReturnValueOnce(false).mockReturnValueOnce(true)

      const results = await service.notifySubscriptions(event)

      expect(results.map((result) => [result.subscriptionId, result.status])).toEqual([
        ['subscription-1', 'too_large'],
        ['subscription-2', 'sent']
      ])
    })

    it('should return no results when the organization has no subscription for the event type', async () => {
      eventSubscriptionRepositoryMock.find.mockResolvedValue([])

      const results = await service.notifySubscriptions(event)

      expect(results).toEqual([])
      expect(EventHubProducerClient).not.toHaveBeenCalled()
    })
  })
})
