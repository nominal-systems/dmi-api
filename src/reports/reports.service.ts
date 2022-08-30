import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, In, Repository } from 'typeorm'
import { Report } from './entities/report.entity'
import { FindOneOfTypeOptions } from '../common/typings/find-one-of-type-options.interface'
import { ExternalResultEventData } from '../common/typings/external-result-event-data.interface'
import { Order } from '../orders/entities/order.entity'
import { ProviderResult, ReportStatus } from '@nominal-systems/dmi-engine-common'
import { EventsService } from '../events/services/events.service'
import { EventNamespace } from '../events/constants/event-namespace.enum'
import { EventType } from '../events/constants/event-type.enum'

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name)

  constructor (
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
    @Inject(EventsService)
    private readonly eventsService: EventsService
  ) {}

  async findAll (options?: FindManyOptions<Report>): Promise<Report[]> {
    return await this.reportsRepository.find(options)
  }

  async findOne (args: FindOneOfTypeOptions<Report>): Promise<Report> {
    const report = await this.reportsRepository.findOne(args.id, args.options)

    if (report == null) {
      throw new NotFoundException('Report not found')
    }

    return report
  }

  async registerForOrder (order: Order): Promise<Report> {
    const report = new Report()
    report.orderId = order.id
    report.order = order
    report.status = ReportStatus.REGISTERED
    return await this.reportsRepository.save(report)
  }

  async findForOrder (orderId: string): Promise<Report> {
    const report = await this.reportsRepository.findOne({
     where: { orderId }
    })

    if (report == null) {
      throw new NotFoundException(`Report for order '${orderId}' not found`)
    }

    return report
  }

  async handleExternalResults ({
    integrationId,
    results
  }: ExternalResultEventData): Promise<void> {
    this.logger.log(`Got ${results.length} results from provider`)

    const externalOrderIds = results.map(result => result.orderId)
    const existingReports = await this.findReportsByExternalOrderIds(externalOrderIds)

    // Update existing reports with new results
    const updatedReports: Report[] = []
    for (const report of existingReports) {
      const resultsForReport = results.filter(result => result.orderId === report.order.externalId)
      this.updateReportResults(report, resultsForReport)
      updatedReports.push(report)
    }

    // Create new reports with unmatched results
    const createdReports: Report[] = []
    // TODO(gb): handle non-existing reports

    // Notify about new reports
    for (const report of createdReports) {
      await this.eventsService.addEvent({
        namespace: EventNamespace.REPORTS,
        type: EventType.REPORT_CREATED,
        integrationId: integrationId,
        data: {
          orderId: report.orderId,
          reportId: report.id,
          report: report
        }
      })
    }

    // Notify about updated reports
    for (const report of updatedReports) {
      await this.eventsService.addEvent({
        namespace: EventNamespace.REPORTS,
        type: EventType.REPORT_UPDATED,
        integrationId: integrationId,
        data: {
          orderId: report.orderId,
          reportId: report.id,
          report: report
        }
      })
    }

    // TODO(gb): Notify about results in existing orders
  }

  private async findReportsByExternalOrderIds (externalOrderIds: string[]): Promise<Report[]> {
    return await this.findAll({
      where: {
        order: {
          externalId: In(externalOrderIds)
        }
      },
      relations: ['order']
    })
  }

  private updateReportResults (report: Report, results: ProviderResult[]): void {
    console.log(`update results for report ${report.id} =>\n` + JSON.stringify(results, null, 2)) // TODO(gb): remove trace
  }
}
