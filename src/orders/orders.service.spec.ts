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
import { RefsService } from '../refs/refs.service'
import { CreateOrderDto } from './dtos/create-order.dto'

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
  const reportsServiceMock = {
    registerForOrder: jest.fn()
  }
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
  const refsServiceMock = {
    mapPatientRefs: jest.fn(),
    findOneByCodeAndProvider: jest.fn()
  }
  let ordersRepositoryMock: Partial<Repository<Order>>
  const eventsServiceMock = {
    addEvent: jest.fn()
  }
  const clientMock = {
    send: jest.fn()
  }
  const customPromise = {
    toPromise: jest.fn()
  }

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
          provide: RefsService,
          useValue: refsServiceMock
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

  describe('should create orders', () => {
    const exampleOrder = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'test', 'orders', 'order.json'), 'utf8'))
    describe('IDEXX', () => {
      it('should create order and map ref correctly', async () => {
        const orderDto = {
          integrationId: 'idexx',
          ...exampleOrder
        } as CreateOrderDto
        jest.spyOn(integrationsServiceMock, 'findOne').mockResolvedValueOnce({
          providerConfiguration: {
            providerId: 'idexx',
            configurationOptions: { url: 'https://test.com' }
          }
        })
        jest.spyOn(refsServiceMock, 'mapPatientRefs').mockImplementationOnce(() => {
          Object.assign(orderDto.patient, {
            breed: 'SCHIPPERKE',
            sex: 'UNKNOWN',
            species: 'CANINE'
          })
        })
        jest.spyOn(clientMock, 'send').mockReturnValue(customPromise)
        customPromise.toPromise.mockResolvedValueOnce({ status: 'COMPLETED' })
        jest.spyOn(reportsServiceMock, 'registerForOrder').mockReturnValue({ id: '1' })
        const order = await ordersService.createOrder(orderDto)
        expect(order).toEqual(expect.objectContaining({
          integrationId: 'idexx',
          patient: {
            birthdate: '2022-08-15',
            breed: 'SCHIPPERKE',
            name: 'Medicalnotes_author_test',
            sex: 'UNKNOWN',
            species: 'CANINE'
          }
        }))
        eventsServiceMock.addEvent.mockClear()
      })
    })
    describe('Antech', () => {
      it('should create order and map ref correctly', async () => {
        const orderDto = {
          integrationId: 'antech',
          ...exampleOrder
        } as CreateOrderDto
        jest.spyOn(integrationsServiceMock, 'findOne').mockResolvedValueOnce({
          providerConfiguration: {
            providerId: 'antech',
            configurationOptions: { url: 'https://test.com' }
          }
        })
        jest.spyOn(refsServiceMock, 'mapPatientRefs').mockImplementationOnce(() => {
          Object.assign(orderDto.patient, {
            breed: '163',
            sex: 'U',
            species: '41'
          })
        })
        jest.spyOn(clientMock, 'send').mockReturnValue(customPromise)
        customPromise.toPromise.mockResolvedValueOnce({ status: 'COMPLETED' })
        jest.spyOn(reportsServiceMock, 'registerForOrder').mockReturnValue({ id: '1' })
        const order = await ordersService.createOrder(orderDto)
        expect(order).toEqual(expect.objectContaining({
          integrationId: 'antech',
          patient: {
            birthdate: '2022-08-15',
            breed: '163',
            name: 'Medicalnotes_author_test',
            sex: 'U',
            species: '41'
          }
        }))
        eventsServiceMock.addEvent.mockClear()
      })
    })
    describe('Zoetis', () => {
      it('should create order and map ref correctly even though sex and breed does not exists', async () => {
        const orderDto = {
          integrationId: 'zoetis',
          ...exampleOrder
        } as CreateOrderDto
        jest.spyOn(integrationsServiceMock, 'findOne').mockResolvedValueOnce({
          providerConfiguration: {
            providerId: 'zoetis',
            configurationOptions: { url: 'https://test.com' }
          }
        })
        jest.spyOn(refsServiceMock, 'mapPatientRefs').mockImplementationOnce(() => {
          Object.assign(orderDto.patient, {
            breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec',
            sex: 'UNKNOWN',
            species: 'DOG'
          })
        })
        jest.spyOn(clientMock, 'send').mockReturnValue(customPromise)
        customPromise.toPromise.mockResolvedValueOnce({ status: 'COMPLETED' })
        jest.spyOn(reportsServiceMock, 'registerForOrder').mockReturnValue({ id: '1' })
        const order = await ordersService.createOrder(orderDto)
        expect(order).toEqual(expect.objectContaining({
          integrationId: 'zoetis',
          patient: {
            birthdate: '2022-08-15',
            breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec',
            name: 'Medicalnotes_author_test',
            sex: 'UNKNOWN',
            species: 'DOG'
          }
        }))
        eventsServiceMock.addEvent.mockClear()
      })
    })
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
      const order = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'test', 'antech', 'orders-03.json'), 'utf8'))
      const result = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'test', 'antech', 'results-03.json'), 'utf8'))
      it('should update order with result order info', async () => {
        jest.spyOn(ordersRepositoryMock, 'findOne').mockResolvedValueOnce(order[0])
        await ordersService.handleExternalOrderResults({
          integrationId: 'idexx',
          results: result
        })
        expect(eventsServiceMock.addEvent).toHaveBeenCalledWith(expect.objectContaining({
          namespace: EventNamespace.ORDERS,
          type: EventType.ORDER_UPDATED,
          data: expect.objectContaining({
            order: expect.objectContaining({
              client: {
                firstName: 'Graciela',
                lastName: 'Romero'
              },
              editable: false,
              externalId: '125603216',
              manifest: {
                uri: 'https://URL/LabOrders/PDFPIMS?accessToken=1234567890&ClinicAccessionID=125603216&IsView=1'
              },
              patient: {
                breed: 'Pomeranian',
                name: 'ZEUS',
                sex: 'CM',
                species: 'Canine'
              },
              status: 'COMPLETED',
              submissionUri: 'https://URL/views/order.html?accessToken=1234567890&ClinicAccessionID=125603216',
              tests: [{
                code: 'T805'
              }],
              veterinarian: {
                firstName: 'Banfield',
                lastName: 'Staff'
              }
            })
          })
        }))
      })
    })
  })
})
