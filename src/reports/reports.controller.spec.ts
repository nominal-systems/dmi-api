import { Test, TestingModule } from '@nestjs/testing'
import { ReportsController } from './reports.controller'
import { ReportsService } from './reports.service'

describe('ReportsController', () => {
  let controller: ReportsController
  let reportsService = {}

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

    controller = module.get<ReportsController>(ReportsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
