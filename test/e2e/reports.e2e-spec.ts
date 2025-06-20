import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { ReportsController } from '../../src/reports/reports.controller'
import { ReportsService } from '../../src/reports/reports.service'
import { ApiGuard } from '../../src/common/guards/api.guard'
import { InternalEventLoggingInterceptor } from '../../src/internal-event-logging/internal-event-logging.interceptor'

describe('ReportsController events (e2e)', () => {
  let app: INestApplication
  const reportsServiceMock = {
    handleExternalResults: jest.fn(),
  }

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [{ provide: ReportsService, useValue: reportsServiceMock }],
    })
      .overrideGuard(ApiGuard)
      .useValue({ canActivate: () => true })
      .overrideInterceptor(InternalEventLoggingInterceptor)
      .useValue({ intercept: (_: any, next: any) => next.handle() })
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('handleExternalResults()', () => {
    it('should forward external results to the service', async () => {
      const payload = { integrationId: 'idexx', results: [{ orderId: '1' }] } as any
      await app.get(ReportsController).handleExternalResults(payload)
      expect(reportsServiceMock.handleExternalResults).toHaveBeenCalledWith(payload)
    })
  })
})
