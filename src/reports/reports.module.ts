import { forwardRef, Module } from '@nestjs/common'
import { ReportsService } from './reports.service'
import { ReportsController } from './reports.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Report } from './entities/report.entity'
import { EventsModule } from '../events/events.module'
import { TestResult } from './entities/test-result.entity'
import { Observation } from './entities/observation.entity'
import { IntegrationsModule } from '../integrations/integrations.module'
import { OrdersModule } from '../orders/orders.module'
import { InternalEventLoggingModule } from '../event-logging/internal-event-logging.module'

@Module({
  imports: [
    EventsModule,
    IntegrationsModule,
    InternalEventLoggingModule,
    forwardRef(() => OrdersModule),
    TypeOrmModule.forFeature([Report, TestResult, Observation])
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService]
})
export class ReportsModule {}
