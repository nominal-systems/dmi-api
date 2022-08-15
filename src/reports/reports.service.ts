import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { Report } from './entities/report.entity'
import { FindOneOfTypeOptions } from '../common/typings/find-one-of-type-options.interface'
import { ExternalResultEventData } from '../common/typings/external-result-event-data.interface'
import { Order } from '../orders/entities/order.entity'
import { ReportStatus } from '../../../dmi-engine-common'

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name)

  constructor (
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>
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

    for (const result of results) {
      // Find report by external order id
      // Create report if it doesn't exist, merge otherwise
      // Notify accordingly
    }
  }
}
