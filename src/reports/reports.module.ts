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
import { InternalEventLoggingModule } from '../internal-event-logging/internal-event-logging.module'
import { FEATURE_FLAG_PROVIDER } from '../feature-flags/feature-flag.interface'
import { StatsigFeatureFlagProvider } from '../feature-flags/statsig-feature-flag.provider'
import { EnvFeatureFlagProvider } from '../feature-flags/env-feature-flag.provider'

@Module({
  imports: [
    EventsModule,
    IntegrationsModule,
    InternalEventLoggingModule,
    forwardRef(() => OrdersModule),
    TypeOrmModule.forFeature([Report, TestResult, Observation])
  ],
  controllers: [ReportsController],
  providers: [
    ReportsService,
{
      provide: FEATURE_FLAG_PROVIDER,
      useClass: process.env.STATSIG_ENABLED === 'true' ? StatsigFeatureFlagProvider : EnvFeatureFlagProvider
    }
  ],
  exports: [ReportsService]
})
export class ReportsModule {}
