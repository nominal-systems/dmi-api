import { Controller, Get, Param } from '@nestjs/common'
import { ReportsService } from './reports.service'
import { EventPattern } from '@nestjs/microservices'
import { DisableGuards } from '../common/decorators/disable-guards.decorator'
import { ApiGuard } from '../common/guards/api.guard'
import { ExternalResultEventData } from '../common/typings/external-result-event-data.interface'
import { Organization } from '../common/decorators/organization.decorator'
import { Organization as OrganizationEntity } from '../organizations/entities/organization.entity'
import { Report } from './entities/report.entity'

@Controller('reports')
export class ReportsController {
  constructor (private readonly reportsService: ReportsService) {
  }

  @Get(':id')
  async getReport (
    @Organization() organization: OrganizationEntity,
    @Param('id') id: string
  ): Promise<Report> {
    return await this.reportsService.getReport(id, organization)
  }

  @EventPattern('external_results')
  @DisableGuards(ApiGuard)
  async handleExternalResults (data: ExternalResultEventData): Promise<void> {
    await this.reportsService.handleExternalResults(data)
  }
}
