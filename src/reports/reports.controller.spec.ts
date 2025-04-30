import { Test, TestingModule } from '@nestjs/testing'
import { ReportsController } from './reports.controller'
import { ReportsService } from './reports.service'
import { InternalEventLoggingService } from '../event-logging/internal-event-logging.service'
import { OrdersService } from '../orders/orders.service'

describe('ReportsController', () => {
  let reportsController: ReportsController
  const reportsService = {
    getPresentedForm: jest.fn(),
    getPresentedFormAttachment: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsController,
        {
          provide: ReportsService,
          useValue: reportsService
        },
        {
          provide: InternalEventLoggingService,
          useValue: {}
        },
        {
          provide: OrdersService,
          useValue: {}
        }
      ]
    }).compile()

    reportsController = module.get<ReportsController>(ReportsController)
  })

  it('should be defined', () => {
    expect(reportsController).toBeDefined()
  })
})
