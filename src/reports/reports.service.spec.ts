import { ReportsService } from './reports.service'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Report } from './entities/report.entity'
import { MockUtils } from '../common/test/mock-utils'
import { Repository } from 'typeorm'
import { TestResult } from './entities/test-result.entity'
import { IntegrationsService } from '../integrations/integrations.service'
import { EventsService } from '../events/services/events.service'
import { OrdersService } from '../orders/orders.service'
import { TestResultItemStatus } from '@nominal-systems/dmi-engine-common'

const repositoryMockFactory: () => MockUtils<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
  find: jest.fn(entity => entity)
}))

describe('ReportsService', () => {
  let service: ReportsService
  // let reportsRepositoryMock
  const ordersServiceMock = {
    findOrdersByExternalIds: jest.fn().mockImplementation((orders) => orders)
  }
  const integrationsServiceMock = {
    findById: jest.fn().mockImplementation((integration) => integration)
  }
  const eventsServiceMock = {
    addEvent: jest.fn()
  }

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
    // reportsRepositoryMock = module.get(getRepositoryToken(Report))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('updateTestResultObservations()', () => {
    it('should update the test result observations', () => {
      const testResult = new TestResult()
      testResult.observations = []
      const items = [
        {
          code: '281',
          name: 'Hemolysis Index',
          status: TestResultItemStatus.DONE,
          valueString: 'N',
          notes: 'Index of N, 1+, 2+ exhibits no significant effect on chemistry values.'
        },
        {
          code: '804',
          name: 'Total T4',
          status: TestResultItemStatus.PENDING,
          referenceRange: [
            {
              type: 'NORMAL',
              text: '1.0 - 4.0 ug/dL',
              low: 1,
              high: 4
            },
            {
              type: 'CRITICAL',
              low: 0,
              high: 1
            },
            {
              type: 'CRITICAL',
              low: 4,
              high: 9
            }
          ]
        },
        {
          code: 'RBC',
          name: 'RBC',
          status: TestResultItemStatus.DONE,
          valueQuantity: {
            value: 7.05,
            units: 'M/µL'
          },
          referenceRange: [
            {
              type: 'NORMAL',
              text: '5.50 - 8.50 M/µL',
              low: 5.5,
              high: 8.5
            },
            {
              type: 'CRITICAL',
              low: 3.0,
              high: 5.5
            },
            {
              type: 'CRITICAL',
              low: 8.5,
              high: 10.0
            }
          ]
        }
      ]
      service.updateTestResultObservations(testResult, items)
      expect(testResult.observations).toHaveLength(3)
      expect(testResult.observations[0]).toEqual({
        code: '281',
        name: 'Hemolysis Index',
        status: TestResultItemStatus.DONE,
        valueString: 'N',
        notes: 'Index of N, 1+, 2+ exhibits no significant effect on chemistry values.'
      })
      expect(testResult.observations[1]).toEqual({
        code: '804',
        name: 'Total T4',
        status: TestResultItemStatus.PENDING,
        referenceRange: [
          {
            type: 'NORMAL',
            text: '1.0 - 4.0 ug/dL',
            low: 1,
            high: 4
          },
          {
            type: 'CRITICAL',
            low: 0,
            high: 1
          },
          {
            type: 'CRITICAL',
            low: 4,
            high: 9
          }
        ]
      })
      expect(testResult.observations[2]).toEqual({
        code: 'RBC',
        name: 'RBC',
        status: 'DONE',
        valueQuantity: {
          value: 7.05,
          units: 'M/µL'
        },
        referenceRange: [
          {
            type: 'NORMAL',
            text: '5.50 - 8.50 M/µL',
            low: 5.5,
            high: 8.5
          },
          {
            type: 'CRITICAL',
            low: 3.0,
            high: 5.5
          },
          {
            type: 'CRITICAL',
            low: 8.5,
            high: 10.0
          }
        ]
      })
    })
  })
})
