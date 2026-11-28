import {
  ForbiddenException,
  HttpException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityManager, FindManyOptions, In, Repository } from 'typeorm'
import { IntegrationsService } from '../integrations/integrations.service'
import { Integration } from '../integrations/entities/integration.entity'
import { CreateOrderDto } from './dtos/create-order.dto'
import { Order } from './entities/order.entity'
import { FindOneOfTypeOptions, toFindOneOptions } from '../common/typings/find-one-of-type-options.interface'
import { Organization } from '../organizations/entities/organization.entity'
import { ConfigService } from '@nestjs/config'
import ieMessageBuilder from '../common/utils/ieMessageBuilder'
import { EventsService } from '../events/services/events.service'
import { AddEventDto } from '../events/dto/add-event.dto'
import { EventData } from '../events/interfaces/event-data.interface'
import { OrderSearchQueryParams } from './dtos/order-search-queryparams.dto'
import { Test } from './entities/test.entity'
import {
  IntegrationOptions,
  Operation,
  Order as ExternalOrder,
  OrderCreatedResponse,
  OrderStatus,
  ProviderError,
  ProviderResult,
  Resource,
} from '@nominal-systems/dmi-engine-common'
import { orderUpdateKey, updateOrder } from '../common/utils/order-status.helper'
import { EventNamespace } from '../events/constants/event-namespace.enum'
import { EventType } from '../events/constants/event-type.enum'
import { ReportsService } from '../reports/reports.service'
import { Report } from '../reports/entities/report.entity'
import { ExternalOrderMapper } from './mappers/external-order.mapper'
import { ProviderResultUtils } from '../common/utils/provider-result-utils'
import { describeError } from '../common/utils/describe-error'
import { ProviderConfiguration } from '../providers/entities/provider-configuration.entity'
import { RefsService } from '../refs/refs.service'
import { Attachment } from '../common/entities/attachment.entity'
import { ProvidersService } from '../providers/services/providers.service'
import {
  ExternalOrdersEventData,
  ExternalResultEventData,
} from '../common/typings/internal-event-data.interface'
import { NamedLockService, orderLockKey } from '../common/services/named-lock.service'
import { isThrottledError } from '../common/utils/cosmos-throttling'
import { matchesStoredValue } from '../common/utils/matches-stored-value'
import { isNullOrEmpty } from '../common/utils/shared.utils'
import { createHash } from 'crypto'
import { CancellationTarget, cancellationNotSupported } from './cancellation-not-supported'

// Each EventData payload without the practice and order id, which addOrderEvent fills in
type OrderEventExtraData<T extends EventData = EventData> = T extends unknown
  ? Omit<T, 'practice' | 'orderId'>
  : never

interface OrderTestCancelOrAddParams {
  orderId: string
  tests: Test[]
  organizationId: string
}

