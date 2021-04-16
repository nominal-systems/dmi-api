import {
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, In, Repository } from 'typeorm'
import { IntegrationsService } from '../integrations/integrations.service'
import { CreateOrderDto } from './dtos/create-order.dto'
import { Order } from './entities/order.entity'
import { FindOneOfTypeOptions } from '../common/typings/find-one-of-type-options.interface'
import { Organization } from '../organizations/entities/organization.entity'
import * as fs from 'fs'
import * as path from 'path'
import { ConfigService } from '@nestjs/config'
import ieMessageBuilder from '../common/utils/ieMessageBuilder'
import { decryptProviderConfigAndIntegrationOpts } from '../common/utils/crypto.utils'
import { ExternalOrdersEventData } from '../common/typings/external-order-event-data.interface'
import { EventsService } from '../events/events.service'

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name)
  private readonly nodeEnv: string | undefined
  private readonly secretKey: string

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
    this.secretKey = this.configService.get('secretKey') ?? ''
  }

  async findAll (options?: FindManyOptions<Order>): Promise<Order[]> {
    return await this.ordersRepository.find(options)
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
      const decryptedOptions = decryptProviderConfigAndIntegrationOpts({
        integrationOptions,
        providerConfigurationOptions:
          providerConfiguration.providerConfigurationOptions,
        secretKey: this.secretKey
      })

      const { message, messagePattern } = ieMessageBuilder(
        providerConfiguration.diagnosticProviderId,
        {
          resource: 'orders',
          operation: 'get',
          data: {
            payload: { id: externalId },
            integrationOptions: decryptedOptions.integrationOptions,
            providerConfiguration: decryptedOptions.providerConfigurationOptions
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
      const decryptedOptions = decryptProviderConfigAndIntegrationOpts({
        secretKey: this.secretKey,
        integrationOptions: integrationOptions,
        providerConfigurationOptions:
          providerConfiguration.providerConfigurationOptions
      })

      const { message, messagePattern } = ieMessageBuilder(
        providerConfiguration.diagnosticProviderId,
        {
          resource: 'orders',
          operation: 'results',
          data: {
            payload: { id: externalId },
            integrationOptions: decryptedOptions.integrationOptions,
            providerConfiguration: decryptedOptions.providerConfigurationOptions
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

    const { providerConfiguration, integrationOptions } = integration
    const {
      providerConfigurationOptions,
      diagnosticProviderId
    } = providerConfiguration

    if (this.nodeEnv !== 'seed') {
      const decryptedOptions = decryptProviderConfigAndIntegrationOpts({
        integrationOptions,
        providerConfigurationOptions,
        secretKey: this.secretKey
      })

      const { message, messagePattern } = ieMessageBuilder(
        diagnosticProviderId,
        {
          resource: 'orders',
          operation: 'create',
          data: {
            payload: order,
            integrationOptions: decryptedOptions.integrationOptions,
            providerConfiguration: decryptedOptions.providerConfigurationOptions
          }
        }
      )

      const response = await this.client
        .send(messagePattern, message)
        .toPromise()

      Object.assign(order, response)
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

    const decryptedOptions = decryptProviderConfigAndIntegrationOpts({
      integrationOptions,
      providerConfigurationOptions:
        providerConfiguration.providerConfigurationOptions,
      secretKey: this.secretKey
    })

    const { message, messagePattern } = ieMessageBuilder(
      providerConfiguration.diagnosticProviderId,
      {
        resource: 'orders',
        operation: 'cancel',
        data: {
          providerConfiguration: decryptedOptions.providerConfigurationOptions,
          integrationOptions: decryptedOptions.integrationOptions,
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

  async handleExternalOrders ({
    integrationId,
    data
  }: ExternalOrdersEventData): Promise<void> {
    const externalOrdersExternalIds = data.map(order => order.externalId)
    const existingOrders = await this.findAll({
      where: {
        integrationId: integrationId,
        externalId: In(externalOrdersExternalIds)
      }
    })

    const updatedOrders: Order[] = []

    for (const existingOrder of existingOrders) {
      const externalOrder = data.find(
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
    const nonExistingOrders = data.filter(
      order => !existingOrdersExternalIds.includes(order.externalId)
    )
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
