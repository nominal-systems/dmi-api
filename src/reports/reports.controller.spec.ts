import { Test, TestingModule } from '@nestjs/testing'
import { ReportsController } from './reports.controller'
import { ReportsService } from './reports.service'
import { InternalEventLoggingService } from '../internal-event-logging/internal-event-logging.service'
import { OrdersService } from '../orders/orders.service'
import { ApiGuard } from '../common/guards/api.guard'

describe('ReportsController', () => {
  let reportsController: ReportsController
  const reportsService = {
    getReport: jest.fn(),
    getPresentedForm: jest.fn(),
    getPresentedFormAttachment: jest.fn()
  }
  const organization = { id: 'org-1' } as any

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
    })
      .overrideGuard(ApiGuard)
      .useValue({ canActivate: () => true })
      .compile()

    reportsController = module.get<ReportsController>(ReportsController)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(reportsController).toBeDefined()
  })

  it('forwards the organization to getReport()', async () => {
    await reportsController.getReport(organization, 'report-1')
    expect(reportsService.getReport).toHaveBeenCalledWith('report-1', organization)
  })

  it('forwards the organization to getPresentedForm()', async () => {
    await reportsController.getAttachmentsForReport(organization, 'report-1')
    expect(reportsService.getPresentedForm).toHaveBeenCalledWith('report-1', organization)
  })

  it('forwards the organization to getPresentedFormAttachment()', async () => {
    reportsService.getPresentedFormAttachment.mockResolvedValue({ id: 'attachment-1', data: '' })
    const res = { header: jest.fn(), send: jest.fn() } as any
    await reportsController.getAttachmentForReport(res, organization, 'report-1', 'attachment-1')
    expect(reportsService.getPresentedFormAttachment).toHaveBeenCalledWith('report-1', 'attachment-1', organization)
  })
})
