import { ForbiddenException, HttpException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, In, Repository, SelectQueryBuilder } from 'typeorm'
import { IntegrationsService } from '../integrations/integrations.service'
import { CreateOrderDto } from './dtos/create-order.dto'
import { Order } from './entities/order.entity'
import { FindOneOfTypeOptions } from '../common/typings/find-one-of-type-options.interface'
import { Organization } from '../organizations/entities/organization.entity'
import { ConfigService } from '@nestjs/config'
import ieMessageBuilder from '../common/utils/ieMessageBuilder'
import { ExternalOrdersEventData } from '../common/typings/external-order-event-data.interface'
import { EventsService } from '../events/services/events.service'
import { OrderSearchQueryParams } from './dtos/order-search-queryparams.dto'
import { Test } from './entities/test.entity'
import {
  IntegrationOptions,
  Operation,
  Order as ExternalOrder,
  OrderCreatedResponse,
  OrderStatus,
  ProviderResult,
  Resource,
  ProviderError
} from '@nominal-systems/dmi-engine-common'
import { updateOrder } from '../common/utils/order-status.helper'
import { EventNamespace } from '../events/constants/event-namespace.enum'
import { EventType } from '../events/constants/event-type.enum'
import { ReportsService } from '../reports/reports.service'
import { Report } from '../reports/entities/report.entity'
import { ExternalOrderMapper } from './mappers/external-order.mapper'
import { ExternalResultEventData } from '../common/typings/external-result-event-data.interface'
import { ProviderResultUtils } from '../common/utils/provider-result-utils'
import { ProviderConfiguration } from '../providers/entities/provider-configuration.entity'
import { RefsService } from '../refs/refs.service'
import { Patient } from './entities/patient.entity'
import { Attachment } from './entities/attachment.entity'