// An order's stored manifest, without its data
interface StoredManifest {
  uri: string | null
  contentType: string | null
}

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name)
  private readonly nodeEnv: string | undefined

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Order) private readonly ordersRepository: Repository<Order>,
    @InjectRepository(Test) private readonly testsRepository: Repository<Test>,
    @Inject(ReportsService) private readonly reportsService: ReportsService,
    @Inject(IntegrationsService) private readonly integrationsService: IntegrationsService,
    @Inject(EventsService) private readonly eventsService: EventsService,
    @Inject(RefsService) private readonly refsService: RefsService,
    @Inject(ProvidersService) private readonly providersService: ProvidersService,
    @Inject(NamedLockService) private readonly namedLockService: NamedLockService,
    @Inject('ACTIVEMQ') private readonly client: ClientProxy,
  ) {
    this.nodeEnv = this.configService.get('nodeEnv')
  }

  async findAll(options?: FindManyOptions<Order>): Promise<Order[]> {
    return await this.ordersRepository.find(options)
  }

  // Resolve the repository to use for a find-or-create: when running inside a
  // NamedLockService critical section, the passed EntityManager is bound to the
  // connection that already holds the lock, so reusing it keeps the section on a
  // single pool connection instead of checking out a second one (issue #320).
  private orderRepo(manager?: EntityManager): Repository<Order> {
    return manager != null ? manager.getRepository(Order) : this.ordersRepository
  }

  async searchOrders(
    organizationId: string,
    {
      status,
      provider_id: providerId,
      date_start: dateStart,
      date_end: dateEnd,
    }: OrderSearchQueryParams,
  ): Promise<Order[]> {
    const qb = this.ordersRepository
      .createQueryBuilder('order')
      .leftJoin('order.integration', 'integration')
      .leftJoin('integration.providerConfiguration', 'providerConfiguration')
      .leftJoinAndSelect('order.patient', 'patient')
      .leftJoinAndSelect('patient.identifier', 'identifier')
      .leftJoinAndSelect('order.tests', 'tests')
      .where('providerConfiguration.organizationId = :organizationId', {
        organizationId,
      })

    if (status != null) {
      qb.andWhere('order.status LIKE :status', { status: `%${status}%` })
    }

    if (providerId != null) {
      qb.andWhere('providerConfiguration.providerId LIKE :providerId', {
        providerId: `%${providerId}%`,
      })
    }

    if (dateStart != null && dateEnd != null) {
      qb.andWhere('order.createdAt BETWEEN :dateStart AND :dateEnd', {
        dateStart,
        dateEnd,
      })
    } else if (dateStart != null && dateEnd == null) {
      qb.andWhere('order.createdAt > :dateStart', { dateStart })
    } else if (dateEnd != null) {
      qb.andWhere('order.createdAt < :dateEnd', { dateEnd })
    }

    return await qb.getMany()
  }

  async findOne(args: FindOneOfTypeOptions<Order>, manager?: EntityManager): Promise<Order> {
    const order = await this.orderRepo(manager).findOne(toFindOneOptions(args))

    if (order == null) {
      throw new NotFoundException('The order was not found')
    }

    return order
  }

  async getOrder(id: string, organization: Organization): Promise<Order> {
    const order = await this.findOne({
      id,
      options: {
        relations: [
          'patient',
          'patient.identifier',
          'client',
          'tests',
          'veterinarian',
          'integration',
          'integration.providerConfiguration',
          'manifest',
        ],
      },
    })

    const {
      integration: { providerConfiguration },
    } = order

    if (providerConfiguration.organizationId !== organization.id) {
      throw new ForbiddenException("You don't have access to this resource")
    }
    return order
  }

  async getOrderResults(
    organization: Organization,
    orderId: string,
    format: 'json' | 'pdf',
  ): Promise<any> {
    const {
      externalId,
      integration: { id: integrationId, providerConfiguration, integrationOptions },
    } = await this.findOne({
      id: orderId,
      options: {
        relations: ['integration', 'integration.providerConfiguration'],
      },
    })

    if (organization.id !== providerConfiguration.organizationId) {
      throw new ForbiddenException("You don't have permissions to do that")
    }

    const { message, messagePattern } = ieMessageBuilder(providerConfiguration.providerId, {
      resource: 'orders',
      operation: format === 'json' ? 'results' : 'results.pdf',
      data: {
        integrationId,
        payload: { id: externalId },
        integrationOptions,
        providerConfiguration: providerConfiguration.configurationOptions,
      },
    })

    return await this.client.send(messagePattern, message).toPromise()
  }

  async createOrder(
    organization: Organization,
    createOrderDto: CreateOrderDto,
    autoSubmitOrder = false,
  ): Promise<Order> {
    // Find integration
    const integration = await this.integrationsService.findOne({
      id: createOrderDto.integrationId,
      options: {
        relations: ['providerConfiguration', 'practice', 'practice.identifier'],
      },
    })
    const { providerConfiguration, integrationOptions } = integration
    const { configurationOptions, providerId } = providerConfiguration

    if (providerConfiguration.organizationId !== organization.id) {
      throw new ForbiddenException("You don't have access to this resource")
    }

    if (
      createOrderDto.labRequisitionInfo !== null &&
      createOrderDto.labRequisitionInfo !== undefined
    ) {
      await this.providersService.checkLabRequisitionParameters(
        providerId,
        createOrderDto.labRequisitionInfo,
      )
    }

    const order = this.ordersRepository.create(createOrderDto)

    const providerPatient = order.patient
    order.patient = await this.refsService.mapPatientReferences(order, providerPatient, providerId)
    const { sex, species, breed } = providerPatient

    order.status = OrderStatus.ACCEPTED

    // Create tests
    order.tests = []
    for (const test of createOrderDto.testCodes) {
      order.tests.push(await this.testsRepository.create(test))
    }
    // Save order
    const newOrder = await this.ordersRepository.save(order)
    await this.addOrderEvent(integration, order, EventNamespace.ORDERS, EventType.ORDER_CREATED, {
      order: newOrder,
    })
    try {
      if (this.nodeEnv === 'seed') return order

      const providerOrder = { ...order, patient: { ...order.patient, sex, species, breed } }

      // Send order to Engine
      const { message, messagePattern } = ieMessageBuilder(providerId, {
        resource: 'orders',
        operation: 'create',
        data: {
          integrationId: integration.id,
          payload: providerOrder,
          integrationOptions,
          providerConfiguration: configurationOptions,
          autoSubmitOrder,
        },
      })
      this.logger.log(`Sending '${messagePattern}' to '${providerId}' provider`)
      const response: OrderCreatedResponse = await this.client
        .send(messagePattern, message)
        .toPromise()
      Object.assign(order, response)
      order.status = response.status
    } catch (error) {
      this.logger.error(`Error sending order to ${providerId} provider`)
      order.status = OrderStatus.ERROR
      await this.ordersRepository.save(order)
      await this.addOrderEvent(integration, order, EventNamespace.ORDERS, EventType.ORDER_UPDATED, {
        status: order.status,
        order,
      })
      if (error.name === ProviderError.name) {
        error.response.message = `Error while trying to place an order with ${providerId}`
        throw error
      } else {
        throw new HttpException(error.response, error.status)
      }
    }

    // Update order
    await this.ordersRepository.save(order)
    await this.addOrderEvent(integration, order, EventNamespace.ORDERS, EventType.ORDER_UPDATED, {
      status: order.status,
      order,
    })

    // Register report
    const report = await this.reportsService.registerForOrder(order)
    await this.addOrderEvent(integration, order, EventNamespace.REPORTS, EventType.REPORT_CREATED, {
      reportId: report.id,
      report,
    })

    return order
  }

  // Records an order event best-effort: a failure to store or deliver it is logged, not thrown
  private async addOrderEvent(
    integration: Integration,
    order: Order,
    namespace: EventNamespace,
    type: EventType,
    extraData: OrderEventExtraData,
  ): Promise<void> {
    const eventDto: AddEventDto = {
      namespace,
      type,
      providerId: integration.providerConfiguration.providerId,
      practiceId: integration.practice.id,
      integrationId: integration.id,
      accessionId: order.requisitionId,
      data: { practice: integration.practice, orderId: order.id, ...extraData },
    }
    try {
      await this.eventsService.addEvent(eventDto)
    } catch (error) {
      const cause = isThrottledError(error) ? 'still throttled after retries' : 'unexpected error'
      this.logger.error(
        `Could not record or deliver the '${type}' event for order ${order.id} (accession ${order.requisitionId}, integration ${integration.id}), ${cause}: ${error?.message}`,
        error?.stack,
      )
    }
  }

  async cancelOrder(organization: Organization, orderId: string): Promise<void> {
    const order = await this.findOne({
      id: orderId,
      options: {
        relations: ['integration', 'integration.practice', 'integration.providerConfiguration'],
      },
    })
    const {
      externalId,
      integration: { id: integrationId, providerConfiguration, integrationOptions },
    } = order

    if (organization.id !== providerConfiguration.organizationId) {
      throw new ForbiddenException("You don't have permissions to do that")
    }

    const { configurationOptions, providerId } = providerConfiguration
    const { message, messagePattern } = ieMessageBuilder(providerId, {
      resource: 'orders',
      operation: 'cancel',
      data: {
        integrationId,
        providerConfiguration: configurationOptions,
        integrationOptions,
        payload: {
          id: externalId,
        },
      },
    })
    this.logger.log(`Sending '${messagePattern}' to '${providerId}' provider`)
    await this.sendCancellation(messagePattern, message, order, providerId, 'order')

    // TODO(gb): also mark as deleted in the DB?
    order.status = OrderStatus.CANCELLED
    const updatedOrder = await this.ordersRepository.save(order)
    await this.eventsService.addEvent({
      namespace: EventNamespace.ORDERS,
      type: EventType.ORDER_UPDATED,
      providerId,
      practiceId: order.integration.practice.id,
      integrationId: order.integration.id,
      accessionId: order.requisitionId,
      data: {
        practice: order.integration.practice,
        orderId: updatedOrder.id,
        status: updatedOrder.status,
        order: updatedOrder,
      },
    })
  }

  async addTestsToOrder({
    orderId,
    tests: newTests,
    organizationId,
  }: OrderTestCancelOrAddParams): Promise<Order> {
    const order = await this.findOne({
      options: {
        where: {
          id: orderId,
          integration: { providerConfiguration: { organizationId } },
        },
      },
    })

    const {
      externalId,
      integration: { id: integrationId, providerConfiguration, integrationOptions },
    } = order

    const { message, messagePattern } = ieMessageBuilder(providerConfiguration.providerId, {
      resource: 'orders',
      operation: 'tests.add',
      data: {
        integrationId,
        providerConfiguration: providerConfiguration.configurationOptions,
        integrationOptions,
        payload: {
          id: externalId,
          tests: newTests,
        },
      },
    })

    await this.client.send(messagePattern, message).toPromise()

    return await this.ordersRepository.save({
      ...order,
      tests: [...order.tests, ...newTests],
    })
  }

  async cancelOrderTests({
    orderId,
    tests,
    organizationId,
  }: OrderTestCancelOrAddParams): Promise<void> {
    const order = await this.findOne({
      options: {
        where: {
          id: orderId,
          integration: { providerConfiguration: { organizationId } },
        },
        relations: ['integration', 'integration.providerConfiguration', 'tests'],
      },
    })

    const {
      externalId,
      integration: { id: integrationId, providerConfiguration, integrationOptions },
    } = order

    const { message, messagePattern } = ieMessageBuilder(providerConfiguration.providerId, {
      resource: 'orders',
      operation: 'tests.cancel',
      data: {
        integrationId,
        providerConfiguration: providerConfiguration.configurationOptions,
        integrationOptions,
        payload: {
          id: externalId,
          tests,
        },
      },
    })

    await this.sendCancellation(
      messagePattern,
      message,
      order,
      providerConfiguration.providerId,
      'test',
    )

    await this.ordersRepository.save({
      ...order,
      tests: [...order.tests, ...tests],
    })
  }

  // Sends a cancel to the provider's engine. A provider that cannot cancel is answered 409 with the
  // CANCELLATION_NOT_SUPPORTED token (#304); any other failure is thrown as it came. Either way the caller
  // stops before the order is changed.
  private async sendCancellation(
    messagePattern: string,
    message: unknown,
    order: Order,
    providerId: string,
    target: CancellationTarget,
  ): Promise<void> {
    try {
      await this.client.send(messagePattern, message).toPromise()
    } catch (error) {
      const refusal = cancellationNotSupported(error, providerId, target)
      if (refusal === undefined) {
        throw error
      }
      const what = target === 'order' ? 'order' : 'a test on order'
      const said = JSON.stringify(error.response.message)
      this.logger.warn(
        `The provider '${providerId}' cannot cancel ${what} ${order.id} (accession ${order.requisitionId}): ${said}`,
      )
      throw refusal
    }
  }

  async handleExternalOrders({ integrationId, orders }: ExternalOrdersEventData): Promise<void> {
    const externalOrdersIds = orders.map((order) => order.externalId)

    // Handle existing orders
    const existingOrders = await this.findOrdersByExternalIds(externalOrdersIds, integrationId)
    const storedManifests = await this.findStoredManifests(
      existingOrders
        .filter((existingOrder) =>
          orders.some(
            (order) => order.externalId === existingOrder.externalId && order.manifest != null,
          ),
        )
        .map((existingOrder) => existingOrder.id),
    )
    const updatedOrders: Order[] = []
    // Orders a delivery left as they were: a provider redelivering what it sent before
    let unchangedOrders = 0
    for (const existingOrder of existingOrders) {
      const externalOrder = orders.find((order) => order.externalId === existingOrder.externalId)

      if (externalOrder == null) continue

      // Will only update existing order if a valid status change occurred
      let updated = updateOrder(existingOrder, externalOrder)
      if (externalOrder.manifest != null) {
        // The manifest the order already has is no update (issue #409). So the stored order form
        // is refreshed when the order is saved for another reason (its status or tests, say),
        // not on every delivery of it.
        existingOrder.manifest = externalOrder.manifest as any
        updated =
          updated ||
          !(await this.isStoredManifest(
            existingOrder.id,
            storedManifests.get(existingOrder.id),
            externalOrder.manifest,
          ))
      }

      if (updated) {
        updatedOrders.push(existingOrder)
      } else {
        unchangedOrders++
      }
    }

    // Handle non-existing orders
    const mapper = new ExternalOrderMapper()
    const existingOrdersExternalIds = existingOrders.map((order) => order.externalId)
    const existingOrdersRequisitionIds = existingOrders.map((order) => order.requisitionId)
    const nonExistingExternalOrders = orders.filter(
      (order) =>
        !existingOrdersExternalIds.includes(order.externalId) &&
        !existingOrdersRequisitionIds.includes(order.externalId),
    )

    // Nothing to do, return
    if (nonExistingExternalOrders.length === 0 && updatedOrders.length === 0) {
      const summary = `Got ${orders.length} external orders: 0 created, 0 updated, ${unchangedOrders} orders unchanged (integration ${integrationId})`
      // Orders a delivery left as they were are a provider redelivering them: keep that visible
      if (unchangedOrders > 0) {
        this.logger.log(summary)
      } else {
        this.logger.debug(summary)
      }
      return
    }

    // Looked up before the orders are saved, so that one that cannot be saved is logged with its provider
    const integration = await this.integrationsService.findById(integrationId)

    // One order that cannot be saved is logged and left out, and the rest of the batch is handled
    // without it. A throw out of this handler is not redelivered, so it would lose every order after
    // it, and the events of every order before it (issue #411).
    let failedOrders = 0

    const newOrders: Order[] = []
    for (const externalOrder of nonExistingExternalOrders) {
      try {
        // Serialize find-or-create per (integrationId, externalId) so a concurrent
        // external_results/external_orders handler can't insert the same order
        // twice (issue #320).
        const newOrder = await this.namedLockService.withLock(
          orderLockKey(integrationId, externalOrder.externalId),
          async (manager) => {
            // Re-check under the lock: the order may have been created between the
            // batch lookup above and here.
            let existing: Order | null = null
            try {
              existing = await this.findOneByExternalId(externalOrder.externalId, integrationId, manager)
            } catch (error) {
              // Only "not found" means missing: a transient error must leave this
              // order out instead of being treated as missing, which would insert a
              // duplicate of an order that may already exist (issue #320 review).
              if (!(error instanceof NotFoundException)) throw error
              existing = null
            }
            if (existing != null) {
              this.logger.debug(
                `Order ${externalOrder.externalId} was created concurrently, skipping creation`,
              )
              return null
            }
            const repo = this.orderRepo(manager)
            return await repo.save(repo.create(mapper.mapOrder(externalOrder, integrationId)))
          },
        )
        if (newOrder != null) {
          newOrders.push(newOrder)
        }
      } catch (error) {
        failedOrders++
        this.logOrderNotSaved(integration, externalOrder.externalId, 'create', error)
      }
    }

    // Notify about new orders
    for (const newOrder of newOrders) {
      await this.addOrderEvent(integration, newOrder, EventNamespace.ORDERS, EventType.ORDER_CREATED, {
        order: newOrder,
      })
    }

    // Notify about updated orders
    let savedUpdates = 0
    for (const order of updatedOrders) {
      let updatedOrder: Order
      try {
        // TODO(gb): make this more efficient by saving in batch
        updatedOrder = await this.ordersRepository.save(order)
      } catch (error) {
        failedOrders++
        this.logOrderNotSaved(integration, order.externalId, 'update', error)
        continue
      }
      savedUpdates++
      await this.addOrderEvent(integration, updatedOrder, EventNamespace.ORDERS, EventType.ORDER_UPDATED, {
        status: updatedOrder.status,
        order: updatedOrder,
      })
    }

    const failed = failedOrders > 0 ? `, ${failedOrders} failed` : ''
    const summary = `Got ${orders.length} external orders: ${newOrders.length} created, ${savedUpdates} updated, ${unchangedOrders} orders unchanged${failed} (${integration.providerConfiguration.providerId}, integration ${integrationId})`
    // A batch whose new orders were all created concurrently changed nothing: debug, as before.
    // Orders a delivery left as they were are a provider redelivering them: keep that visible
    if (newOrders.length === 0 && savedUpdates === 0 && failedOrders === 0 && unchangedOrders === 0) {
      this.logger.debug(summary)
    } else {
      this.logger.log(summary)
    }
  }

  // An order of an external_orders batch that cannot be saved: logged, and the batch goes on without it
  private logOrderNotSaved(
    integration: Integration,
    externalId: string,
    action: 'create' | 'update',
    error: unknown,
  ): void {
    // Whatever was thrown names the cause, an Error or not; only an Error has a stack
    const cause = error instanceof Error ? error.message : String(error)
    this.logger.error(
      `Could not ${action} order ${externalId} from ${integration.providerConfiguration.providerId} (integration ${integration.id}), left it out of the batch: ${cause}`,
      error instanceof Error ? error.stack : undefined,
    )
  }

  // Whether a delivered manifest is the one an order has (issue #409). The uri names the document,
  // and a provider may render it anew on every fetch, so with a uri on both sides the same uri and
  // content type make it the same manifest whatever its data. Without one, the data decides.
  private async isStoredManifest(
    orderId: string,
    stored: StoredManifest | undefined,
    delivered: NonNullable<ExternalOrder['manifest']>,
  ): Promise<boolean> {
    if (stored === undefined || !matchesStoredValue(stored.contentType, delivered.contentType)) {
      return false
    }
    if (!isNullOrEmpty(stored.uri) && !isNullOrEmpty(delivered.uri)) {
      return stored.uri === delivered.uri
    }
    const deliveredDigest =
      delivered.data == null ? null : createHash('sha256').update(delivered.data).digest('hex')
    return matchesStoredValue(await this.findStoredManifestDigest(orderId), deliveredDigest)
  }

  // The stored manifests of the given orders, without their data, a PDF
  private async findStoredManifests(orderIds: string[]): Promise<Map<string, StoredManifest>> {
    if (orderIds.length === 0) return new Map()
    const rows: Array<StoredManifest & { orderId: string }> = await this.ordersRepository
      .createQueryBuilder('order')
      .innerJoin('order.manifest', 'manifest')
      .select('order.id', 'orderId')
      .addSelect('manifest.uri', 'uri')
      .addSelect('manifest.contentType', 'contentType')
      .where('order.id IN (:...orderIds)', { orderIds })
      .getRawMany()
    return new Map(rows.map(({ orderId, ...manifest }) => [orderId, manifest]))
  }

  // The SHA-256 digest of an order's stored manifest data, computed by MySQL so no PDF is transferred
  private async findStoredManifestDigest(orderId: string): Promise<string | null> {
    const row: { dataDigest: string | null } | undefined = await this.ordersRepository
      .createQueryBuilder('order')
      .innerJoin('order.manifest', 'manifest')
      .select('SHA2(manifest.data, 256)', 'dataDigest')
      .where('order.id = :orderId', { orderId })
      .getRawOne()
    return row?.dataDigest ?? null
  }

  async handleExternalOrderResults({
    integrationId,
    results,
  }: ExternalResultEventData): Promise<void> {
    const integration = await this.integrationsService.findById(integrationId)
    const externalOrderIds = new Set<string>(
      results.map((result) => result.orderId).filter(Boolean),
    )

    const updatedOrders: Order[] = []
    let failedOrders = 0
    // Orders a result left as they were: a provider redelivering what it sent before
    let unchangedOrders = 0
    for (const externalOrderId of externalOrderIds) {
      const result = results.find((result) => result.orderId === externalOrderId)

      if (result == null) continue

      let order: Order | undefined
      try {
        order = await this.findOneByExternalId(externalOrderId, integrationId)

        // Validate that the existing order matches the incoming result data, and
        // that we are not reconciling into a stale orphan order whose externalId
        // (e.g. a placeholder "1" or a pet name typed as the ID) was reused for a
        // different episode beyond the match window (issue #307).
        if (result.order != null && order.patient?.name) {
          const extractedOrder = ProviderResultUtils.extractOrderFromOrphanResult(result, integrationId)
          const mismatch = !ProviderResultUtils.isMatchingOrder(order, extractedOrder)
          const staleReuse = ProviderResultUtils.isStaleOrphanMatch(order)
          if (mismatch || staleReuse) {
            const reason = mismatch ? 'patient/client mismatch' : 'stale orphan externalId reuse'
            this.logger.warn(`Skipping order update for ${order.id}: ${reason} (externalId=${externalOrderId})`)
            continue
          }
        }

        const updated = await this.updateOrderFromResults(order, result)
        if (updated) {
          updatedOrders.push(order)
          this.logger.debug(`Updated Order/${order.id} status to ${order.status}`)
        } else {
          unchangedOrders++
        }
      } catch (error) {
        if (error instanceof NotFoundException) {
          this.logger.debug(`Order ${externalOrderId} doesn't exist in the system`)
        } else {
          failedOrders++
          const orderRef = order != null ? ` (order ${order.id})` : ''
          this.logger.error(
            `Could not update the order with external ID ${externalOrderId}${orderRef} from its result (${integration.providerConfiguration.providerId}, integration ${integrationId}): ${describeError(error)}`,
            error instanceof Error ? error.stack : undefined,
          )
        }
      }
    }

    // Notify about updated orders
    for (const updatedOrder of updatedOrders) {
      await this.eventsService.addEvent({
        namespace: EventNamespace.ORDERS,
        type: EventType.ORDER_UPDATED,
        providerId: integration.providerConfiguration.providerId,
        practiceId: integration.practice.id,
        integrationId: integrationId,
        accessionId: updatedOrder.requisitionId,
        data: {
          practice: integration.practice,
          orderId: updatedOrder.id,
          status: updatedOrder.status,
          order: updatedOrder,
        },
      })
    }

    this.logger.log(
      `external_order_results -> Got ${results.length} results from ${integration.providerConfiguration.providerId}: ${updatedOrders.length} orders updated, ${unchangedOrders} orders unchanged${failedOrders > 0 ? `, ${failedOrders} orders failed` : ''} (integration ${integrationId})`,
    )
  }

  async getOrderReport(organization: Organization, orderId: string): Promise<Report> {
    return await this.reportsService.findForOrder(orderId, organization)
  }

  async getOrderManifest(organization: Organization, orderId: string): Promise<Attachment> {
    const order = await this.findOne({
      id: orderId,
      options: {
        relations: ['integration', 'integration.providerConfiguration', 'manifest'],
      },
    })
    if (order == null) {
      throw new NotFoundException('The order was not found')
    }
    let manifest = order.manifest
    if (manifest == null) {
      const {
        externalId,
        requisitionId,
        integration: { id: integrationId, providerConfiguration, integrationOptions },
      } = order

      if (providerConfiguration.organizationId !== organization.id) {
        throw new ForbiddenException("You don't have access to this resource")
      }

      const { configurationOptions, providerId } = providerConfiguration
      const { message, messagePattern } = ieMessageBuilder(providerId, {
        resource: EventNamespace.ORDERS,
        operation: Operation.Manifest,
        data: {
          integrationId,
          providerConfiguration: configurationOptions,
          integrationOptions,
          payload: {
            id: requisitionId,
            externalId: externalId,
          },
        },
      })
      this.logger.log(`Sending '${messagePattern}' to '${providerId}' provider`)
      manifest = await this.client.send(messagePattern, message).toPromise()
      order.manifest = manifest
      await this.ordersRepository.save(order)
    }
    return manifest
  }

  async findOneByExternalId(externalId: string, integrationId?: string, manager?: EntityManager): Promise<Order> {
    // Scope the lookup by integration when known so a colliding externalId at a
    // different OU can't be returned (issue #307). Callers without an
    // integration context (e.g. admin tooling) keep the global lookup.
    const scope = integrationId != null ? { integrationId } : {}
    return await this.findOne({
      options: {
        where: [
          { externalId: externalId, ...scope },
          { requisitionId: externalId, ...scope },
        ],
        relations: [
          'patient',
          'patient.identifier',
          'client',
          'veterinarian',
          'tests',
          'client.identifier',
        ],
      },
    }, manager)
  }

  async findOrdersByExternalIds(externalIds: string[], integrationId?: string): Promise<Order[]> {
    // Scope by integration when known so a colliding externalId at a different
    // OU can't cross-match another OU's orders (issues #307/#320). Callers
    // without an integration context (e.g. event logging) keep the global lookup.
    const scope = integrationId != null ? { integrationId } : {}
    return await this.findAll({
      relations: [
        'patient',
        'patient.identifier',
        'client',
        'veterinarian',
        'tests',
        'client.identifier',
      ],
      where: [
        { externalId: In(externalIds), ...scope },
        { requisitionId: In(externalIds), ...scope },
      ],
    })
  }

  async getOrderFromProvider(
    externalId: string,
    providerConfiguration: ProviderConfiguration,
    integrationOptions: IntegrationOptions,
    integrationId?: string,
  ): Promise<ExternalOrder> {
    this.logger.debug(`Getting order ${externalId} from ${providerConfiguration.providerId}`)
    const { message, messagePattern } = ieMessageBuilder(providerConfiguration.providerId, {
      resource: Resource.Orders,
      operation: Operation.Get,
      data: {
        integrationId,
        payload: { id: externalId },
        integrationOptions,
        providerConfiguration: providerConfiguration.configurationOptions,
      },
    })

    return await this.client.send(messagePattern, message).toPromise()
  }

  async createExternalOrder(integrationId, externalOrder: ExternalOrder, manager?: EntityManager): Promise<Order> {
    const repo = this.orderRepo(manager)
    const mapper = new ExternalOrderMapper()
    const createdOrders = repo.create(mapper.mapOrder(externalOrder, integrationId))
    return await repo.save(createdOrders)
  }

  async updateOrderFromResults(order: Order, result: ProviderResult): Promise<boolean> {
    const orderStatus = order.status
    const before = orderUpdateKey(order)
    ProviderResultUtils.setOrderStatusFromResult(result, order)

    if (result.order !== undefined) {
      updateOrder(order, result.order)
    }
    // Compare the order before and after both steps: the result's status can move the order to
    // a status its order then moves back from, which updateOrder alone sees as a change (issue #409)
    const updated = orderUpdateKey(order) !== before
    if (orderStatus !== order.status) {
      this.logger.debug(
        `updateOrderStatusFromResults: Order/${order.externalId} status changed from ${orderStatus} to ${order.status}`,
      )
    } else {
      this.logger.debug(
        `updateOrderStatusFromResults: Order/${order.externalId} status not changed. Current status: ${order.status}, result status: ${result.status}`,
      )
    }

    if (updated) {
      await this.ordersRepository.save(order)
    }
    return updated
  }

  extractOrderFromResult(result: ProviderResult): Order {
    const order = new Order()
    ProviderResultUtils.setOrderStatusFromResult(result, order)
    order.tests = ProviderResultUtils.extractTestsFromProviderResult(result)
    return order
  }

  async saveOrder(order: Order, manager?: EntityManager): Promise<Order> {
    const repo = this.orderRepo(manager)
    const createdOrder = repo.create(order)
    return await repo.save(createdOrder)
  }

  async countByProvider(start: Date, end: Date): Promise<any> {
    const qb = this.ordersRepository
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.integration', 'integration')
      .innerJoinAndSelect('integration.providerConfiguration', 'providerConfiguration')
      .select('YEAR(order.createdAt)', 'year')
      .addSelect('MONTH(order.createdAt)', 'month')
      .addSelect('DAY(order.createdAt)', 'day')
      .addSelect('HOUR(order.createdAt)', 'hour')
      .addSelect('providerConfiguration.providerId', 'provider')
      .addSelect('CAST(COUNT(1) AS UNSIGNED)', 'count')
      .where('order.createdAt BETWEEN :start AND :end', { start, end })
      .groupBy('year, month, day, hour, provider')
      .orderBy('year', 'DESC')
      .addOrderBy('month', 'DESC')
      .addOrderBy('day', 'DESC')
      .addOrderBy('hour', 'DESC')

    const results = await qb.getRawMany()

    return results.map((result) => ({
      ...result,
      count: parseInt(result.count),
    }))
  }
}
