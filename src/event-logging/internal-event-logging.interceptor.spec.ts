import { Test, TestingModule } from '@nestjs/testing'
import { InternalEventLoggingInterceptor } from './internal-event-logging.interceptor'
import { InternalEventLoggingService } from './internal-event-logging.service'

describe('InternalEventLoggingInterceptor', () => {
  let interceptor: InternalEventLoggingInterceptor
  let eventLoggingService: InternalEventLoggingService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InternalEventLoggingInterceptor,
        {
          provide: InternalEventLoggingService,
          useValue: {
            logEvent: jest.fn().mockResolvedValue(undefined)
          }
        }
      ]
    }).compile()

    interceptor = module.get<InternalEventLoggingInterceptor>(InternalEventLoggingInterceptor)
    eventLoggingService = module.get<InternalEventLoggingService>(InternalEventLoggingService)
  })

  describe('extractAccessionIds', () => {
    it('should extract accession IDs for ExternalOrdersEventData payloads', () => {
      const payload = {
        orders: [
          { externalId: 'order-123' },
          { externalId: 'order-456' },
          { externalId: 'order-789' },
          { externalId: null },
          { externalId: undefined },
          { externalId: '' }
        ]
      }

      const result = interceptor.extractAccessionIds(payload)
      expect(result).toEqual(['order-123', 'order-456', 'order-789'])
    })
    it('should extract accession IDs for ExternalResultEventData payloads', () => {
      const payload = {
        results: [
          { orderId: 'order-123' },
          { orderId: 'order-456' },
          { orderId: 'order-789' },
          { orderId: null },
          { orderId: undefined },
          { orderId: '' }
        ]
      }

      const result = interceptor.extractAccessionIds(payload)
      expect(result).toEqual(['order-123', 'order-456', 'order-789'])
    })
    it('should return empty array for unrecognized payloads', () => {
      const payload = {
        someOtherData: 'value'
      }

      const result = interceptor.extractAccessionIds(payload)
      expect(result).toEqual([])
    })
    it('should return empty array for null or undefined payloads', () => {
      expect(interceptor.extractAccessionIds(null)).toEqual([])
      expect(interceptor.extractAccessionIds(undefined)).toEqual([])
    })
  })
})
