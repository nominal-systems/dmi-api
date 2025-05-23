import { forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { Report } from './entities/report.entity'
import { FindOneOfTypeOptions } from '../common/typings/find-one-of-type-options.interface'
import { Order } from '../orders/entities/order.entity'
import {
  Attachment,
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
import { isNullOrEmpty } from '../common/utils/shared.utils'
import { Attachment as AttachmentEntity } from '../common/entities/attachment.entity'
import { ExternalResultEventData } from '../common/typings/internal-event-data.interface'

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

  async findAll (
    options?: FindManyOptions<Report>
  ): Promise<Report[]> {
    return await this.reportsRepository.find(options)
  }

  async findOne (
    args: FindOneOfTypeOptions<Report>
  ): Promise<Report> {
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
      .leftJoinAndSelect('report.presentedFrom', 'presentedFrom')
      .where('report.id = :id', { id })
      .orderBy('testResult.seq', 'ASC')
      .addOrderBy('observation.seq', 'ASC')
      .getOne()

    if (report == null) {
      throw new NotFoundException(`Report '${id}' not found`)
    }

    return report
  }

  async registerForOrder (
    order: Order
  ): Promise<Report> {
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
    const externalOrderIds = [...new Set(
      results
        .filter(result => !isNullOrEmpty(result.orderId) && isNullOrEmpty(result.order))
        .map(result => result.orderId)
    )]
    const orphanResults = results
      .filter(result => isNullOrEmpty(result.orderId) || !isNullOrEmpty(result.order))
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
      try {
        const externalOrder = await this.ordersService.getOrderFromProvider(externalOrderId, integration.providerConfiguration, integration.integrationOptions)
        if (externalOrder == null) {
          this.logger.warn(`Order from provider not found -> External ID: ${externalOrderId}`)
          continue
        }
        this.logger.debug(`Getting order from provider -> External ID: ${externalOrderId}`)
        const order = await this.ordersService.createExternalOrder(integrationId, externalOrder)
        createdOrders.push(order)
        const resultForOrder = results.filter(result => result.orderId === order.externalId)
        await this.ordersService.updateOrderFromResults(order, resultForOrder[0])
        externalOrders.push(externalOrder)
      } catch (error) {
        this.logger.warn(`Order from provider not found -> External ID: ${externalOrderId}`)
      }
    }

    // Create orders for orphan results
    const dummyOrders: Order[] = []
    for (const orphanResult of orphanResults) {
      const extractedOrder: Order = ProviderResultUtils.extractOrderFromOrphanResult(orphanResult, integrationId)

      // Finding if order exists and saving order are done in parallel to improve performance.
      let order: Order | null
      try {
        order = await this.ordersService.findOneByExternalId(extractedOrder.externalId)
      } catch (err) {
        order = null
      }

      if (order == null) {
        order = await this.ordersService.saveOrder(extractedOrder)
        dummyOrders.push(order)
      }
      const patient = order.patient !== null ? order.patient : extractedOrder.patient
      let report = await this.findReportByExternalOrderId(order.externalId)
      if (report == null) {
        report = new Report()
        report.order = order
        report.testResultsSet = []
        report.patient = patient
        createdReports.push(report)
      } else {
        report.patient = patient
        updatedReports.push(report)
      }
      await this.updateReportResults(report, [orphanResult])
    }

    // Notify about new orders
    for (const order of [...createdOrders, ...dummyOrders]) {
      await this.eventsService.addEvent({
        namespace: EventNamespace.ORDERS,
        type: EventType.ORDER_CREATED,
        providerId: integration.providerConfiguration.providerId,
        practiceId: integration.practice.id,
        integrationId: integrationId,
        accessionId: order.requisitionId,
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
        providerId: integration.providerConfiguration.providerId,
        practiceId: integration.practice.id,
        integrationId: integrationId,
        accessionId: report.order?.requisitionId,
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
      delete report.presentedFrom
      await this.eventsService.addEvent({
        namespace: EventNamespace.REPORTS,
        type: EventType.REPORT_UPDATED,
        practiceId: integration.practice.id,
        providerId: integration.providerConfiguration.providerId,
        integrationId: integrationId,
        accessionId: report.order?.requisitionId,
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

  async findReportsByExternalOrderIds (
    externalOrderIds: string[]
  ): Promise<Report[]> {
    if (externalOrderIds.length === 0) return []
    return await this.reportsRepository.createQueryBuilder('report')
      .leftJoinAndSelect('report.order', 'order')
      .leftJoinAndSelect('order.veterinarian', 'veterinarian')
      .leftJoinAndSelect('order.patient', 'patient')
      .leftJoinAndSelect('order.client', 'client')
      .leftJoinAndSelect('client.identifier', 'clientIdentifier')
      .leftJoinAndSelect('veterinarian.identifier', 'veterinarianIdentifier')
      .leftJoinAndSelect('patient.identifier', 'identifier')
      .leftJoinAndSelect('report.testResultsSet', 'testResult')
      .leftJoinAndSelect('report.patient', 'reportPatient')
      .leftJoinAndSelect('reportPatient.identifier', 'reportPatientIdentifier')
      .leftJoinAndSelect('testResult.observations', 'observation')
      .where('order.externalId IN (:...externalOrderIds)', { externalOrderIds })
      .orderBy('testResult.seq', 'ASC')
      .addOrderBy('observation.seq', 'ASC')
      .getMany()
  }

  async findReportByExternalOrderId (
    externalOrderId: string
  ): Promise<Report | undefined> {
    const reports = await this.findReportsByExternalOrderIds([externalOrderId])
    if (reports.length === 1) {
      return reports[0]
    }

    return undefined
  }

  async updateReportResults (
    report: Report,
    results: ProviderResult[]
  ): Promise<boolean> {
    const providerTestResults = results
      // .filter(result => result.orderId === report.order.externalId)
      .map(result => result.testResults)
      .reduce((a, v) => a.concat(v), [])

    const resultsStatus = Array.from(new Set<string>(results.map(result => result.status)))
    const reportStatus = resultStatusMapper(resultsStatus[0])

    // Report PDF
    const pdfReport = results
      .filter(result => result.pdfReport !== undefined)
      .map(result => result.pdfReport)
      .reduce<any[]>((a, v) => a.concat(v), [])
    if (pdfReport.length > 0) {
      this.attachPdfReport(report, pdfReport)
    }

    // Build test results set
    const createdTestResults: TestResult[] = []
    const updatedTestResults: TestResult[] = []
    for (const providerTestResult of providerTestResults) {
      const providerTestResultItemStatus = Array.from(new Set<string>(providerTestResult.items.map(testResult => testResult.status)))
      const testResultStatus = testResultStatusMapper(providerTestResultItemStatus[0])
      if (providerTestResultItemStatus.length > 1) {
        this.logger.warn(`Multiple test result item status for test result '${providerTestResult.code}'`)
      }

      const existingTestResult = report.testResultsSet.find(testResult => testResult.code === providerTestResult.code && testResult.seq === providerTestResult.seq)

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

  public updateTestResultObservations (
    testResult: TestResult,
    items: ProviderTestResultItem[]
  ): void {
    const observationMap: Map<string, Observation> = new Map(
      testResult.observations.map(observation => [observation.code, observation])
    )
    const newObservationCodes = arrayDiff(items.map(item => item.code), Array.from(observationMap.keys()))

    // Update existing observations
    for (const existingObservationCode of observationMap.keys()) {
      const existingObservation = observationMap.get(existingObservationCode)
      const providerItems = items.filter(item => item.code === existingObservationCode)
      if (existingObservation === undefined || providerItems.length === 0) continue
      for (const providerItem of providerItems) {
        this.updateObservationValue(existingObservation, providerItem)
      }
    }

    // Create new observations
    const newObservations: Observation[] = []
    const newObservationCodesSet: Set<string> = new Set()

    for (const newObservationCode of newObservationCodes) {
      if (newObservationCodesSet.has(newObservationCode)) continue

      const filteredItems = items.filter(item => item.code === newObservationCode)

      if (filteredItems.length === 0) continue

      const observation = new Observation()
      for (const item of filteredItems) {
        observation.code = item.code
        observation.name = item.name
        this.updateObservationValue(observation, item)
        newObservationCodesSet.add(observation.code)
      }

      newObservations.push(observation)
    }

    testResult.observations = testResult.observations.concat(newObservations)
  }

  private updateObservationValue (
    observation: Observation,
    item: ProviderTestResultItem
  ): void {
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
    if (isNullOrEmpty(item.interpretation)) {
      delete observation.interpretation
    } else {
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

  private buildRegisteredReport (
    order: Order
  ): Report {
    const report = new Report()
    report.orderId = order.id
    report.order = order
    report.patient = order.patient
    report.status = ReportStatus.REGISTERED
    report.testResultsSet = []
    return report
  }

  public attachPdfReport (
    report: Report,
    pdfReport: Attachment[]
  ): void {
    report.presentedFrom = pdfReport.filter((attachment) => {
      return attachment.contentType !== undefined && attachment.data !== undefined
    }).map(attachment => {
      const attachmentEntity = new AttachmentEntity()
      if (attachment.contentType !== undefined && attachment.data !== undefined) {
        attachmentEntity.contentType = attachment.contentType
        attachmentEntity.data = attachment.data
      }
      return attachmentEntity
    })
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

  async getPresentedForm (
    reportId: string
  ): Promise<AttachmentEntity[]> {
    const report = await this.reportsRepository.createQueryBuilder('report')
      .leftJoinAndSelect('report.presentedFrom', 'presentedFrom')
      .where('report.id = :reportId', { reportId })
      .getOne()

    if (report === null || report === undefined) {
      throw new NotFoundException(`Report '${reportId}' not found`)
    }

    if (report.presentedFrom === null || report.presentedFrom === undefined) {
      throw new NotFoundException(`Presented form for report '${reportId}' not found`)
    }

    return report.presentedFrom
  }

  async getPresentedFormAttachment (
    reportId: string,
    attachmentId: string
  ): Promise<AttachmentEntity> {
    const report = await this.reportsRepository.createQueryBuilder('report')
      .leftJoinAndSelect('report.presentedFrom', 'presentedFrom')
      .where('report.id = :reportId', { reportId })
      .getOne()

    if (report == null || (report.presentedFrom == null)) {
      throw new NotFoundException(`Presented form for report '${reportId}' not found`)
    }

    const attachment = report.presentedFrom.find(att => att.id === attachmentId)
    if (attachment == null) {
      throw new NotFoundException(`Attachment '${attachmentId}' not found in presented form of report '${reportId}'`)
    }

    return attachment
  }
}
