import { INestApplication, Logger } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { Test } from '@nestjs/testing'
import { ProviderError } from '@nominal-systems/dmi-engine-common'
import * as request from 'supertest'
import { ApiGuard } from '../common/guards/api.guard'
import { AllExceptionsFilter } from '../common/interceptors/all-exceptions.filter'
import { RpcExceptionInterceptor } from '../common/interceptors/rpc-exception.interceptor'
import { InternalEventLoggingInterceptor } from '../internal-event-logging/internal-event-logging.interceptor'
import { CANCELLATION_NOT_SUPPORTED, cancellationNotSupported } from './cancellation-not-supported'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'

// What the caller receives when the provider cannot cancel (#304): the two cancel routes, through the interceptor and
// the filter dmi-api answers every request with.
describe('Cancelling with a provider that cannot cancel (HTTP answer)', () => {
  // An engine's error reply arrives as parsed JSON, not as the class it was thrown as.
  const overTheWire = (error: unknown): any => JSON.parse(JSON.stringify(error))
  const providerError = (code: number, message: string, error: string[]): any =>
    overTheWire(new ProviderError({ provider: 'antech-v6', code, message, error }))

  const ordersServiceMock = {
    cancelOrder: jest.fn(),
    cancelOrderTests: jest.fn(),
  }
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        { provide: OrdersService, useValue: ordersServiceMock },
        { provide: APP_INTERCEPTOR, useClass: RpcExceptionInterceptor },
        { provide: APP_FILTER, useClass: AllExceptionsFilter },
      ],
    })
      .overrideGuard(ApiGuard)
      .useValue({ canActivate: () => true })
      .overrideInterceptor(InternalEventLoggingInterceptor)
      .useValue({ intercept: (_: any, next: any) => next.handle() })
      .compile()
    app = moduleFixture.createNestApplication({ logger: false })
    // What ApiGuard sets on an authenticated request
    app.use((req: any, _res: unknown, next: () => void) => {
      req.organization = { id: 'org-1' }
      next()
    })
    await app.init()
  })

  beforeEach(() => {
    jest.resetAllMocks()
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  afterAll(async () => {
    await app.close()
  })

  it('DELETE /orders/:id answers 409 with the token in errors and a sentence naming the provider', async () => {
    ordersServiceMock.cancelOrder.mockRejectedValue(
      cancellationNotSupported(
        providerError(501, 'Antech V6 API does not support cancelling orders.', [
          'Not Implemented',
        ]),
        'antech-v6',
        'order',
      ),
    )

    const response = await request(app.getHttpServer()).delete('/orders/order-1')

    expect(response.status).toEqual(409)
    expect(response.body).toEqual({
      statusCode: 409,
      message:
        'The provider antech-v6 does not support cancelling orders. The order was not cancelled.',
      errors: [CANCELLATION_NOT_SUPPORTED],
      path: '/orders/order-1',
      timestamp: expect.any(String),
    })
  })

  it('DELETE /orders/:id/tests/:testCode answers 409 with the same token', async () => {
    ordersServiceMock.cancelOrderTests.mockRejectedValue(
      cancellationNotSupported(
        providerError(501, 'Antech V6 API does not support cancelling individual tests.', [
          'Not Implemented',
        ]),
        'antech-v6',
        'test',
      ),
    )

    const response = await request(app.getHttpServer()).delete('/orders/order-1/tests/T2')

    expect(response.status).toEqual(409)
    expect(response.body).toEqual({
      statusCode: 409,
      message:
        'The provider antech-v6 does not support cancelling individual tests. The test was not cancelled.',
      errors: [CANCELLATION_NOT_SUPPORTED],
      path: '/orders/order-1/tests/T2',
      timestamp: expect.any(String),
    })
  })

  it("any other provider error on a cancel is answered as before: 400 with the provider's message", async () => {
    ordersServiceMock.cancelOrder.mockRejectedValue(
      providerError(500, 'Internal Server Error', [
        'A request to /orders failed with 500 status code.',
      ]),
    )

    const response = await request(app.getHttpServer()).delete('/orders/order-1')

    expect(response.status).toEqual(400)
    expect(response.body).toEqual(
      expect.objectContaining({
        statusCode: 400,
        message: 'Internal Server Error',
        errors: ['A request to /orders failed with 500 status code.'],
      }),
    )
  })
})
