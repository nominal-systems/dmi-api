import { ForbiddenException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
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
import { OrderCreatedResponse, OrderStatus } from '@nominal-systems/dmi-engine-common'
import { externalOrderStatusMapper } from '../common/utils/order-status-map.helper'
import { EventNamespace } from '../events/constants/event-namespace.enum'
import { EventType } from '../events/constants/event-type.enum'
import { ReportsService } from '../reports/reports.service'
import { Report } from '../reports/entities/report.entity'

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
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(Test)
    private readonly testsRepository: Repository<Test>,
    @Inject(ReportsService)
    private readonly reportsService: ReportsService,
    @Inject(IntegrationsService)
    private readonly integrationsService: IntegrationsService,
    @Inject(EventsService)
    private readonly eventsService: EventsService,
    @Inject('ACTIVEMQ')
    private readonly client: ClientProxy
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
      relations: ['patient', 'patient.identifier']
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
          'integration.providerConfiguration'
        ]
      }
    })

    const {
      externalId,
      manifestUri,
      integration: { providerConfiguration, integrationOptions }
    } = order

    if (providerConfiguration.organizationId !== organization.id) {
      throw new ForbiddenException("You don't have access to this resource")
    }

    if (manifestUri == null) {
      const { message, messagePattern } = ieMessageBuilder(
        providerConfiguration.providerId,
        {
          resource: 'orders',
          operation: 'get',
          data: {
            payload: { id: externalId },
            integrationOptions,
            providerConfiguration:
            providerConfiguration.configurationOptions
          }
        }
      )

      const response = await this.client
        .send(messagePattern, message)
        .toPromise()

      if (response.manifestUri != null || response.status !== order.status) {
        Object.assign(order, response)

        await this.ordersRepository.save(order)
      }
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
      throw new ForbiddenException("You don't have permissions to do that")
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

  async createOrder (createOrderDto: CreateOrderDto): Promise<Order> {
    // Find integration
    const integration = await this.integrationsService.findOne({
      id: createOrderDto.integrationId,
      options: {
        relations: ['providerConfiguration']
      }
    })

    // Accept order
    const order = this.ordersRepository.create(createOrderDto)
    order.status = OrderStatus.ACCEPTED

    // Create tests
    order.tests = []
    for (const test of createOrderDto.testCodes) {
      order.tests.push(await this.testsRepository.create(test))
    }

    // Save order
    await this.ordersRepository.save(order)
    await this.eventsService.addEvent({
      namespace: EventNamespace.ORDERS,
      type: EventType.ORDER_CREATED,
      integrationId: integration.id,
      data: {
        orderId: order.id,
        order: order
      }
    })

    const { providerConfiguration, integrationOptions } = integration
    const { configurationOptions, providerId } = providerConfiguration

    if (this.nodeEnv === 'seed') return order

    // Send order to Engine
    const { message, messagePattern } = ieMessageBuilder(
      providerId,
      {
        resource: 'orders',
        operation: 'create',
        data: {
          payload: order,
          integrationOptions,
          providerConfiguration: configurationOptions
        }
      }
    )

    try {
      this.logger.log(`Sending '${messagePattern}' to '${providerId}' provider`)
      const response: OrderCreatedResponse = await this.client
        .send(messagePattern, message)
        .toPromise()
      Object.assign(order, response)
    } catch (error: any) {
      // TODO(gb): change response status?
      order.status = OrderStatus.ERROR
      await this.ordersRepository.save(order)
      await this.eventsService.addEvent({
        namespace: EventNamespace.ORDERS,
        type: EventType.ORDER_UPDATED,
        integrationId: integration.id,
        data: {
          orderId: order.id,
          status: order.status,
          order: order
        }
      })
    }

    // Update order
    await this.ordersRepository.save(order)
    await this.eventsService.addEvent({
      namespace: EventNamespace.ORDERS,
      type: EventType.ORDER_UPDATED,
      integrationId: integration.id,
      data: {
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
      throw new ForbiddenException("You don't have permissions to do that")
    }

    const { message, messagePattern } = ieMessageBuilder(
      providerConfiguration.providerId,
      {
        resource: 'orders',
        operation: 'cancel',
        data: {
          providerConfiguration:
          providerConfiguration.configurationOptions,
          integrationOptions,
          payload: {
            id: externalId
          }
        }
      }
    )

    const response = await this.client.send(messagePattern, message).toPromise()

    await this.ordersRepository.delete(orderId)

    return response
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
    this.logger.log(`Got ${orders.length} orders from provider`)

    const externalOrdersIds = orders.map(order => order.externalId)
    const existingOrders = await this.findOrdersByExternalIds(externalOrdersIds)

    const updatedOrders: Order[] = []

    for (const existingOrder of existingOrders) {
      const externalOrder = orders.find(
        order => order.externalId === existingOrder.externalId
      )

      if (externalOrder == null) continue

      const mappedStatus = externalOrderStatusMapper(externalOrder.status)
      if (existingOrder.status === mappedStatus) continue

      updatedOrders.push({
        ...existingOrder,
        status: OrderStatus[mappedStatus]
      })
    }

    const existingOrdersExternalIds = existingOrders.map(
      order => order.externalId
    )
    const nonExistingOrders = orders
      .filter(order => !existingOrdersExternalIds.includes(order.externalId))
      .map(order => {
        return {
          ...order,
          integrationId,
          status: externalOrderStatusMapper(order.status)
        }
      })
    const newOrders = this.ordersRepository.create(nonExistingOrders)
    const allOrders = [...newOrders, ...updatedOrders]

    // Notify about new orders
    for (const order of newOrders) {
      await this.eventsService.addEvent({
        namespace: EventNamespace.ORDERS,
        type: EventType.ORDER_CREATED,
        integrationId: integrationId,
        data: {
          orderId: order.id,
          order: order
        }
      })
    }

    // Notify about updated orders
    for (const order of updatedOrders) {
      await this.eventsService.addEvent({
        namespace: EventNamespace.ORDERS,
        type: EventType.ORDER_UPDATED,
        integrationId: integrationId,
        data: {
          orderId: order.id,
          status: order.status,
          order: order
        }
      })
    }

    await this.ordersRepository.save(allOrders)
  }

  async getOrderReport (
    organization: Organization,
    orderId: string
  ): Promise<Report> {
    return await this.reportsService.findForOrder(orderId)
  }

  private async findOrdersByExternalIds (externalIds: string[]): Promise<Order[]> {
    return await this.findAll({
      where: {
        externalId: In(externalIds)
      }
    })
  }
}
