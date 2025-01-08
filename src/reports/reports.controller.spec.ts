import { Test, TestingModule } from '@nestjs/testing'
import { ReportsController } from './reports.controller'
import { ReportsService } from './reports.service'

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
        }
      ]
    }).compile()

    reportsController = module.get<ReportsController>(ReportsController)
  })

  it('should be defined', () => {
    expect(reportsController).toBeDefined()
  })
})
