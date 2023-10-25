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
  const refsServiceMock = {
    mapPatientRefs: jest.fn()
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
    describe('IDEXX', () => {
      it('should create orders', async () => {
        const order = {
          requisitionId: '{{$randomBankAccountBic}}',
          integrationId: 'idexx',
          patient: {
            name: 'Medicalnotes_author_test',
            sex: 'UNKNOWN',
            species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
            breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec',
            birthdate: '2022-08-15',
            id: '668cfb3a-7d6e-42c8-995f-9b24c65217ef'
          },
          client: {
            firstName: 'Srikanth',
            lastName: 'M',
            id: 'f89d4994-9b2d-4bdb-b9ef-a761777fb365'
          },
          veterinarian: {
            firstName: 'Amity',
            lastName: 'Messick',
            id: '668cfb3a-7d6e-42c8-995f-9b24c65217ef'
          },
          testCodes: [
            {
              code: '1'
            },
            {
              code: '804'
            }
          ]
        }
        jest.spyOn(integrationsServiceMock, 'findById').mockResolvedValueOnce({
          id: '99ee5046-b76f-4858-8cbf-e1de9bfbcd39',
          practiceId: 'f5355841-44cd-4f5b-b177-6ed9f01878be',
          providerConfigurationId: 'ba37e6f1-590d-4df3-9789-b3499558f1e4',
          status: 'RUNNING',
          integrationOptions: { username: 'woofware_us', password: '9^dx^d#F&Dd$t9CH' },
          createdAt: '2023-10-24T20:53:02.691Z',
          updatedAt: '2023-10-24T20:53:52.000Z',
          deletedAt: null,
          providerConfiguration: {
            id: 'ba37e6f1-590d-4df3-9789-b3499558f1e4',
            providerId: 'idexx',
            configurationOptions: {
              orderingBaseUrl: 'https://integration.vetconnectplus.com',
              resultBaseUrl: 'https://partner.vetconnectplus.com',
              'X-Pims-Id': 'fae1e5f0-7556-43f4-be0a-15c9afefaaef',
              'X-Pims-Version': '1'
            },
            organizationId: '3777d7a6-a723-4419-9edd-beadc6f84f16',
            createdAt: '2023-10-24T20:45:26.103Z',
            updatedAt: '2023-10-24T20:45:26.103Z',
            deletedAt: null
          },
          practice: {
            id: 'f5355841-44cd-4f5b-b177-6ed9f01878be',
            name: 'Ward, Durgan and Heaney',
            organizationId: '3777d7a6-a723-4419-9edd-beadc6f84f16',
            createdAt: '2023-10-24T20:45:00.527Z',
            updatedAt: '2023-10-24T20:45:00.527Z',
            deletedAt: null,
            identifier: []
          }
        })
        // finish this test ////////////////
        jest.spyOn(refsServiceMock, 'mapPatientRefs').mockResolvedValueOnce([])

        const orderDto = await ordersService.createOrder(order)
        console.log('🚀 ~ file: orders.service.spec.ts:172 ~ it ~ orderDto:', orderDto)
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
