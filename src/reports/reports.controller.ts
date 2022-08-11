import { Controller } from '@nestjs/common'
import { ReportsService } from './reports.service'
import { EventPattern } from '@nestjs/microservices'
import { DisableGuards } from '../common/decorators/disable-guards.decorator'
import { ApiGuard } from '../common/guards/api.guard'
import { ExternalResultEventData } from '../common/typings/external-result-event-data.interface'

@Controller('reports')
export class ReportsController {
  constructor (private readonly reportsService: ReportsService) { }

  @EventPattern('external_results')
  @DisableGuards(ApiGuard)
  async handleExternalResults (data: ExternalResultEventData): Promise<void> {
    await this.reportsService.handleExternalResults(data)
  }
}
