import {
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
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
    @Inject('INTEGRATION_ENGINE') private readonly client: ClientProxy
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
      const decrypted = decryptProviderConfigAndIntegrationOpts({
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
            integrationOptions: decrypted.integrationOptions,
            providerConfiguration: decrypted.providerConfigurationOptions
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
      integration: { providerConfiguration }
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
            payload: { id: externalId }
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
      const decrypted = decryptProviderConfigAndIntegrationOpts({
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
            integrationOptions: decrypted.integrationOptions,
            providerConfiguration: decrypted.providerConfigurationOptions
          }
        }
      )

      const response = await this.client
        .send(messagePattern, message)
        .toPromise()

      Object.assign(order, response)
    }

    await this.ordersRepository.save(order)

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

    const decrypted = decryptProviderConfigAndIntegrationOpts({
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
          providerConfiguration: decrypted.providerConfigurationOptions,
          integrationOptions: decrypted.integrationOptions,
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
}
