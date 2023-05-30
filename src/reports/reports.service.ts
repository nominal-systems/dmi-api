import { forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
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
import { ProviderResultUtils } from '../common/utils/provider-result-utils'

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
    const report = await this.reportsRepository.createQueryBuilder('report')
      .leftJoinAndSelect('report.patient', 'patient')
      .leftJoinAndSelect('report.testResultsSet', 'testResult')
      .leftJoinAndSelect('testResult.observations', 'observation')
      .where('report.id = :id', { id })
      .orderBy('testResult.seq', 'ASC')
      .addOrderBy('observation.seq', 'ASC')
      .getOne()

    if (report == null) {
      throw new NotFoundException(`Report '${id}' not found`)
    }

    return report
  }

  async registerForOrder (order: Order): Promise<Report> {
    const report = this.buildRegisteredReport(order)
    return await this.reportsRepository.save(report)
  }

  async findForOrder (
    orderId: string
  ): Promise<Report> {
    const report = await this.reportsRepository.createQueryBuilder('report')
      .innerJoinAndSelect(Order, 'order', 'report.order = order.id')
      .leftJoinAndSelect('report.patient', 'patient')
      .leftJoinAndSelect('report.testResultsSet', 'testResult')
      .leftJoinAndSelect('testResult.observations', 'observation')
      .where('order.id = :orderId', { orderId })
      .orderBy('testResult.seq', 'ASC')
      .addOrderBy('observation.seq', 'ASC')
      .getOne()

    if (report == null) {
      throw new NotFoundException(`Report for order '${orderId}' not found`)
    }

    return report
  }

  /**
   * Handles external results from a provider.
   *
   * Results can either:
   * - create new reports
   * - update existing reports
   * - create new orders (by fetching external orders)
   * - create new orders for orphan results
   * @param integrationId
   * @param results
   */
  async handleExternalResults ({
    integrationId,
    results
  }: ExternalResultEventData): Promise<void> {
    const integration = await this.integrationsService.findById(integrationId)
    const externalOrderIds = results.map(result => result.orderId).filter(Boolean)
    const orphanResults = results.filter(result => result.orderId === '' || result.orderId == null)

    const createdReports: Report[] = []
    const updatedReports: Report[] = []
    const createdOrders: Order[] = []

    // Update existing reports with new results
    const existingReports = await this.findReportsByExternalOrderIds(externalOrderIds)
    for (const report of existingReports) {
      const resultsForReport = results.filter(result => result.orderId === report.order.externalId)
      const updated = await this.updateReportResults(report, resultsForReport)
      if (updated) {
        updatedReports.push(report)
      }
    }

    // Create external orders
    const externalOrders: ExternalOrder[] = []
    const nonExistingReportExternalOrderIds = arrayDiff(externalOrderIds, existingReports.map(report => report.order.externalId))
    const nonExistingReportOrders = await this.ordersService.findOrdersByExternalIds(nonExistingReportExternalOrderIds)
    const nonExistingOrderExternalIds = arrayDiff(nonExistingReportExternalOrderIds, nonExistingReportOrders.map(order => order.externalId))
    for (const externalOrderId of nonExistingOrderExternalIds) {
      const externalOrder = await this.ordersService.getOrderFromProvider(externalOrderId, integration.providerConfiguration, integration.integrationOptions)
      if (externalOrder == null) {
        this.logger.warn(`Order from provider not found -> External ID: ${externalOrderId}`)
        continue
      }
      this.logger.debug(`Getting order from provider -> External ID: ${externalOrderId}`)
      const order = await this.ordersService.createExternalOrder(integrationId, externalOrder)
      createdOrders.push(order)
      const resultForOrder = results.filter(result => result.orderId === order.externalId)
      await this.ordersService.updateOrderStatusFromResults(order, resultForOrder[0])
      externalOrders.push(externalOrder)
    }

    // Create orders for orphan results
    const dummyOrders: Order[] = []
    for (const orphanResult of orphanResults) {
      const extractedOrder: Order = ProviderResultUtils.extractOrderFromOrphanResult(orphanResult, integrationId)
      const order = await this.ordersService.saveOrder(extractedOrder)
      dummyOrders.push(order)

      const report = new Report()
      report.order = order
      report.testResultsSet = []
      await this.updateReportResults(report, orphanResults)
      if (order.patient !== undefined) {
        report.patient = order.patient
      }
      createdReports.push(report)
    }

    // Notify about new orders
    for (const order of [...createdOrders, ...dummyOrders]) {
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

    this.logger.log(`external_results -> Got ${results.length} results from ${integration.providerConfiguration.providerId}: ${createdReports.length} reports created, ${updatedReports.length} reports updated, orders ${[...createdOrders, ...dummyOrders].length} orders created`)
  }

  async findReportsByExternalOrderIds (externalOrderIds: string[]): Promise<Report[]> {
    if (externalOrderIds.length === 0) return []
    return await this.reportsRepository.createQueryBuilder('report')
      .leftJoinAndSelect('report.order', 'order')
      .leftJoinAndSelect('order.veterinarian', 'veterinarian')
      .leftJoinAndSelect('report.patient', 'patient')
      .leftJoinAndSelect('patient.identifier', 'identifier')
      .leftJoinAndSelect('report.testResultsSet', 'testResult')
      .leftJoinAndSelect('testResult.observations', 'observation')
      .where('order.externalId IN (:...externalOrderIds)', { externalOrderIds })
      .orderBy('testResult.seq', 'ASC')
      .addOrderBy('observation.seq', 'ASC')
      .getMany()
  }

  async updateReportResults (
    report: Report,
    results: ProviderResult[]
  ): Promise<boolean> {
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
        existingTestResult.seq = providerTestResult.seq
        existingTestResult.status = testResultStatus
        existingTestResult.deviceId = providerTestResult.deviceId
        existingTestResult.notes = providerTestResult.notes
        this.updateTestResultObservations(existingTestResult, providerTestResult.items)
        updatedTestResults.push(existingTestResult)
      } else {
        const testResult = new TestResult()
        testResult.seq = providerTestResult.seq
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
    // Seq
    observation.seq = item.seq

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

  private printReport (
    report: Report,
    eventType: EventType
  ): void {
    console.log(`Order #${report.order.externalId} [${eventType}]`)
    for (const testResult of report.testResultsSet) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`  ${testResult.seq}. ${testResult.name}`)
      for (const observation of testResult.observations) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(`    ${observation.seq}. ${observation.name}`)
      }
    }
  }
}
