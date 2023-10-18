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
import { ProviderResult } from '@nominal-systems/dmi-engine-common'
import * as fs from 'fs'
import * as path from 'path'
import { EventNamespace } from '../events/constants/event-namespace.enum'
import { EventType } from '../events/constants/event-type.enum'

export const repositoryMockFactory: () => MockUtils<Repository<any>> = jest.fn(() => ({
  find: jest.fn(entity => entity),
  findOne: jest.fn(entity => entity),
  create: jest.fn(entity => entity),
  save: jest.fn(entity => entity)
}))

describe('OrdersService', () => {
  let ordersService: OrdersService

  const configServiceMock = {
    get: jest.fn()
  }
  const reportsServiceMock = {}
  const integrationsServiceMock = {
    findById: jest.fn().mockImplementation((integrationId) => {
      return {
        id: integrationId,
        providerConfiguration: {
          providerId: integrationId
        }
      }
    }),
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
          useFactory: repositoryMockFactory
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
    describe('Antech', () => {
      const initialOrders = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'test', 'antech', 'orders-01.json'), 'utf8'))
      const updatedOrders = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'test', 'antech', 'orders-02.json'), 'utf8'))

      it('should create/update Antech orders', async () => {
        // 1. Create new orders
        // Setup: do not find existing orders, create new ones
        jest.spyOn(ordersRepositoryMock, 'find').mockResolvedValueOnce([])
        // @ts-expect-error: compiler type error
        ordersRepositoryMock.create.mockImplementationOnce((data) =>
          data.map((item, index) => Object.assign(new Order(), { ...item, id: index }))
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
  })

  describe('handleExternalOrderResults()', () => {
    describe('IDEXX', () => {
      const results01: ProviderResult[] = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'test', 'idexx', 'results-01.json'), 'utf8'))
      const resultsDropNRun01: ProviderResult[] = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'test', 'idexx', 'results-drop-n-run-02.json'), 'utf8'))

      it('should handle results for orphan orders', async () => {
        await ordersService.handleExternalOrderResults({
          integrationId: 'idexx',
          results: results01
        })
      })
      it('should skip order results with no order ID', async () => {
        await ordersService.handleExternalOrderResults({
          integrationId: 'idexx',
          results: resultsDropNRun01
        })
        expect(ordersRepositoryMock.findOne).not.toHaveBeenCalled()
        expect(eventsServiceMock.addEvent).not.toHaveBeenCalled()
      })
    })
    describe('Antech', () => {
      it('should update order with result order info', async () => {
        const order = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'test', 'antech', 'orders-03.json'), 'utf8'))
        const result = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'test', 'antech', 'results-03.json'), 'utf8'))
        const updatedOrder = await ordersService.updateOrderFromResult(order[0], result[0])
        expect(updatedOrder).toEqual({
          externalId: '125603216',
          status: 'COMPLETED',
          tests: [{ code: 'T805' }],
          manifest: {
            uri: 'https://pims-onboard.antechdiagnostics.com/LabOrders/PDFPIMS?accessToken=&ClinicAccessionID=125603216&IsView=1'
          },
          submissionUri: 'https://pims-onboard.antechdiagnostics.com/views/order.html?accessToken=&ClinicAccessionID=125603216',
          editable: false,
          patient: { name: 'ZEUS', sex: 'CM', species: 'Canine', breed: 'Pomeranian' },
          client: { lastName: 'Romero', firstName: 'Graciela' },
          veterinarian: { firstName: 'Banfield', lastName: 'Staff' }
        })
      })
    })
  })
})
