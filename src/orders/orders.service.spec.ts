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
import { FileUtils, ProviderError, ProviderResult } from '@nominal-systems/dmi-engine-common'
import * as fs from 'fs'
import * as path from 'path'
import { EventNamespace } from '../events/constants/event-namespace.enum'
import { EventType } from '../events/constants/event-type.enum'
import { RefsService } from '../refs/refs.service'
import { CreateOrderDto, CreateOrderDtoClient, CreateOrderDtoPatient } from './dtos/create-order.dto'
import { HttpException } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { Patient } from './entities/patient.entity'
import { ProvidersService } from '../providers/services/providers.service'
import { ExternalOrdersEventData } from '../common/typings/external-order-event-data.interface'
import any = jasmine.any

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
        },
        practice: {}
      }
    }),
    findOne: jest.fn().mockImplementation((integrationId) => {
      return {
        id: integrationId,
        providerConfiguration: {
          providerId: integrationId
        },
        practice: {}
      }
    })
  }
  const refsServiceMock = {
    mapPatientReferences: jest.fn(),
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

  const providerServiceMock = {
    checkLabRequisitionParameters: jest.fn()
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
          provide: ProvidersService,
          useValue: providerServiceMock
        },
        {
          provide: 'ACTIVEMQ',
          useValue: clientMock
        }
      ]
    }).compile()

    ordersService = module.get<OrdersService>(OrdersService)
    ordersRepositoryMock = module.get(getRepositoryToken(Order))
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(ordersService).toBeDefined()
  })

  describe('createOrder()', () => {
    it('should save ref mappings, but send provider ref mappings', async () => {
      const DMI_SEX = 'a6de9d9e-e3b9-4cc5-bfb4-68e33a8684ba'
      const DMI_SPECIES = '36c3cde0-bd6b-11eb-9610-302432eba3e9'
      const DMI_BREED = '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec'
      const PROVIDER_SEX = 'M'
      const PROVIDER_SPECIES = '41'
      const PROVIDER_BREED = '163'
      jest.spyOn(ordersRepositoryMock, 'save').mockImplementation(async (order) => {
        return {
          id: uuidv4(),
          ...order,
          patient: {
            id: uuidv4(),
            ...order.patient
          }
        } as Order
      })
      jest.spyOn(refsServiceMock, 'mapPatientReferences').mockImplementationOnce(async (order, providerPatient, providerId) => {
        providerPatient.sex = PROVIDER_SEX
        providerPatient.species = PROVIDER_SPECIES
        providerPatient.breed = PROVIDER_BREED

        return {
          ...providerPatient,
          sex: DMI_SEX,
          species: DMI_SPECIES,
          breed: DMI_BREED
        } as unknown as Patient
      })
      jest.spyOn(clientMock, 'send').mockReturnValue({
        toPromise: jest.fn().mockResolvedValueOnce({
          requisitionId: '',
          externalId: '',
          status: 'SUBMITTED'
        })
      })
      jest.spyOn(reportsServiceMock, 'registerForOrder').mockReturnValue({ id: '1' })
      const createOrderDto: CreateOrderDto = {
        integrationId: '4b411845-2ed6-48d9-b513-5e95401adc0a',
        patient: {
          name: 'Testpet_0901',
          identifier: [
            {
              system: 'pims:interal-id',
              value: 'f9b01391-12da-47f4-b4a0-461f4fe86dc3'
            }
          ],
          sex: DMI_SEX,
          species: PROVIDER_SPECIES,
          breed: PROVIDER_BREED,
          birthdate: '2022-09-01'
        } as unknown as CreateOrderDtoPatient,
        client: {
          firstName: 'Srikanth',
          lastName: 'M',
          identifier: [
            {
              system: 'foo',
              value: 'bar'
            }
          ]
        } as unknown as CreateOrderDtoClient,
        veterinarian: {
          firstName: 'John',
          lastName: 'Doe'
        } as unknown as CreateOrderDtoClient,
        testCodes: [
          { code: 'CAC655S' }
        ],
        technician: 'Dr. Doolittle',
        notes: 'This is a note.'
      }
      const createdOrder = await ordersService.createOrder(createOrderDto)
      expect(createdOrder.patient).toEqual(
        expect.objectContaining({
          sex: DMI_SEX,
          species: DMI_SPECIES,
          breed: DMI_BREED
        })
      )
      expect(clientMock.send).toBeCalledWith(any(String), expect.objectContaining({
          data: expect.objectContaining({
            payload: expect.objectContaining({
              patient: expect.objectContaining({
                sex: PROVIDER_SEX,
                species: PROVIDER_SPECIES,
                breed: PROVIDER_BREED
              })
            })
          })
        })
      )
    })
    describe('IDEXX', () => {
      const exampleOrder = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'test', 'orders', 'order.json'), 'utf8'))
      it('should create order and map ref correctly', async () => {
        const orderDto = {
          integrationId: 'idexx',
          ...exampleOrder
        } as CreateOrderDto
        jest.spyOn(integrationsServiceMock, 'findOne').mockResolvedValueOnce({
          providerConfiguration: {
            providerId: 'idexx',
            configurationOptions: { url: 'https://test.com' }
          },
          practice: {}
        })
        jest.spyOn(refsServiceMock, 'mapPatientReferences').mockResolvedValueOnce({
          name: 'Medicalnotes_author_test',
          birthdate: '2022-08-15',
          sex: 'bc93eac2-886a-47da-89b7-30e8e2d83e75',
          species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
          breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec'
        })
        jest.spyOn(clientMock, 'send').mockReturnValue(customPromise)
        customPromise.toPromise.mockResolvedValueOnce({ status: 'COMPLETED' })
        jest.spyOn(reportsServiceMock, 'registerForOrder').mockReturnValue({ id: '1' })
        const order = await ordersService.createOrder(orderDto)
        expect(order).toEqual(expect.objectContaining({
          integrationId: 'idexx',
          patient: {
            birthdate: '2022-08-15',
            breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec',
            name: 'Medicalnotes_author_test',
            sex: 'bc93eac2-886a-47da-89b7-30e8e2d83e75',
            species: '36c3cde0-bd6b-11eb-9610-302432eba3e9'
          }
        }))
        eventsServiceMock.addEvent.mockClear()
      })
      it('should throw an HttpException with a specific error message', async () => {
        const orderDto = {
          integrationId: 'idexx',
          sex: 'UNKN',
          ...exampleOrder
        } as CreateOrderDto
        jest.spyOn(integrationsServiceMock, 'findOne').mockResolvedValueOnce({
          providerConfiguration: {
            providerId: 'idexx',
            configurationOptions: { url: 'https://test.com' }
          },
          practice: {}
        })
        jest.spyOn(refsServiceMock, 'mapPatientReferences').mockResolvedValueOnce({
          name: 'Medicalnotes_author_test',
          birthdate: '2022-08-15',
          sex: 'UNKN',
          species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
          breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec'
        })
        try {
          jest.spyOn(clientMock, 'send').mockReturnValue(customPromise)
          customPromise.toPromise.mockRejectedValueOnce({
            response: [
              {
                provider: 'idexx',
                message: 'Invalid order, see data for field level details',
                code: 400,
                error: 'INVALID_ORDER'
              },
              {
                provider: 'idexx',
                message: 'Patient reproductive category is invalid',
                code: 400,
                error: 'INVALID_PATIENT_GENDER'
              }
            ],
            status: 400
          })
          jest.spyOn(reportsServiceMock, 'registerForOrder').mockReturnValue({ id: '1' })
          await ordersService.createOrder(orderDto)
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException)
          expect(error.getStatus()).toBe(400)
          expect(error.response).toEqual([
            {
              provider: 'idexx',
              message: 'Invalid order, see data for field level details',
              code: 400,
              error: 'INVALID_ORDER'
            },
            {
              provider: 'idexx',
              message: 'Patient reproductive category is invalid',
              code: 400,
              error: 'INVALID_PATIENT_GENDER'
            }
          ])
        }
      })
    })
    describe('Antech', () => {
      const exampleOrder = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'test', 'orders', 'order.json'), 'utf8'))
      it('should create order and map ref correctly', async () => {
        const orderDto = {
          integrationId: 'antech',
          ...exampleOrder
        } as CreateOrderDto
        jest.spyOn(integrationsServiceMock, 'findOne').mockResolvedValueOnce({
          providerConfiguration: {
            providerId: 'antech',
            configurationOptions: { url: 'https://test.com' }
          },
          practice: {}
        })
        jest.spyOn(refsServiceMock, 'mapPatientReferences').mockResolvedValueOnce({
          name: 'Medicalnotes_author_test',
          birthdate: '2022-08-15',
          sex: 'bc93eac2-886a-47da-89b7-30e8e2d83e75',
          species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
          breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec'
        })
        jest.spyOn(clientMock, 'send').mockReturnValue(customPromise)
        customPromise.toPromise.mockResolvedValueOnce({ status: 'COMPLETED' })
        jest.spyOn(reportsServiceMock, 'registerForOrder').mockReturnValue({ id: '1' })
        const order = await ordersService.createOrder(orderDto)
        expect(order).toEqual(expect.objectContaining({
          integrationId: 'antech',
          patient: {
            birthdate: '2022-08-15',
            breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec',
            name: 'Medicalnotes_author_test',
            sex: 'bc93eac2-886a-47da-89b7-30e8e2d83e75',
            species: '36c3cde0-bd6b-11eb-9610-302432eba3e9'
          }
        }))
        eventsServiceMock.addEvent.mockClear()
      })
      it('should throw an HttpException with a specific error message', async () => {
        const orderDto = {
          integrationId: 'antech',
          sex: 'UNKN',
          ...exampleOrder
        } as CreateOrderDto
        jest.spyOn(integrationsServiceMock, 'findOne').mockResolvedValueOnce({
          providerConfiguration: {
            providerId: 'antech',
            configurationOptions: { url: 'https://test.com' }
          },
          practice: {}
        })
        jest.spyOn(refsServiceMock, 'mapPatientReferences').mockResolvedValueOnce({
          name: 'Medicalnotes_author_test',
          birthdate: '2022-08-15',
          sex: 'UNKN',
          species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
          breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec'
        })
        try {
          jest.spyOn(clientMock, 'send').mockReturnValue(customPromise)
          customPromise.toPromise.mockRejectedValueOnce({
            name: 'ProviderError',
            response: {
              provider: 'antech',
              code: 400,
              message: 'The request is invalid.',
              error: {
                'order.PetSex': ['The PetSex cannot be longer than 2 characters.'],
                request: ['Order Code invalid 1 please confirm you sent a valid Order code ']
              }
            }
          })
          jest.spyOn(reportsServiceMock, 'registerForOrder').mockReturnValue({ id: '1' })
          await ordersService.createOrder(orderDto)
        } catch (error) {
          expect(error.name).toEqual(ProviderError.name)
          expect(error.response.error).toEqual(expect.objectContaining({
            'order.PetSex': [
              'The PetSex cannot be longer than 2 characters.'
            ],
            request: [
              'Order Code invalid 1 please confirm you sent a valid Order code '
            ]
          }))
        }
      })
    })
    describe('Zoetis', () => {
      const exampleOrder = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'test', 'orders', 'order.json'), 'utf8'))
      it('should create order and map ref correctly even though sex and breed does not exists', async () => {
        const orderDto = {
          integrationId: 'zoetis',
          ...exampleOrder
        } as CreateOrderDto
        jest.spyOn(integrationsServiceMock, 'findOne').mockResolvedValueOnce({
          providerConfiguration: {
            providerId: 'zoetis',
            configurationOptions: { url: 'https://test.com' }
          },
          practice: {}
        })
        jest.spyOn(refsServiceMock, 'mapPatientReferences').mockResolvedValueOnce({
          name: 'Medicalnotes_author_test',
          birthdate: '2022-08-15',
          sex: 'bc93eac2-886a-47da-89b7-30e8e2d83e75',
          species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
          breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec'
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
            sex: 'bc93eac2-886a-47da-89b7-30e8e2d83e75',
            species: '36c3cde0-bd6b-11eb-9610-302432eba3e9'
          }
        }))
        eventsServiceMock.addEvent.mockClear()
      })
    })
  })

  describe('handleExternalOrders()', () => {
    it('should update order in error status', async () => {
      const externalOrders: ExternalOrdersEventData = FileUtils.loadFile('test/external_orders/external_orders-in_error.json')
      jest.spyOn(ordersService, 'findOrdersByExternalIds').mockResolvedValueOnce([
        {
          externalId: externalOrders.orders[0].externalId,
          status: 'SUBMITTED'
        } as unknown as Order
      ])
      await ordersService.handleExternalOrders(externalOrders)

      expect(eventsServiceMock.addEvent).toHaveBeenCalledWith(expect.objectContaining({
        type: EventType.ORDER_UPDATED,
        data: expect.objectContaining({
          order: expect.objectContaining({
            status: 'ERROR',
            notes: externalOrders.orders[0].notes
          })
        })
      }))
    })
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
