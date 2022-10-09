import { Module } from '@nestjs/common'
import { ReportsService } from './reports.service'
import { ReportsController } from './reports.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Report } from './entities/report.entity'
import { EventsModule } from '../events/events.module'
import { TestResult } from './entities/test-result.entity'
import { Observation } from './entities/observation.entity'
import { IntegrationsModule } from '../integrations/integrations.module'

@Module({
  imports: [
    EventsModule,
    IntegrationsModule,
    TypeOrmModule.forFeature([Report, TestResult, Observation])
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService]
})
export class ReportsModule {}
