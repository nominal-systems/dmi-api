import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { InternalEventLoggingService } from './internal-event-logging.service'
import { ExternalOrdersEventData, ExternalResultEventData } from '../common/typings/internal-event-data.interface'
import { OrdersService } from '../orders/orders.service'

@Injectable()
export class InternalEventLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(InternalEventLoggingInterceptor.name)

  constructor (
    private readonly eventLoggingService: InternalEventLoggingService,
    private readonly ordersService: OrdersService
  ) {
  }

  async intercept (context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const contextType = context.getType()

    // We only want to intercept microservice events (EventPattern)
    if (contextType === 'rpc') {
      const [payload, metadata] = context.getArgs()
      const handler = context.getClass()
      const handlerName = handler.name
      const methodName = context.getHandler().name
      const pattern = metadata?.getArgs()?.[0] || 'unknown'

      // Extract accession IDs
      const externalOrderIds = this.extractExternalIds(payload)
      const orders = await this.ordersService.findOrdersByExternalIds(externalOrderIds)
      const accessionIds = orders.map((order) => order.requisitionId).filter(Boolean)

      // Fire and forget - don't await or use the promise result
      this.eventLoggingService
        .logEvent(pattern, payload, accessionIds, handlerName, methodName)
        .catch((error) => {
          this.logger.error(
            `Error logging event payload: ${error.message}`,
            error.stack
          )
        })
    }

    // Continue with the normal execution flow
    return next.handle()
  }

  extractExternalIds (payload: any): string[] {
    let accessionIds: string[] = []

    if (this.isExternalOrdersEventData(payload)) {
      accessionIds = payload.orders.map((order: any) => order.externalId).filter(Boolean)
    } else if (this.isExternalResultEventData(payload)) {
      accessionIds = payload.results.map((result: any) => result.orderId).filter(Boolean)
    }

    return accessionIds
  }

  private isExternalOrdersEventData (payload: any): payload is ExternalOrdersEventData {
    return (
      payload &&
      typeof payload === 'object' &&
      'orders' in payload &&
      Array.isArray(payload.orders) &&
      payload.orders.every((order) => typeof order === 'object')
    )
  }

  private isExternalResultEventData (payload: any): payload is ExternalResultEventData {
    return (
      payload &&
      typeof payload === 'object' &&
      'results' in payload &&
      Array.isArray(payload.results) &&
      payload.results.every((result) => typeof result === 'object')
    )
  }
}
