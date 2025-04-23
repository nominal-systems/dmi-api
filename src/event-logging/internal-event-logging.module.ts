import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { InternalEventLoggingService } from './internal-event-logging.service'
import { InternalEventLoggingInterceptor } from './internal-event-logging.interceptor'
import { InternalEvent, InternalEventSchema } from './schemas/internal-event.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InternalEvent.name, schema: InternalEventSchema }
    ])
  ],
  providers: [InternalEventLoggingService, InternalEventLoggingInterceptor],
  exports: [InternalEventLoggingService, InternalEventLoggingInterceptor]
})
export class InternalEventLoggingModule {}
