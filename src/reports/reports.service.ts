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
import { TestResult } from './entities/test-result.entity'

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name)

  constructor (
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
    @InjectRepository(TestResult)
    private readonly testResultRepository: Repository<TestResult>,
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
    report.patient = order.patient
    report.status = ReportStatus.REGISTERED
    return await this.reportsRepository.save(report)
  }

  async findForOrder (orderId: string): Promise<Report> {
    const report = await this.reportsRepository.findOne({
      where: { orderId },
      relations: ['patient', 'testResultsSet']
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
      await this.updateReportResults(report, resultsForReport)
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
      relations: ['order', 'patient', 'testResultsSet']
    })
  }

  private async updateReportResults (report: Report, results: ProviderResult[]): Promise<void> {
    const providerTestResults = results
      .map(result => result.testResults)
      .reduce((a, v) => a.concat(v), [])

    // Build test results set
    const testResultsSet: TestResult[] = []
    for (const providerTestResult of providerTestResults) {
      const existingTest = report.testResultsSet.find(testResult => testResult.code === providerTestResult.code)
      if (existingTest != null) {
        // TODO(gb): merge?
      } else {
        const testResult = new TestResult()
        testResult.code = providerTestResult.code
        testResult.name = providerTestResult.name
        testResult.deviceId = providerTestResult.deviceId
        testResult.notes = providerTestResult.notes
        testResultsSet.push(testResult)
      }
    }
    report.testResultsSet = report.testResultsSet.concat(testResultsSet)

    // Update Report state
    const resultsStates = results.map(result => result.status)
    // TODO(gb): obtain overall state for Report

    await this.reportsRepository.save(report)
  }
}
