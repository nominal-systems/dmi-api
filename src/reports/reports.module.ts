import { Module } from '@nestjs/common'
import { ReportsService } from './reports.service'
import { ReportsController } from './reports.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Report } from './entities/report.entity'
import { EventsModule } from '../events/events.module'
import { TestResult } from './entities/test-result.entity'

@Module({
  imports: [
    EventsModule,
    TypeOrmModule.forFeature([Report, TestResult])
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService]
})
export class ReportsModule {}
