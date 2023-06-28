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
import { OrderStatus, ProviderResult, ReportStatus, TestResultItemStatus } from '@nominal-systems/dmi-engine-common'
import { reportRepositoryMockFactory } from './test/report.repository.mock'
import { EventNamespace } from '../events/constants/event-namespace.enum'
import { EventType } from '../events/constants/event-type.enum'
import { FileUtils } from '../common/utils/file-utils'

const repositoryMockFactory: () => MockUtils<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
  find: jest.fn(entity => entity),
  save: jest.fn(entity => entity)
}))

describe('ReportsService', () => {
  let reportsService: ReportsService

  let reportsRepositoryMock: Partial<Repository<Report>>
  const ordersServiceMock = {
    findOrdersByExternalIds: jest.fn().mockImplementation((orders) => orders),
    findOneByExternalId: jest.fn().mockImplementation((order) => order),
    getOrderFromProvider: jest.fn().mockImplementation((order) => order),
    createOrderForResult: jest.fn().mockImplementation((integrationId, result) => {
      return {}
    }),
    saveOrder: jest.fn().mockImplementation((order) => order)
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
    })
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
          useFactory: reportRepositoryMockFactory
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

    reportsService = module.get<ReportsService>(ReportsService)
    reportsRepositoryMock = module.get(getRepositoryToken(Report))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(reportsService).toBeDefined()
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
      reportsService.updateTestResultObservations(testResult, items)
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

  describe('updateReportResults()', () => {
    const report = {
      id: '1',
      orderId: '1',
      status: ReportStatus.REGISTERED,
      patient: {},
      order: {},
      testResultsSet: [],
      createdAt: new Date(),
      updatedAt: new Date()
    } as unknown as Report
    const results: ProviderResult[] = [
      {
        id: 'vcp.RMjAyMzAzMDc3MzI4MjkyNjQ5Mjg',
        orderId: '100077338',
        status: 'PARTIAL',
        testResults: [
          {
            code: 'Hematology',
            name: 'Hematology',
            items: [
              {
                code: '3011',
                name: 'RBC',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 5.39,
                    high: 8.7,
                    text: '5.39 - 8.70 M/uL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 1,
                    high: 5.39
                  },
                  {
                    type: 'CRITICAL',
                    low: 8.7,
                    high: 10.2
                  }
                ]
              },
              {
                code: '3013',
                name: 'Hematocrit',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 38.3,
                    high: 56.5,
                    text: '38.3 - 56.5 %'
                  },
                  {
                    type: 'CRITICAL',
                    low: 6,
                    high: 38.3
                  },
                  {
                    type: 'CRITICAL',
                    low: 56.5,
                    high: 66
                  }
                ]
              },
              {
                code: '3012',
                name: 'Hemoglobin',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 13.4,
                    high: 20.7,
                    text: '13.4 - 20.7 g/dL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 2,
                    high: 13.4
                  },
                  {
                    type: 'CRITICAL',
                    low: 20.7,
                    high: 23.5
                  }
                ]
              },
              {
                code: '3014',
                name: 'MCV',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 59,
                    high: 76,
                    text: '59 - 76 fL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 50,
                    high: 59
                  },
                  {
                    type: 'CRITICAL',
                    low: 76,
                    high: 94
                  }
                ]
              },
              {
                code: '3015',
                name: 'MCH',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 21.9,
                    high: 26.1,
                    text: '21.9 - 26.1 pg'
                  },
                  {
                    type: 'CRITICAL',
                    low: 16,
                    high: 21.9
                  },
                  {
                    type: 'CRITICAL',
                    low: 26.1,
                    high: 31
                  }
                ]
              },
              {
                code: '3016',
                name: 'MCHC',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 32.6,
                    high: 39.2,
                    text: '32.6 - 39.2 g/dL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 26,
                    high: 32.6
                  },
                  {
                    type: 'CRITICAL',
                    low: 39.2,
                    high: 42.2
                  }
                ]
              },
              {
                code: '313',
                name: '% Reticulocyte',
                status: TestResultItemStatus.PENDING
              },
              {
                code: '318',
                name: 'Reticulocytes',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 10,
                    high: 110,
                    text: '10 - 110 K/uL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0,
                    high: 10
                  },
                  {
                    type: 'CRITICAL',
                    low: 110,
                    high: 410
                  }
                ]
              },
              {
                code: '7004',
                name: 'Reticulocyte Hemoglobin',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 24.5,
                    high: 31.8,
                    text: '24.5 - 31.8 pg'
                  },
                  {
                    type: 'CRITICAL',
                    low: 10,
                    high: 24.5
                  },
                  {
                    type: 'CRITICAL',
                    low: 31.8,
                    high: 35
                  }
                ]
              },
              {
                code: '3010',
                name: 'WBC',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 4.9,
                    high: 17.6,
                    text: '4.9 - 17.6 K/uL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0.5,
                    high: 4.9
                  },
                  {
                    type: 'CRITICAL',
                    low: 17.6,
                    high: 90
                  }
                ]
              },
              {
                code: '3018',
                name: '% Neutrophils',
                status: TestResultItemStatus.PENDING
              },
              {
                code: '3020',
                name: '% Lymphocytes',
                status: TestResultItemStatus.PENDING
              },
              {
                code: '3021',
                name: '% Monocytes',
                status: TestResultItemStatus.PENDING
              },
              {
                code: '3022',
                name: '% Eosinophils',
                status: TestResultItemStatus.PENDING
              },
              {
                code: '3023',
                name: '% Basophils',
                status: TestResultItemStatus.PENDING
              },
              {
                code: '30180',
                name: 'Neutrophils',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 2940,
                    high: 12670,
                    text: '2,940 - 12,670 /uL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0,
                    high: 2940
                  },
                  {
                    type: 'CRITICAL',
                    low: 12670,
                    high: 51000
                  }
                ]
              },
              {
                code: '30200',
                name: 'Lymphocytes',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 1060,
                    high: 4950,
                    text: '1,060 - 4,950 /uL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0,
                    high: 1060
                  },
                  {
                    type: 'CRITICAL',
                    low: 4950,
                    high: 29000
                  }
                ]
              },
              {
                code: '30210',
                name: 'Monocytes',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 130,
                    high: 1150,
                    text: '130 - 1,150 /uL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0,
                    high: 130
                  },
                  {
                    type: 'CRITICAL',
                    low: 1150,
                    high: 6600
                  }
                ]
              },
              {
                code: '30220',
                name: 'Eosinophils',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 70,
                    high: 1490,
                    text: '70 - 1,490 /uL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0,
                    high: 70
                  },
                  {
                    type: 'CRITICAL',
                    low: 1490,
                    high: 5000
                  }
                ]
              },
              {
                code: '30230',
                name: 'Basophils',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 0,
                    high: 100,
                    text: '0 - 100 /uL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0,
                    high: 0
                  },
                  {
                    type: 'CRITICAL',
                    low: 100,
                    high: 350
                  }
                ]
              },
              {
                code: '3028',
                name: 'Platelets',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 143,
                    high: 448,
                    text: '143 - 448 K/uL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0,
                    high: 143
                  },
                  {
                    type: 'CRITICAL',
                    low: 448,
                    high: 1000
                  }
                ]
              },
              {
                code: '3034',
                name: 'Remarks',
                status: TestResultItemStatus.PENDING
              }
            ]
          },
          {
            code: 'Chemistry',
            name: 'Chemistry',
            items: [
              {
                code: '216',
                name: 'Glucose',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 63,
                    high: 114,
                    text: '63 - 114 mg/dL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 21,
                    high: 63
                  },
                  {
                    type: 'CRITICAL',
                    low: 114,
                    high: 700
                  }
                ]
              },
              {
                code: '3638',
                name: 'IDEXX SDMA',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 0,
                    high: 14,
                    text: '0 - 14 ug/dL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0,
                    high: 0
                  },
                  {
                    type: 'CRITICAL',
                    low: 14,
                    high: 35
                  }
                ]
              },
              {
                code: '213',
                name: 'Creatinine',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 0.5,
                    high: 1.5,
                    text: '0.5 - 1.5 mg/dL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0,
                    high: 0.5
                  },
                  {
                    type: 'CRITICAL',
                    low: 1.5,
                    high: 5
                  }
                ]
              },
              {
                code: '207',
                name: 'BUN',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 9,
                    high: 31,
                    text: '9 - 31 mg/dL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0,
                    high: 9
                  },
                  {
                    type: 'CRITICAL',
                    low: 31,
                    high: 100
                  }
                ]
              },
              {
                code: '232',
                name: 'BUN: Creatinine Ratio',
                status: TestResultItemStatus.PENDING
              },
              {
                code: '221',
                name: 'Phosphorus',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 2.5,
                    high: 6.1,
                    text: '2.5 - 6.1 mg/dL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0.5,
                    high: 2.5
                  },
                  {
                    type: 'CRITICAL',
                    low: 6.1,
                    high: 20
                  }
                ]
              },
              {
                code: '208',
                name: 'Calcium',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 8.4,
                    high: 11.8,
                    text: '8.4 - 11.8 mg/dL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 2,
                    high: 8.4
                  },
                  {
                    type: 'CRITICAL',
                    low: 11.8,
                    high: 15.5
                  }
                ]
              },
              {
                code: '226',
                name: 'Sodium',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 142,
                    high: 152,
                    text: '142 - 152 mmol/L'
                  },
                  {
                    type: 'CRITICAL',
                    low: 115,
                    high: 142
                  },
                  {
                    type: 'CRITICAL',
                    low: 152,
                    high: 165
                  }
                ]
              },
              {
                code: '229',
                name: 'Potassium',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 4,
                    high: 5.4,
                    text: '4.0 - 5.4 mmol/L'
                  },
                  {
                    type: 'CRITICAL',
                    low: 2,
                    high: 4
                  },
                  {
                    type: 'CRITICAL',
                    low: 5.4,
                    high: 7.5
                  }
                ]
              },
              {
                code: '270',
                name: 'Na: K Ratio',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 28,
                    high: 37,
                    text: '28 - 37'
                  },
                  {
                    type: 'CRITICAL',
                    low: 18,
                    high: 28
                  },
                  {
                    type: 'CRITICAL',
                    low: 37,
                    high: 45
                  }
                ]
              },
              {
                code: '210',
                name: 'Chloride',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 108,
                    high: 119,
                    text: '108 - 119 mmol/L'
                  },
                  {
                    type: 'CRITICAL',
                    low: 50,
                    high: 108
                  },
                  {
                    type: 'CRITICAL',
                    low: 119,
                    high: 145
                  }
                ]
              },
              {
                code: '209',
                name: 'TCO2 (Bicarbonate)',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 13,
                    high: 27,
                    text: '13 - 27 mmol/L'
                  },
                  {
                    type: 'CRITICAL',
                    low: 5,
                    high: 13
                  },
                  {
                    type: 'CRITICAL',
                    low: 27,
                    high: 32
                  }
                ]
              },
              {
                code: '246',
                name: 'Anion Gap',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 11,
                    high: 26,
                    text: '11 - 26 mmol/L'
                  },
                  {
                    type: 'CRITICAL',
                    low: 8,
                    high: 11
                  },
                  {
                    type: 'CRITICAL',
                    low: 26,
                    high: 40
                  }
                ]
              },
              {
                code: '222',
                name: 'Total Protein',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 5.5,
                    high: 7.5,
                    text: '5.5 - 7.5 g/dL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 1,
                    high: 5.5
                  },
                  {
                    type: 'CRITICAL',
                    low: 7.5,
                    high: 9.6
                  }
                ]
              },
              {
                code: '200',
                name: 'Albumin',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 2.7,
                    high: 3.9,
                    text: '2.7 - 3.9 g/dL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0.5,
                    high: 2.7
                  },
                  {
                    type: 'CRITICAL',
                    low: 3.9,
                    high: 4.5
                  }
                ]
              },
              {
                code: '234',
                name: 'Globulin',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 2.4,
                    high: 4,
                    text: '2.4 - 4.0 g/dL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0.5,
                    high: 2.4
                  },
                  {
                    type: 'CRITICAL',
                    low: 4,
                    high: 7.2
                  }
                ]
              },
              {
                code: '231',
                name: 'Albumin: Globulin Ratio',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 0.7,
                    high: 1.5,
                    text: '0.7 - 1.5'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0.1,
                    high: 0.7
                  },
                  {
                    type: 'CRITICAL',
                    low: 1.5,
                    high: 1.6
                  }
                ]
              },
              {
                code: '225',
                name: 'ALT',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 18,
                    high: 121,
                    text: '18 - 121 U/L'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0,
                    high: 18
                  },
                  {
                    type: 'CRITICAL',
                    low: 121,
                    high: 1700
                  }
                ]
              },
              {
                code: '224',
                name: 'AST',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 16,
                    high: 55,
                    text: '16 - 55 U/L'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0,
                    high: 16
                  },
                  {
                    type: 'CRITICAL',
                    low: 55,
                    high: 500
                  }
                ]
              },
              {
                code: '201',
                name: 'ALP',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 5,
                    high: 160,
                    text: '5 - 160 U/L'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0,
                    high: 5
                  },
                  {
                    type: 'CRITICAL',
                    low: 160,
                    high: 6000
                  }
                ]
              },
              {
                code: '214',
                name: 'GGT',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 0,
                    high: 13,
                    text: '0 - 13 U/L'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0,
                    high: 0
                  },
                  {
                    type: 'CRITICAL',
                    low: 13,
                    high: 200
                  }
                ]
              },
              {
                code: '204',
                name: 'Bilirubin - Total',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 0,
                    high: 0.3,
                    text: '0.0 - 0.3 mg/dL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0,
                    high: 0
                  },
                  {
                    type: 'CRITICAL',
                    low: 0.3,
                    high: 10
                  }
                ]
              },
              {
                code: '233',
                name: 'Bilirubin - Unconjugated',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 0,
                    high: 0.2,
                    text: '0.0 - 0.2 mg/dL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0,
                    high: 0
                  },
                  {
                    type: 'CRITICAL',
                    low: 0.2,
                    high: 1.1
                  }
                ]
              },
              {
                code: '205',
                name: 'Bilirubin - Conjugated',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 0,
                    high: 0.1,
                    text: '0.0 - 0.1 mg/dL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0,
                    high: 0
                  },
                  {
                    type: 'CRITICAL',
                    low: 0.1,
                    high: 10
                  }
                ]
              },
              {
                code: '211',
                name: 'Cholesterol',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 131,
                    high: 345,
                    text: '131 - 345 mg/dL'
                  },
                  {
                    type: 'CRITICAL',
                    low: 20,
                    high: 131
                  },
                  {
                    type: 'CRITICAL',
                    low: 345,
                    high: 800
                  }
                ]
              },
              {
                code: '212',
                name: 'Creatine Kinase',
                status: TestResultItemStatus.PENDING,
                referenceRange: [
                  {
                    type: 'NORMAL',
                    low: 10,
                    high: 200,
                    text: '10 - 200 U/L'
                  },
                  {
                    type: 'CRITICAL',
                    low: 0,
                    high: 10
                  },
                  {
                    type: 'CRITICAL',
                    low: 200,
                    high: 2500
                  }
                ]
              },
              {
                code: '281',
                name: 'Hemolysis Index',
                status: TestResultItemStatus.PENDING
              },
              {
                code: '282',
                name: 'Lipemia Index',
                status: TestResultItemStatus.PENDING
              }
            ]
          }
        ]
      }
    ]

    it('should not update a report with no new results', async () => {
      const updated = await reportsService.updateReportResults(report, [])
      expect(updated).toEqual(false)
    })
    it('should save report with results in sequence', async () => {
      const updated = await reportsService.updateReportResults(report, results)
      expect(updated).toEqual(true)
      expect(reportsRepositoryMock.save).toBeCalledWith(expect.objectContaining({
          testResultsSet: [
            expect.objectContaining({
              code: 'Hematology',
              observations: [
                expect.objectContaining({
                  code: '3011',
                  name: 'RBC'
                }),
                expect.objectContaining({
                  code: '3013',
                  name: 'Hematocrit'
                }),
                expect.objectContaining({
                  code: '3012',
                  name: 'Hemoglobin'
                }),
                expect.objectContaining({
                  code: '3014',
                  name: 'MCV'
                }),
                expect.objectContaining({
                  code: '3015',
                  name: 'MCH'
                }),
                expect.objectContaining({
                  code: '3016',
                  name: 'MCHC'
                }),
                expect.objectContaining({
                  code: '313',
                  name: '% Reticulocyte'
                }),
                expect.objectContaining({
                  code: '318',
                  name: 'Reticulocytes'
                }),
                expect.objectContaining({
                  code: '7004',
                  name: 'Reticulocyte Hemoglobin'
                }),
                expect.objectContaining({
                  code: '3010',
                  name: 'WBC'
                }),
                expect.objectContaining({
                  code: '3018',
                  name: '% Neutrophils'
                }),
                expect.objectContaining({
                  code: '3020',
                  name: '% Lymphocytes'
                }),
                expect.objectContaining({
                  code: '3021',
                  name: '% Monocytes'
                }),
                expect.objectContaining({
                  code: '3022',
                  name: '% Eosinophils'
                }),
                expect.objectContaining({
                  code: '3023',
                  name: '% Basophils'
                }),
                expect.objectContaining({
                  code: '30180',
                  name: 'Neutrophils'
                }),
                expect.objectContaining({
                  code: '30200',
                  name: 'Lymphocytes'
                }),
                expect.objectContaining({
                  code: '30210',
                  name: 'Monocytes'
                }),
                expect.objectContaining({
                  code: '30220',
                  name: 'Eosinophils'
                }),
                expect.objectContaining({
                  code: '30230',
                  name: 'Basophils'
                }),
                expect.objectContaining({
                  code: '3028',
                  name: 'Platelets'
                }),
                expect.objectContaining({
                  code: '3034',
                  name: 'Remarks'
                })
              ]
            }),
            expect.objectContaining({
              code: 'Chemistry',
              observations: [
                expect.objectContaining({
                  code: '216',
                  name: 'Glucose'
                }),
                expect.objectContaining({
                  code: '3638',
                  name: 'IDEXX SDMA'
                }),
                expect.objectContaining({
                  code: '213',
                  name: 'Creatinine'
                }),
                expect.objectContaining({
                  code: '207',
                  name: 'BUN'
                }),
                expect.objectContaining({
                  code: '232',
                  name: 'BUN: Creatinine Ratio'
                }),
                expect.objectContaining({
                  code: '221',
                  name: 'Phosphorus'
                }),
                expect.objectContaining({
                  code: '208',
                  name: 'Calcium'
                }),
                expect.objectContaining({
                  code: '226',
                  name: 'Sodium'
                }),
                expect.objectContaining({
                  code: '229',
                  name: 'Potassium'
                }),
                expect.objectContaining({
                  code: '270',
                  name: 'Na: K Ratio'
                }),
                expect.objectContaining({
                  code: '210',
                  name: 'Chloride'
                }),
                expect.objectContaining({
                  code: '209',
                  name: 'TCO2 (Bicarbonate)'
                }),
                expect.objectContaining({
                  code: '246',
                  name: 'Anion Gap'
                }),
                expect.objectContaining({
                  code: '222',
                  name: 'Total Protein'
                }),
                expect.objectContaining({
                  code: '200',
                  name: 'Albumin'
                }),
                expect.objectContaining({
                  code: '234',
                  name: 'Globulin'
                }),
                expect.objectContaining({
                  code: '231',
                  name: 'Albumin: Globulin Ratio'
                }),
                expect.objectContaining({
                  code: '225',
                  name: 'ALT'
                }),
                expect.objectContaining({
                  code: '224',
                  name: 'AST'
                }),
                expect.objectContaining({
                  code: '201',
                  name: 'ALP'
                }),
                expect.objectContaining({
                  code: '214',
                  name: 'GGT'
                }),
                expect.objectContaining({
                  code: '204',
                  name: 'Bilirubin - Total'
                }),
                expect.objectContaining({
                  code: '233',
                  name: 'Bilirubin - Unconjugated'
                }),
                expect.objectContaining({
                  code: '205',
                  name: 'Bilirubin - Conjugated'
                }),
                expect.objectContaining({
                  code: '211',
                  name: 'Cholesterol'
                }),
                expect.objectContaining({
                  code: '212',
                  name: 'Creatine Kinase'
                }),
                expect.objectContaining({
                  code: '281',
                  name: 'Hemolysis Index'
                }),
                expect.objectContaining({
                  code: '282',
                  name: 'Lipemia Index'
                })
              ]
            })
          ]
        })
      )
    })
  })

  describe('handleExternalResults()', () => {
    describe('Idexx', () => {
      it('should support drop n run tests, i.e. create orders and reports', async () => {
        const externalResults: ProviderResult[] = FileUtils.loadFile('test/idexx/results-drop-n-run-02.json')
        const expectedOrder = {
          orderId: undefined,
          order: expect.objectContaining({
            integrationId: 'idexx',
            status: OrderStatus.COMPLETED,
            patient: expect.anything(),
            tests: [
              { code: 'fBNP' }
            ]
          })
        }
        ordersServiceMock.findOneByExternalId.mockResolvedValueOnce(null)
        ordersServiceMock.findOrdersByExternalIds.mockResolvedValueOnce([])
        ordersServiceMock.createOrderForResult.mockResolvedValueOnce({
          integrationId: 'idexx',
          status: 'COMPLETED',
          tests: [{ code: 'fBNP' }]
        })
        await reportsService.handleExternalResults({
          integrationId: 'idexx',
          results: externalResults
        })
        expect(eventsServiceMock.addEvent).toHaveBeenCalledTimes(2)
        expect(eventsServiceMock.addEvent).toHaveBeenCalledWith(expect.objectContaining({
          namespace: EventNamespace.ORDERS,
          type: EventType.ORDER_CREATED,
          integrationId: 'idexx',
          data: expect.objectContaining(expectedOrder)
        }))
        expect(eventsServiceMock.addEvent).toHaveBeenCalledWith(expect.objectContaining({
          namespace: EventNamespace.REPORTS,
          type: EventType.REPORT_CREATED
        }))
      })
      it('should not duplicate orders/reports for drop n run tests', async () => {
        const externalResults: ProviderResult[] = FileUtils.loadFile('test/idexx/results-drop-n-run-03.json')

        // #1: update report only
        ordersServiceMock.findOneByExternalId.mockReturnValueOnce(null)
        ordersServiceMock.saveOrder.mockResolvedValueOnce({
          externalId: '123'
        })
        await reportsService.handleExternalResults({
          integrationId: 'idexx',
          results: externalResults
        })
        // expect(eventsServiceMock.addEvent).toHaveBeenCalledTimes(2)
        expect(eventsServiceMock.addEvent).toHaveBeenCalledWith(expect.objectContaining({
          namespace: EventNamespace.ORDERS,
          type: EventType.ORDER_CREATED
        }))
        expect(eventsServiceMock.addEvent).toHaveBeenCalledWith(expect.objectContaining({
          namespace: EventNamespace.REPORTS,
          type: EventType.REPORT_CREATED
        }))
        expect(eventsServiceMock.addEvent).toHaveBeenCalledWith(expect.objectContaining({
          namespace: EventNamespace.REPORTS,
          type: EventType.REPORT_CREATED
        }))
        eventsServiceMock.addEvent.mockClear()

        // #2: update report only
        jest.spyOn(ordersServiceMock, 'findOneByExternalId')
          .mockReturnValueOnce({
            externalId: '123'
          })
        jest.spyOn(reportsService, 'findReportsByExternalOrderIds')
          .mockResolvedValueOnce([])
          .mockResolvedValueOnce([{
            testResultsSet: []
          } as unknown as Report])
        await reportsService.handleExternalResults({
          integrationId: 'idexx',
          results: externalResults
        })
        expect(eventsServiceMock.addEvent).toHaveBeenCalledTimes(1)
        expect(eventsServiceMock.addEvent).not.toHaveBeenCalledWith(expect.objectContaining({
          namespace: EventNamespace.ORDERS,
          type: EventType.ORDER_CREATED
        }))
        expect(eventsServiceMock.addEvent).not.toHaveBeenCalledWith(expect.objectContaining({
          namespace: EventNamespace.REPORTS,
          type: EventType.REPORT_CREATED
        }))
        expect(eventsServiceMock.addEvent).toHaveBeenCalledWith(expect.objectContaining({
          namespace: EventNamespace.REPORTS,
          type: EventType.REPORT_UPDATED
        }))
      })
      it('should set patient for reports of drop n run tests', async () => {
        const externalResultsA = FileUtils.loadFile('test/idexx/external_results-02a.json')
        await reportsService.handleExternalResults(externalResultsA)

        const externalResultsB = FileUtils.loadFile('test/idexx/external_results-02b.json')
        await reportsService.handleExternalResults(externalResultsB)
      })
    })

    describe('Antech', () => {
      const results: ProviderResult[] = FileUtils.loadFile('test/antech/results-01.json')
      const resultsMissing01: ProviderResult[] = FileUtils.loadFile('test/antech/missing-01.json')

      it('should create orders/reports', async () => {
        jest.spyOn(reportsService, 'findReportsByExternalOrderIds').mockResolvedValueOnce([])
        jest.spyOn(ordersServiceMock, 'getOrderFromProvider').mockResolvedValue(null)
        await reportsService.handleExternalResults({
          integrationId: 'antech',
          results: results
        })

        expect(eventsServiceMock.addEvent).toHaveBeenCalledTimes(results.length)
        eventsServiceMock.addEvent.mockReset()
      })
      it('should handle missing results', async () => {
        jest.spyOn(reportsService, 'findReportsByExternalOrderIds').mockResolvedValueOnce([])
        jest.spyOn(ordersServiceMock, 'getOrderFromProvider').mockResolvedValue(null)
        await reportsService.handleExternalResults({
          integrationId: 'antech',
          results: resultsMissing01
        })

        expect(eventsServiceMock.addEvent).toHaveBeenCalledTimes(resultsMissing01.length)
      })
    })
  })
})