interface OrderTestCancelOrAddParams {
  orderId: string
  tests: Test[]
  organizationId: string
}

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name)
  private readonly nodeEnv: string | undefined

  constructor (
    private readonly configService: ConfigService,
    @InjectRepository(Order) private readonly ordersRepository: Repository<Order>,
    @InjectRepository(Test) private readonly testsRepository: Repository<Test>,
    @Inject(ReportsService) private readonly reportsService: ReportsService,
    @Inject(IntegrationsService) private readonly integrationsService: IntegrationsService,
    @Inject(EventsService) private readonly eventsService: EventsService,
    @Inject(RefsService) private readonly refsService: RefsService,
    @Inject('ACTIVEMQ') private readonly client: ClientProxy
  ) {
    this.nodeEnv = this.configService.get('nodeEnv')
  }

  async findAll (options?: FindManyOptions<Order>): Promise<Order[]> {
    return await this.ordersRepository.find(options)
  }

  async searchOrders (
    organizationId: string,
    {
      status,
      provider_id: providerId,
      date_start: dateStart,
      date_end: dateEnd
    }: OrderSearchQueryParams
  ): Promise<Order[]> {
    return await this.findAll({
      where: (qb: SelectQueryBuilder<Order>) => {
        qb.where('providerConfiguration.organizationId = :organizationId', {
          organizationId: organizationId
        })

        if (status != null) {
          qb.andWhere('order.status LIKE :status', {
            status: `%${status}%`
          })
        }

        if (providerId != null) {
          qb.andWhere(
            'providerConfiguration.providerId LIKE :providerId',
            { providerId: `%${providerId}%` }
          )
        }

        if (dateStart != null && dateEnd != null) {
          qb.andWhere('order.createdAt BETWEEN :dateStart AND :dateEnd', {
            dateStart,
            dateEnd
          })
        } else {
          if (dateStart != null && dateEnd == null) {
            qb.andWhere('order.createdAt > :dateStart', {
              dateStart
            })
          } else if (dateEnd != null) {
            qb.andWhere('order.createdAt < :dateEnd', {
              dateEnd
            })
          }
        }
      },
      join: {
        alias: 'order',
        leftJoin: {
          integration: 'order.integration',
          providerConfiguration: 'integration.providerConfiguration'
        }
      },
      relations: ['patient', 'patient.identifier', 'tests']
    })
  }

  async findOne (args: FindOneOfTypeOptions<Order>): Promise<Order> {
    const order = await this.ordersRepository.findOne(args.id, args.options)

    if (order == null) {
      throw new NotFoundException('The order was not found')
    }

    return order
  }

  async getOrder (id: string, organization: Organization): Promise<Order> {
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
          'manifest'
        ]
      }
    })

    const { integration: { providerConfiguration } } = order

    if (providerConfiguration.organizationId !== organization.id) {
      throw new ForbiddenException('You don\'t have access to this resource')
    }
    return order
  }

  async getOrderResults (
    organization: Organization,
    orderId: string,
    format: 'json' | 'pdf'
  ): Promise<any> {
    const {
      externalId,
      integration: { providerConfiguration, integrationOptions }
    } = await this.findOne({
      id: orderId,
      options: {
        relations: ['integration', 'integration.providerConfiguration']
      }
    })

    if (organization.id !== providerConfiguration.organizationId) {
      throw new ForbiddenException('You don\'t have permissions to do that')
    }

    const { message, messagePattern } = ieMessageBuilder(
      providerConfiguration.providerId,
      {
        resource: 'orders',
        operation: format === 'json' ? 'results' : 'results.pdf',
        data: {
          payload: { id: externalId },
          integrationOptions,
          providerConfiguration:
            providerConfiguration.configurationOptions
        }
      }
    )

    return await this.client.send(messagePattern, message).toPromise()
  }

  async createOrder (
    createOrderDto: CreateOrderDto,
    autoSubmitOrder = false
  ): Promise<Order> {
    // Find integration
    const integration = await this.integrationsService.findOne({
      id: createOrderDto.integrationId,
      options: {
        relations: ['providerConfiguration', 'practice', 'practice.identifier']
      }
    })
    const { providerConfiguration, integrationOptions } = integration
    const { configurationOptions, providerId } = providerConfiguration

    const order = this.ordersRepository.create(createOrderDto)

    // Map patient references
    const providerPatient = { ...order.patient } as Patient
    const patient = await this.refsService.mapPatientReferences(order, providerPatient, providerId)
    order.patient = patient

    order.status = OrderStatus.ACCEPTED

    // Create tests
    order.tests = []
    for (const test of createOrderDto.testCodes) {
      order.tests.push(await this.testsRepository.create(test))
    }
    // Save order
    const newOrder = await this.ordersRepository.save(order)
    await this.eventsService.addEvent({
      namespace: EventNamespace.ORDERS,
      type: EventType.ORDER_CREATED,
      integrationId: integration.id,
      data: {
        practice: integration.practice,
        orderId: order.id,
        order: newOrder
      }
    })
    try {
      if (this.nodeEnv === 'seed') return order

      const providerOrder = { ...order, patient: providerPatient } as Order
      // Send order to Engine
      const { message, messagePattern } = ieMessageBuilder(
        providerId,
        {
          resource: 'orders',
          operation: 'create',
          data: {
            payload: providerOrder,
            integrationOptions,
            providerConfiguration: configurationOptions,
            autoSubmitOrder
          }
        }
      )
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
      await this.eventsService.addEvent({
        namespace: EventNamespace.ORDERS,
        type: EventType.ORDER_UPDATED,
        integrationId: integration.id,
        data: {
          practice: integration.practice,
          orderId: order.id,
          status: order.status,
          order: order
        }
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
    await this.eventsService.addEvent({
      namespace: EventNamespace.ORDERS,
      type: EventType.ORDER_UPDATED,
      integrationId: integration.id,
      data: {
        practice: integration.practice,
        orderId: order.id,
        status: order.status,
        order: order
      }
    })

    // Register report
    const report = await this.reportsService.registerForOrder(order)
    await this.eventsService.addEvent({
      namespace: EventNamespace.REPORTS,
      type: EventType.REPORT_CREATED,
      integrationId: integration.id,
      data: {
        practice: integration.practice,
        orderId: order.id,
        reportId: report.id,
        report: report
      }
    })

    return order
  }

  async cancelOrder (
    organization: Organization,
    orderId: string
  ): Promise<void> {
    const order = await this.findOne({
      id: orderId,
      options: {
        relations: ['integration', 'integration.practice', 'integration.providerConfiguration']
      }
    })
    const {
      externalId,
      integration: { providerConfiguration, integrationOptions }
    } = order

    if (organization.id !== providerConfiguration.organizationId) {
      throw new ForbiddenException('You don\'t have permissions to do that')
    }

    const { configurationOptions, providerId } = providerConfiguration
    const { message, messagePattern } = ieMessageBuilder(
      providerId,
      {
        resource: 'orders',
        operation: 'cancel',
        data: {
          providerConfiguration: configurationOptions,
          integrationOptions,
          payload: {
            id: externalId
          }
        }
      }
    )
    this.logger.log(`Sending '${messagePattern}' to '${providerId}' provider`)
    await this.client.send(messagePattern, message).toPromise()

    // TODO(gb): also mark as deleted in the DB?
    order.status = OrderStatus.CANCELLED
    const updatedOrder = await this.ordersRepository.save(order)
    await this.eventsService.addEvent({
      namespace: EventNamespace.ORDERS,
      type: EventType.ORDER_UPDATED,
      integrationId: order.integration.id,
      data: {
        practice: order.integration.practice,
        orderId: updatedOrder.id,
        status: updatedOrder.status,
        order: updatedOrder
      }
    })
  }

  async addTestsToOrder ({
    orderId,
    tests: newTests,
    organizationId
  }: OrderTestCancelOrAddParams): Promise<Order> {
    const order = await this.findOne({
      options: {
        where: (qb: SelectQueryBuilder<Order>) => {
          qb.where('order.id = :orderId', { orderId }).andWhere(
            'providerConfiguration.organizationId = :organizationId',
            {
              organizationId
            }
          )
        },
        join: {
          alias: 'order',
          leftJoin: {
            integration: 'order.integration',
            providerConfiguration: 'integration.providerConfiguration'
          }
        }
      }
    })

    const {
      externalId,
      integration: { providerConfiguration, integrationOptions }
    } = order

    const { message, messagePattern } = ieMessageBuilder(
      providerConfiguration.providerId,
      {
        resource: 'orders',
        operation: 'tests.add',
        data: {
          providerConfiguration:
            providerConfiguration.configurationOptions,
          integrationOptions,
          payload: {
            id: externalId,
            tests: newTests
          }
        }
      }
    )

    await this.client.send(messagePattern, message).toPromise()

    return await this.ordersRepository.save({
      ...order,
      tests: [...order.tests, ...newTests]
    })
  }

  async cancelOrderTests ({
    orderId,
    tests,
    organizationId
  }: OrderTestCancelOrAddParams): Promise<void> {
    const order = await this.findOne({
      options: {
        where: (qb: SelectQueryBuilder<Order>) => {
          qb.where('order.id = :orderId', { orderId }).andWhere(
            'providerConfiguration.organizationId = :organizationId',
            {
              organizationId
            }
          )
        },
        join: {
          alias: 'order',
          leftJoinAndSelect: {
            integration: 'order.integration',
            providerConfiguration: 'integration.providerConfiguration',
            tests: 'order.tests'
          }
        }
      }
    })

    const {
      externalId,
      integration: { providerConfiguration, integrationOptions }
    } = order

    const { message, messagePattern } = ieMessageBuilder(
      providerConfiguration.providerId,
      {
        resource: 'orders',
        operation: 'tests.cancel',
        data: {
          providerConfiguration:
            providerConfiguration.configurationOptions,
          integrationOptions,
          payload: {
            id: externalId,
            tests
          }
        }
      }
    )

    await this.client.send(messagePattern, message).toPromise()

    await this.ordersRepository.save({
      ...order,
      tests: [...order.tests, ...tests]
    })
  }

  async handleExternalOrders ({
    integrationId,
    orders
  }: ExternalOrdersEventData): Promise<void> {
    const externalOrdersIds = orders.map(order => order.externalId)

    // Handle existing orders
    const existingOrders = await this.findOrdersByExternalIds(externalOrdersIds)
    const updatedOrders: Order[] = []
    for (const existingOrder of existingOrders) {
      const externalOrder = orders.find(
        order => order.externalId === existingOrder.externalId
      )

      if (externalOrder == null) continue

      // Will only update existing order if a valid status change occurred
      if (updateOrder(existingOrder, externalOrder)) {
        updatedOrders.push(existingOrder)
      }
    }

    // Handle non-existing orders
    const mapper = new ExternalOrderMapper()
    const existingOrdersExternalIds = existingOrders.map(order => order.externalId)
    const nonExistingOrders = orders
      .filter(order => !existingOrdersExternalIds.includes(order.externalId))
      .map(order => mapper.mapOrder(order, integrationId))
    const newOrders = this.ordersRepository.create(nonExistingOrders)
    const allOrders = [...newOrders, ...updatedOrders]

    // Nothing to do, return
    if (allOrders.length === 0) {
      this.logger.debug(`Got ${orders.length} external orders: 0 created, 0 updated`)
      return
    }

    // Notify about new orders
    const integration = await this.integrationsService.findById(integrationId)
    for (const order of newOrders) {
      // TODO(gb): make this more efficient by saving in batch
      const newOrder = await this.ordersRepository.save(order)
      await this.eventsService.addEvent({
        namespace: EventNamespace.ORDERS,
        type: EventType.ORDER_CREATED,
        integrationId: integrationId,
        data: {
          practice: integration.practice,
          orderId: newOrder.id,
          order: newOrder
        }
      })
    }

    // Notify about updated orders
    for (const order of updatedOrders) {
      // TODO(gb): make this more efficient by saving in batch
      const updatedOrder = await this.ordersRepository.save(order)
      await this.eventsService.addEvent({
        namespace: EventNamespace.ORDERS,
        type: EventType.ORDER_UPDATED,
        integrationId: integrationId,
        data: {
          practice: integration.practice,
          orderId: updatedOrder.id,
          status: updatedOrder.status,
          order: updatedOrder
        }
      })
    }

    this.logger.log(`Got ${orders.length} external orders: ${newOrders.length} created, ${updatedOrders.length} updated`)
  }

  async handleExternalOrderResults ({
    integrationId,
    results
  }: ExternalResultEventData): Promise<void> {
    const integration = await this.integrationsService.findById(integrationId)
    const externalOrderIds = new Set<string>(results.map(result => result.orderId).filter(Boolean))

    const updatedOrders: Order[] = []
    for (const externalOrderId of externalOrderIds) {
      const result = results.find(result => result.orderId === externalOrderId)

      if (result == null) continue

      try {
        const order = await this.findOneByExternalId(externalOrderId)
        const updated = await this.updateOrderFromResults(order, result)
        if (updated) {
          updatedOrders.push(order)
          this.logger.debug(`Updated Order/${order.id} status to ${order.status}`)
        }
      } catch (error) {
        if (error.status === 404) {
          this.logger.debug(`Order ${externalOrderId} doesn't exist in the system`)
        }
      }
    }

    // Notify about updated orders
    for (const updatedOrder of updatedOrders) {
      await this.eventsService.addEvent({
        namespace: EventNamespace.ORDERS,
        type: EventType.ORDER_UPDATED,
        integrationId: integrationId,
        data: {
          practice: integration.practice,
          orderId: updatedOrder.id,
          status: updatedOrder.status,
          order: updatedOrder
        }
      })
    }

    this.logger.log(`external_order_results -> Got ${results.length} results from ${integration.providerConfiguration.providerId}: ${updatedOrders.length} orders updated`)
  }

  async getOrderReport (
    organization: Organization,
    orderId: string
  ): Promise<Report> {
    return await this.reportsService.findForOrder(orderId)
  }

  async getOrderManifest (
    organization: Organization,
    orderId: string
  ): Promise<Attachment> {
    const order = await this.findOne({
      id: orderId,
      options: {
        relations: [
          'integration',
          'integration.providerConfiguration',
          'manifest'
        ]
      }
    })
    if (order == null) {
      throw new NotFoundException('The order was not found')
    }
    let manifest = order.manifest
    if (manifest == null) {
      const {
        externalId,
        requisitionId,
        integration: { providerConfiguration, integrationOptions }
      } = order

      if (providerConfiguration.organizationId !== organization.id) {
        throw new ForbiddenException('You don\'t have access to this resource')
      }

      const { configurationOptions, providerId } = providerConfiguration
      const { message, messagePattern } = ieMessageBuilder(
        providerId,
        {
          resource: EventNamespace.ORDERS,
          operation: Operation.Manifest,
          data: {
            providerConfiguration: configurationOptions,
            integrationOptions,
            payload: {
              id: requisitionId,
              externalId: externalId
            }
          }
        }
      )
      this.logger.log(`Sending '${messagePattern}' to '${providerId}' provider`)
      manifest = await this.client.send(messagePattern, message).toPromise()
      order.manifest = manifest
      await this.ordersRepository.save(order)
    }
    return manifest
  }

  async findOneByExternalId (
    externalId: string
  ): Promise<Order> {
    return await this.findOne({
      options: {
        where: {
          externalId: externalId
        },
        relations: ['patient', 'patient.identifier', 'client', 'veterinarian', 'tests']
      }
    })
  }

  async findOrdersByExternalIds (
    externalIds: string[]
  ): Promise<Order[]> {
    return await this.findAll({
      relations: ['patient', 'patient.identifier', 'client', 'veterinarian', 'tests'],
      where: {
        externalId: In(externalIds)
      }
    })
  }

  async getOrderFromProvider (
    externalId: string,
    providerConfiguration: ProviderConfiguration,
    integrationOptions: IntegrationOptions
  ): Promise<ExternalOrder> {
    this.logger.debug(`Getting order ${externalId} from ${providerConfiguration.providerId}`)
    const { message, messagePattern } = ieMessageBuilder(
      providerConfiguration.providerId,
      {
        resource: Resource.Orders,
        operation: Operation.Get,
        data: {
          payload: { id: externalId },
          integrationOptions,
          providerConfiguration: providerConfiguration.configurationOptions
        }
      }
    )

    return await this.client
      .send(messagePattern, message)
      .toPromise()
  }

  async createExternalOrder (
    integrationId,
    externalOrder: ExternalOrder
  ): Promise<Order> {
    const mapper = new ExternalOrderMapper()
    const createdOrders = this.ordersRepository.create(mapper.mapOrder(externalOrder, integrationId))
    return await this.ordersRepository.save(createdOrders)
  }

  async updateOrderFromResults (
    order: Order,
    result: ProviderResult
  ): Promise<boolean> {
    const orderStatus = order.status
    ProviderResultUtils.setOrderStatusFromResult(result, order)

    let updated = false
    if (result.order !== undefined) {
      updated = updateOrder(order, result.order)
    }
    if (orderStatus !== order.status) {
      this.logger.debug(`updateOrderStatusFromResults: Order/${order.externalId} status changed from ${orderStatus} to ${order.status}`)
      updated = true
    } else {
      this.logger.debug(`updateOrderStatusFromResults: Order/${order.externalId} status not changed. Current status: ${order.status}, result status: ${result.status}`)
    }

    await this.ordersRepository.save(order)
    return updated
  }

  extractOrderFromResult (
    result: ProviderResult
  ): Order {
    const order = new Order()
    ProviderResultUtils.setOrderStatusFromResult(result, order)
    order.tests = ProviderResultUtils.extractTestsFromProviderResult(result)
    return order
  }

  async saveOrder (
    order: Order
  ): Promise<Order> {
    const createdOrder = this.ordersRepository.create(order)
    return await this.ordersRepository.save(createdOrder)
  }
}
