import { forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, In, Repository } from 'typeorm'
import { Report } from './entities/report.entity'
import { FindOneOfTypeOptions } from '../common/typings/find-one-of-type-options.interface'
import { ExternalResultEventData } from '../common/typings/external-result-event-data.interface'
import { Order } from '../orders/entities/order.entity'
import {
  Order as ExternalOrder,
  ProviderResult,
  ProviderTestResultItem,
  ReportStatus
} from '@nominal-systems/dmi-engine-common'
import { EventsService } from '../events/services/events.service'
import { EventNamespace } from '../events/constants/event-namespace.enum'
import { EventType } from '../events/constants/event-type.enum'
import { TestResult } from './entities/test-result.entity'
import { Observation } from './entities/observation.entity'
import { IntegrationsService } from '../integrations/integrations.service'
import { arrayDiff } from '../common/utils/array-diff'
import { OrdersService } from '../orders/orders.service'
import { Organization } from '../organizations/entities/organization.entity'
import { resultStatusMapper, testResultStatusMapper } from '../common/utils/result-status.helper'

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name)

  constructor (
    @InjectRepository(Report) private readonly reportsRepository: Repository<Report>,
    @InjectRepository(TestResult) private readonly testResultRepository: Repository<TestResult>,
    @Inject(forwardRef(() => OrdersService)) private readonly ordersService: OrdersService,
    @Inject(IntegrationsService) private readonly integrationsService: IntegrationsService,
    @Inject(EventsService) private readonly eventsService: EventsService
  ) {
  }

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

  async getReport (
    id: string,
    organization: Organization
  ): Promise<Report> {
    // TODO(gb): actually check the user can access this report (i.e. belongs to the organization)
    return await this.findOne({
      id,
      options: {
        relations: [
          'patient',
          'testResultsSet',
          'testResultsSet.observations',
          'order'
        ]
      }
    })
  }

  async registerForOrder (order: Order): Promise<Report> {
    const report = this.buildRegisteredReport(order)
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
    const integration = await this.integrationsService.findById(integrationId)
    const externalOrderIds = results.map(result => result.orderId)

    // Update existing reports with new results
    const existingReports = await this.findReportsByExternalOrderIds(externalOrderIds)
    const updatedReports: Report[] = []
    for (const report of existingReports) {
      const resultsForReport = results.filter(result => result.orderId === report.order.externalId)
      const updated = await this.updateReportResults(report, resultsForReport)
      if (updated) {
        updatedReports.push(report)
      }
    }

    // Create non-existing orders
    const externalOrders: ExternalOrder[] = []
    const nonExistingReportExternalOrderIds = arrayDiff(externalOrderIds, existingReports.map(report => report.order.externalId))
    const nonExistingReportOrders = await this.ordersService.findOrdersByExternalIds(nonExistingReportExternalOrderIds)
    const nonExistingOrderExternalIds = arrayDiff(nonExistingReportExternalOrderIds, nonExistingReportOrders.map(order => order.externalId))
    for (const externalOrderId of nonExistingOrderExternalIds) {
      const externalOrder = await this.ordersService.getOrderFromProvider(externalOrderId, integration.providerConfiguration, integration.integrationOptions)
      externalOrders.push(externalOrder)
    }
    const createdOrders = await this.ordersService.createExternalOrders(integrationId, externalOrders)
    // TODO(gb): update order status?

    // Notify about new orders
    for (const order of createdOrders) {
      await this.eventsService.addEvent({
        namespace: EventNamespace.ORDERS,
        type: EventType.ORDER_CREATED,
        integrationId: integrationId,
        data: {
          practice: integration.practice,
          orderId: order.id,
          order: order
        }
      })
    }

    // Create new reports with unmatched results
    const createdReports: Report[] = []
    for (const order of [...nonExistingReportOrders, ...createdOrders]) {
      const report = this.buildRegisteredReport(order)
      const resultsForReport = results.filter(result => result.orderId === order.externalId)
      await this.updateReportResults(report, resultsForReport)
      createdReports.push(report)
    }

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

    this.logger.log(`Got ${results.length} results from provider. Reports: ${createdReports.length} created, ${updatedReports.length} updated. Orders: ${createdOrders.length} created`)
  }

  private async findReportsByExternalOrderIds (externalOrderIds: string[]): Promise<Report[]> {
    return await this.findAll({
      where: {
        order: {
          externalId: In(externalOrderIds)
        }
      },
      relations: ['order', 'order.veterinarian', 'patient', 'patient.identifier', 'testResultsSet', 'testResultsSet.observations']
    })
  }

  private async updateReportResults (report: Report, results: ProviderResult[]): Promise<boolean> {
    const providerTestResults = results
      .map(result => result.testResults)
      .reduce((a, v) => a.concat(v), [])

    const resultsStatus = Array.from(new Set<string>(results.map(result => result.status)))
    const reportStatus = resultStatusMapper(resultsStatus[0])

    // Build test results set
    const createdTestResults: TestResult[] = []
    const updatedTestResults: TestResult[] = []
    for (const providerTestResult of providerTestResults) {
      const providerTestResultItemStatus = Array.from(new Set<string>(providerTestResult.items.map(testResult => testResult.status)))
      const testResultStatus = testResultStatusMapper(providerTestResultItemStatus[0])
      if (providerTestResultItemStatus.length > 1) {
        this.logger.warn(`Multiple test result item status for test result '${providerTestResult.code}'`)
      }
      const existingTestResult = report.testResultsSet.find(testResult => testResult.code === providerTestResult.code)
      if (existingTestResult != null) {
        existingTestResult.status = testResultStatus
        existingTestResult.deviceId = providerTestResult.deviceId
        existingTestResult.notes = providerTestResult.notes
        this.updateTestResultObservations(existingTestResult, providerTestResult.items)
        updatedTestResults.push(existingTestResult)
      } else {
        const testResult = new TestResult()
        testResult.code = providerTestResult.code
        testResult.name = providerTestResult.name
        testResult.observations = []
        testResult.status = testResultStatus
        testResult.deviceId = providerTestResult.deviceId
        testResult.notes = providerTestResult.notes
        this.updateTestResultObservations(testResult, providerTestResult.items)
        createdTestResults.push(testResult)
      }
    }

    const updatePerformed = createdTestResults.concat(updatedTestResults).length > 0 || report.status !== reportStatus
    if (updatePerformed) {
      report.testResultsSet = report.testResultsSet.concat(createdTestResults)
      report.status = resultStatusMapper(reportStatus)
      await this.reportsRepository.save(report)
    }

    return updatePerformed
  }

  public updateTestResultObservations (testResult: TestResult, items: ProviderTestResultItem[]): void {
    const testResultObservationCodes = testResult.observations.map(observation => observation.code)
    const providerTestResultItemCodes = items.map(item => item.code)
    const newObservationCodes = arrayDiff(providerTestResultItemCodes, testResultObservationCodes)
    const existingObservationCodes = arrayDiff(providerTestResultItemCodes, newObservationCodes)

    // Update existing observations
    for (const existingObservationCode of existingObservationCodes) {
      const existingObservation = testResult.observations.find(observation => observation.code === existingObservationCode)
      const providerItem = items.find(item => item.code === existingObservationCode)
      if (existingObservation === undefined || providerItem === undefined) continue
      this.updateObservationValue(existingObservation, providerItem)
    }

    // Create new observations
    const newObservations: Observation[] = []
    for (const newObservationCode of newObservationCodes) {
      const item = items.find(item => item.code === newObservationCode)
      if (item === undefined) continue

      const observation = new Observation()
      observation.code = item.code
      observation.name = item.name
      this.updateObservationValue(observation, item)

      newObservations.push(observation)
    }

    testResult.observations = testResult.observations.concat(newObservations)
  }

  private updateObservationValue (observation: Observation, item: ProviderTestResultItem): void {
    // Status
    observation.status = item.status

    // ValueX
    if (item.valueQuantity != null) {
      observation.valueQuantity = item.valueQuantity
    } else if (item.valueString != null) {
      observation.valueString = item.valueString
    }

    // Reference Range
    if (item.referenceRange != null) {
      observation.referenceRange = item.referenceRange
    }

    // Interpretation
    if (item.interpretation != null) {
      observation.interpretation = {
        code: item.interpretation?.code,
        text: item.interpretation?.text
      }
    }

    // Notes
    if (item.notes != null) {
      observation.notes = item.notes
    }
  }

  private buildRegisteredReport (order: Order): Report {
    const report = new Report()
    report.orderId = order.id
    report.order = order
    report.patient = order.patient
    report.status = ReportStatus.REGISTERED
    report.testResultsSet = []
    return report
  }
}
