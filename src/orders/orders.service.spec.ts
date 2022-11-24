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

export const repositoryMockFactory: () => MockUtils<Repository<any>> = jest.fn(() => ({
  find: jest.fn(entity => entity)
}))

describe('OrdersService', () => {
  let ordersService: OrdersService
  const configServiceMock = {
    get: jest.fn()
  }
  let ordersRepositoryMock: MockUtils<Repository<Order>>
  // let testsRepositoryMock: MockUtils<Repository<Test>>
  const reportsServiceMock = {}
  const integrationsServiceMock = {
    findOne: jest.fn().mockReturnValue({
      practice: {}
    })
  }
  const eventsServiceMock = {}
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

  it('should handle non-existing external orders', async () => {
    // const externalOrder: ExternalOrder = {
    //   externalId: '100070309',
    //   status: OrderStatus.SUBMITTED,
    //   patient: {
    //     name: 'Abbey',
    //     sex: 'FEMALE_INTACT',
    //     species: 'FELINE',
    //     birthdate: '2013-01-09',
    //     identifier: [
    //       {
    //         system: 'provider::idexx::patientId',
    //         value: '111'
    //       }
    //     ],
    //     breed: 'PERSIAN'
    //   },
    //   client: {
    //     firstName: 'Michael',
    //     lastName: 'Anderson'
    //   },
    //   tests: [
    //     {
    //       code: '1'
    //     },
    //     {
    //       code: '804'
    //     }
    //   ],
    //   veterinarian: {
    //     lastName: 'Dr. Brown'
    //   },
    //   manifestUri: 'https://integration.vetconnectplus.com/api/v1/pdf/100070309?token=ada5c19a0ff0289cb99b0d90d1b05522&orderId=100070309',
    //   submissionUri: 'https://integration.vetconnectplus.com/ui?token=ada5c19a0ff0289cb99b0d90d1b05522&orderId=100070309',
    //   editable: true
    // }

    ordersRepositoryMock.find?.mockReturnValue([])
    // await ordersService.handleExternalOrders({
    //   integrationId: 'integrationId',
    //   orders: [externalOrder]
    // })
  })
})
