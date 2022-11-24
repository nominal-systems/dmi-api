import { Test, TestingModule } from '@nestjs/testing'
import { ReportsService } from './reports.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Report } from './entities/report.entity'
import { MockUtils } from '../common/test/mock-utils'
import { Repository } from 'typeorm'
import { TestResult } from './entities/test-result.entity'
import { IntegrationsService } from '../integrations/integrations.service'
import { EventsService } from '../events/services/events.service'
import { OrdersService } from '../orders/orders.service'

const repositoryMockFactory: () => MockUtils<Repository<any>> = jest.fn(() => ({}))

describe('ReportsService', () => {
  let service: ReportsService
  // let reportsRepositoryMock: MockUtils<Repository<Report>>
  const ordersServiceMock = {}
  const integrationsServiceMock = {}
  const eventsServiceMock = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getRepositoryToken(Report),
          useFactory: repositoryMockFactory
        },
        {
          provide: getRepositoryToken(TestResult),
          useFactory: repositoryMockFactory
        },
        {
          provide: OrdersService,
          useValue: ordersServiceMock
        },
        {
          provide: IntegrationsService,
          useValue: integrationsServiceMock
        },
        {
          provide: EventsService,
          useValue: eventsServiceMock
        }
      ]
    }).compile()

    service = module.get<ReportsService>(ReportsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
