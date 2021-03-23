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
    @Inject('INTEGRATION_ENGINE') private readonly client: ClientProxy
  ) {
    this.nodeEnv = this.configService.get('nodeEnv')
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

  async getOrderResults (
    organization: Organization,
    orderId: string,
    format: 'json' | 'pdf'
  ): Promise<any> {
    const {
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
            payload: { id: orderId }
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
            providerConfiguration: providerConfigurationOptions,
            integrationOptions,
            payload: order
          }
        }
      )

      return await this.client.send(messagePattern, message).toPromise()
    }

    return order
  }

  async cancelOrder (
    organization: Organization,
    orderId: string
  ): Promise<void> {
    const {
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
            id: orderId
          }
        }
      }
    )

    return await this.client.send(messagePattern, message).toPromise()

    // @TODO: Should order be deleted from our database after cancelling? Or should it be soft-deleted?
    // await this.ordersRepository.delete(orderId)
  }
}
