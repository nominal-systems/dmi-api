import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, In, Repository } from 'typeorm'
import { Report } from './entities/report.entity'
import { FindOneOfTypeOptions } from '../common/typings/find-one-of-type-options.interface'
import { ExternalResultEventData } from '../common/typings/external-result-event-data.interface'
import { Order } from '../orders/entities/order.entity'
import { ProviderResult, ReportStatus, ProviderTestResultItem } from '@nominal-systems/dmi-engine-common'
import { EventsService } from '../events/services/events.service'
import { EventNamespace } from '../events/constants/event-namespace.enum'
import { EventType } from '../events/constants/event-type.enum'
import { TestResult } from './entities/test-result.entity'
import { Observation } from './entities/observation.entity'
import { IntegrationsService } from '../integrations/integrations.service'

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name)

  constructor (
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
    @InjectRepository(TestResult)
    private readonly testResultRepository: Repository<TestResult>,
    @Inject(IntegrationsService)
    private readonly integrationsService: IntegrationsService,
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
      relations: ['patient', 'testResultsSet', 'testResultsSet.observations']
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
    const integration = await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['practice', 'practice.identifier']
      }
    })

    // Update existing reports with new results
    const updatedReports: Report[] = []
    for (const report of existingReports) {
      const resultsForReport = results.filter(result => result.orderId === report.order.externalId)
      const updated = await this.updateReportResults(report, resultsForReport)
      if (updated) {
        updatedReports.push(report)
      }
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
          practice: integration.practice,
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
          practice: integration.practice,
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
      relations: ['order', 'patient', 'patient.identifier', 'testResultsSet']
    })
  }

  private async updateReportResults (report: Report, results: ProviderResult[]): Promise<boolean> {
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
        await this.updateTestResultObservations(testResult, providerTestResult.items)
        testResultsSet.push(testResult)
      }
    }

    const updatePerformed = testResultsSet.length > 0
    if (updatePerformed) {
      report.testResultsSet = report.testResultsSet.concat(testResultsSet)
      // const resultsStates = results.map(result => result.status)
      // TODO(gb): update Report state
      await this.reportsRepository.save(report)
    }

    return updatePerformed
  }

  private async updateTestResultObservations (testResult: TestResult, items: ProviderTestResultItem[]): Promise<void> {
    const observations: Observation[] = []
    for (const item of items) {
      const observation = new Observation()
      observation.code = item.code
      observation.name = item.name
      observation.valueString = item.valueString
      observation.valueQuantity = item.valueQuantity
      observation.referenceRange = item.referenceRange
      observation.interpretation = {
        text: item.interpretation
      }
      observation.notes = item.notes
      observations.push(observation)
    }

    testResult.observations = observations
  }
}
