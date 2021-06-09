import {
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, In, Repository, SelectQueryBuilder } from 'typeorm'
import { IntegrationsService } from '../integrations/integrations.service'
import { CreateOrderDto } from './dtos/create-order.dto'
import { Order } from './entities/order.entity'
import { FindOneOfTypeOptions } from '../common/typings/find-one-of-type-options.interface'
import { Organization } from '../organizations/entities/organization.entity'
import * as fs from 'fs'
import * as path from 'path'
import { ConfigService } from '@nestjs/config'
import ieMessageBuilder from '../common/utils/ieMessageBuilder'
import { ExternalOrdersEventData } from '../common/typings/external-order-event-data.interface'
import { EventsService } from '../events/events.service'
import { OrderSearchQueryParams } from './dtos/order-search-queryparams.dto'
import { Test } from './entities/test.entity'

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
    @Inject(IntegrationsService)
    private readonly integrationsService: IntegrationsService,
    @Inject(EventsService) private readonly eventsService: EventsService,
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
            'providerConfiguration.diagnosticProviderId LIKE :providerId',
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
      }
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
        providerConfiguration.diagnosticProviderId,
        {
          resource: 'orders',
          operation: 'get',
          data: {
            payload: { id: externalId },
            integrationOptions,
            providerConfiguration:
              providerConfiguration.providerConfigurationOptions
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

    if (format === 'json') {
      const { message, messagePattern } = ieMessageBuilder(
        providerConfiguration.diagnosticProviderId,
        {
          resource: 'orders',
          operation: 'results',
          data: {
            payload: { id: externalId },
            integrationOptions,
            providerConfiguration:
              providerConfiguration.providerConfigurationOptions
          }
        }
      )

      return await this.client.send(messagePattern, message).toPromise()
    } else if (format === 'pdf') {
      const filePath = path.join(__dirname, '../../assets', 'Random PDF.pdf')
      return fs.createReadStream(filePath)
    }
  }

  async createOrder (createOrderDto: CreateOrderDto): Promise<Order> {
    const integration = await this.integrationsService.findOne({
      id: createOrderDto.integrationId,
      options: {
        relations: ['providerConfiguration']
      }
    })

    const order = this.ordersRepository.create(createOrderDto)
    await this.ordersRepository.save(order)

    const { providerConfiguration, integrationOptions } = integration
    const {
      providerConfigurationOptions,
      diagnosticProviderId
    } = providerConfiguration

    if (this.nodeEnv !== 'seed') {
      const { message, messagePattern } = ieMessageBuilder(
        diagnosticProviderId,
        {
          resource: 'orders',
          operation: 'create',
          data: {
            payload: order,
            integrationOptions,
            providerConfiguration: providerConfigurationOptions
          }
        }
      )

      try {
        const response = await this.client
          .send(messagePattern, message)
          .toPromise()

        Object.assign(order, response)
      } catch (error) {
        await this.ordersRepository.remove(order)
        throw error
      }
    }

    await this.ordersRepository.save(order)

    await this.eventsService.addEvent({
      namespace: 'orders',
      type: 'order:status',
      value: { orderId: order.id, status: order.status }
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
      providerConfiguration.diagnosticProviderId,
      {
        resource: 'orders',
        operation: 'cancel',
        data: {
          providerConfiguration:
            providerConfiguration.providerConfigurationOptions,
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
      providerConfiguration.diagnosticProviderId,
      {
        resource: 'orders',
        operation: 'tests.add',
        data: {
          providerConfiguration:
            providerConfiguration.providerConfigurationOptions,
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
      providerConfiguration.diagnosticProviderId,
      {
        resource: 'orders',
        operation: 'tests.cancel',
        data: {
          providerConfiguration:
            providerConfiguration.providerConfigurationOptions,
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
    const externalOrdersExternalIds = orders.map(order => order.externalId)
    const existingOrders = await this.findAll({
      where: {
        externalId: In(externalOrdersExternalIds)
      }
    })

    const updatedOrders: Order[] = []

    for (const existingOrder of existingOrders) {
      const externalOrder = orders.find(
        order => order.externalId === existingOrder.externalId
      )

      if (
        externalOrder == null ||
        existingOrder.status === externalOrder.status
      ) {
        continue
      }

      updatedOrders.push({
        ...existingOrder,
        status: externalOrder.status
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
          integrationId
        }
      })
    const newOrders = this.ordersRepository.create(nonExistingOrders)
    const allOrders = [...newOrders, ...updatedOrders]

    await this.ordersRepository.save(allOrders)

    for (const order of allOrders) {
      await this.eventsService.addEvent({
        namespace: 'orders',
        type: 'order:status',
        value: { orderId: order.id, status: order.status }
      })
    }
  }
}
