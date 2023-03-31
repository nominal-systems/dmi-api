import { OrdersService } from './orders.service'
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Order } from './entities/order.entity'
import { MockUtils } from '../common/test/mock-utils'
import { Repository } from 'typeorm'
import { ReportsService } from '../reports/reports.service'
import { IntegrationsService } from '../integrations/integrations.service'
import { EventsService } from '../events/services/events.service'
import {
  ProviderResult,
  TestResultItemInterpretationCode,
  TestResultItemStatus
} from '@nominal-systems/dmi-engine-common'
import * as fs from 'fs'
import * as path from 'path'
import { orderRepositoryMockFactory } from './test/order.repository.mock'
import { EventNamespace } from '../events/constants/event-namespace.enum'
import { EventType } from '../events/constants/event-type.enum'

export const repositoryMockFactory: () => MockUtils<Repository<any>> = jest.fn(() => ({
  find: jest.fn(entity => entity),
  findOne: jest.fn(entity => entity)
}))

describe('OrdersService', () => {
  let ordersService: OrdersService
  const configServiceMock = {
    get: jest.fn()
  }

  const reportsServiceMock = {}
  const integrationsServiceMock = {
    findById: jest.fn().mockImplementation((integration) => integration),
    findOne: jest.fn().mockReturnValue({
      practice: {}
    })
  }
  let ordersRepositoryMock: Partial<Repository<Order>>
  const eventsServiceMock = {
    addEvent: jest.fn()
  }
  const clientMock = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: ConfigService,
          useValue: configServiceMock
        },
        {
          provide: getRepositoryToken(Order),
          useFactory: orderRepositoryMockFactory
        },
        {
          provide: getRepositoryToken(Test),
          useFactory: repositoryMockFactory
        },
        {
          provide: ReportsService,
          useValue: reportsServiceMock
        },
        {
          provide: IntegrationsService,
          useValue: integrationsServiceMock
        },
        {
          provide: EventsService,
          useValue: eventsServiceMock
        },
        {
          provide: 'ACTIVEMQ',
          useValue: clientMock
        }
      ]
    }).compile()

    ordersService = module.get<OrdersService>(OrdersService)
    ordersRepositoryMock = module.get(getRepositoryToken(Order))
  })

  it('should be defined', () => {
    expect(ordersService).toBeDefined()
  })

  describe('handleExternalOrders()', () => {
    const initialOrders = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'test', 'antech', 'orders-01.json'), 'utf8'))
    const updatedOrders = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'test', 'antech', 'orders-02.json'), 'utf8'))
    it('should create/update Antech orders', async () => {
      // 1. Create new orders
      // Setup: do not find existing orders, create new ones
      jest.spyOn(ordersRepositoryMock, 'find').mockResolvedValueOnce([])
      // @ts-expect-error: compiler type error
      ordersRepositoryMock.create.mockImplementationOnce((data) =>
        data.map((item, index) => Object.assign(new Order(), { ...item, id: index + 1 }))
      )
      // @ts-expect-error: compiler type error
      ordersRepositoryMock.save.mockImplementation(async (entities) => entities)

      await ordersService.handleExternalOrders({
        integrationId: '1',
        orders: JSON.parse(JSON.stringify(initialOrders))
      })

      expect(eventsServiceMock.addEvent).toHaveBeenCalledTimes(initialOrders.length)
      expect(eventsServiceMock.addEvent).toHaveBeenCalledWith(expect.objectContaining({
        namespace: EventNamespace.ORDERS,
        type: EventType.ORDER_CREATED
      }))
      eventsServiceMock.addEvent.mockClear()

      // 2. Update existing orders
      // Setup: find existing orders, update them
      jest.spyOn(ordersRepositoryMock, 'find').mockResolvedValueOnce(initialOrders)

      await ordersService.handleExternalOrders({
        integrationId: '1',
        orders: JSON.parse(JSON.stringify(updatedOrders))
      })

      expect(eventsServiceMock.addEvent).toHaveBeenCalledTimes(updatedOrders.length)
      expect(eventsServiceMock.addEvent).toHaveBeenCalledWith(expect.objectContaining({
        namespace: EventNamespace.ORDERS,
        type: EventType.ORDER_UPDATED
      }))
      eventsServiceMock.addEvent.mockClear()

      // 3. Should not update orders if with no new data
      // Setup: find existing orders, skip update
      jest.spyOn(ordersRepositoryMock, 'find').mockResolvedValueOnce(updatedOrders)

      await ordersService.handleExternalOrders({
        integrationId: '1',
        orders: JSON.parse(JSON.stringify(initialOrders))
      })

      expect(eventsServiceMock.addEvent).not.toHaveBeenCalled()
    })
  })

  describe('handleExternalOrderResults()', () => {
    it('should handle results for orphan orders', async () => {
      const results: ProviderResult[] = [
        {
          id: 'vcp.RMjAyMzAyMTM3Njg5MzY3ODc2NjA',
          orderId: '100075178',
          status: 'COMPLETED',
          testResults: [
            {
              code: 'Endocrinology',
              name: 'Endocrinology',
              items: [
                {
                  code: '804',
                  name: 'Total T4',
                  status: TestResultItemStatus.DONE,
                  valueQuantity: {
                    value: 8.3,
                    units: 'µg/dL'
                  },
                  referenceRange: [
                    {
                      type: 'NORMAL',
                      low: 0.8,
                      high: 4.7,
                      text: '0.8 - 4.7 µg/dL'
                    },
                    {
                      type: 'CRITICAL',
                      low: 0,
                      high: 0.8
                    },
                    {
                      type: 'CRITICAL',
                      low: 4.7,
                      high: 20
                    }
                  ],
                  interpretation: {
                    code: TestResultItemInterpretationCode.HIGH,
                    text: 'High'
                  },
                  notes: 'RESULT VERIFIED BY REPEAT ANALYSIS\n\nA T4 above the reference interval in a cat with clinical signs is consistent with hyperthyroidism. If undergoing treatment for hyperthyroidism, this level suggests inadequate control.'
                }
              ]
            }
          ]
        }
      ]
      const integration = {
        id: 'integrationId'
      }
      await ordersService.handleExternalOrderResults({
        integrationId: integration.id,
        results
      })
    })
  })
})
