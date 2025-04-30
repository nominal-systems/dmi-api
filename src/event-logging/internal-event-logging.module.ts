import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { InternalEventLoggingService } from './internal-event-logging.service'
import { InternalEventLoggingInterceptor } from './internal-event-logging.interceptor'
import { InternalEvent, InternalEventSchema } from './schemas/internal-event.schema'
import { OrdersModule } from '../orders/orders.module'

@Module({
  imports: [
    forwardRef(() => OrdersModule),
    MongooseModule.forFeature([
      { name: InternalEvent.name, schema: InternalEventSchema }
    ])
  ],
  providers: [InternalEventLoggingService, InternalEventLoggingInterceptor],
  exports: [InternalEventLoggingService, InternalEventLoggingInterceptor]
})
export class InternalEventLoggingModule {}
