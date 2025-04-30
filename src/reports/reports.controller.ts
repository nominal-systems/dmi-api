import { Controller, Get, Param, Res, UseInterceptors } from '@nestjs/common'
import { ReportsService } from './reports.service'
import { EventPattern } from '@nestjs/microservices'
import { DisableGuards } from '../common/decorators/disable-guards.decorator'
import { ApiGuard } from '../common/guards/api.guard'
import { Organization } from '../common/decorators/organization.decorator'
import { Organization as OrganizationEntity } from '../organizations/entities/organization.entity'
import { Report } from './entities/report.entity'
import { Attachment } from '@nominal-systems/dmi-engine-common'
import { Response } from 'express'
import { ExternalResultEventData } from '../common/typings/internal-event-data.interface'
import { InternalEventLoggingInterceptor } from '../event-logging/internal-event-logging.interceptor'

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

  @Get(':reportId/presentedForm')
  async getAttachmentsForReport (
    @Organization() organization: OrganizationEntity,
    @Param('reportId') reportId: string
  ): Promise<Attachment[]> {
    return await this.reportsService.getPresentedForm(reportId)
  }

  @Get(':reportId/presentedForm/:attachmentId')
  async getAttachmentForReport (
    @Res() res: Response,
    @Organization() organization: OrganizationEntity,
    @Param('reportId') reportId: string,
    @Param('attachmentId') attachmentId: string
  ): Promise<void> {
    const attachment = await this.reportsService.getPresentedFormAttachment(reportId, attachmentId)
    const contentType = attachment.contentType == null ? 'application/octet-stream' : attachment.contentType
    const data = Buffer.from(attachment.data, 'base64')

    res.header('Content-Disposition', `attachment; filename=${attachment.id}`)
    res.header('Content-Type', contentType)
    res.send(data)
  }

  @EventPattern('external_results')
  @UseInterceptors(InternalEventLoggingInterceptor)
  @DisableGuards(ApiGuard)
  async handleExternalResults (data: ExternalResultEventData): Promise<void> {
    await this.reportsService.handleExternalResults(data)
  }
}
