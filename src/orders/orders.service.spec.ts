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
  })

  it('should be defined', () => {
    expect(ordersService).toBeDefined()
  })
})
