import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { InternalEventLoggingService } from './internal-event-logging.service'

@Injectable()
export class InternalEventLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(InternalEventLoggingInterceptor.name)

  constructor (private readonly eventLoggingService: InternalEventLoggingService) {
  }

  intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextType = context.getType()

    // We only want to intercept microservice events (EventPattern)
    if (contextType === 'rpc') {
      const [payload, metadata] = context.getArgs()
      const handler = context.getClass()
      const handlerName = handler.name
      const methodName = context.getHandler().name
      const pattern = metadata?.getArgs()?.[0] || 'unknown'
      // TODO(gb): extract accessionIds from payload

      // Fire and forget - don't await or use the promise result
      this.eventLoggingService
        .logEvent(pattern, payload, handlerName, methodName)
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
}
