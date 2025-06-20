import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'

import { OrdersController } from '../../src/orders/orders.controller'
import { OrdersService } from '../../src/orders/orders.service'
import { ApiGuard } from '../../src/common/guards/api.guard'
import {
  InternalEventLoggingInterceptor,
} from '../../src/internal-event-logging/internal-event-logging.interceptor'

describe('OrdersController events (e2e)', () => {
  let app: INestApplication
  const ordersServiceMock = {
    handleExternalOrders: jest.fn(),
    handleExternalOrderResults: jest.fn(),
  }

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{ provide: OrdersService, useValue: ordersServiceMock }],
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

  describe('handleExternalOrders()', () => {
    it('should forward external orders to the service', async () => {
      const payload = { integrationId: 'idexx', orders: [{ externalId: '1' }] } as any
      await app.get(OrdersController).handleExternalOrders(payload)
      expect(ordersServiceMock.handleExternalOrders).toHaveBeenCalledWith(payload)
    })
  })

  describe('handleExternalOrderResults()', () => {
    it('should forward external order results to the service', async () => {
      const payload = { integrationId: 'idexx', results: [{ orderId: '1' }] } as any
      await app.get(OrdersController).handleExternalOrderResults(payload)
      expect(ordersServiceMock.handleExternalOrderResults).toHaveBeenCalledWith(payload)
    })
  })

})
