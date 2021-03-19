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
import { v4 as uuidv4 } from 'uuid'
import { FindOneOfTypeOptions } from '../common/typings/find-one-of-type-options.interface'
import { Organization } from '../organizations/entities/organization.entity'
import * as fs from 'fs'
import * as path from 'path'
import { ConfigService } from '@nestjs/config'
import { EVENTS_VERSION } from '../common/constants/api.constant'

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name)
  private nodeEnv: string

  constructor (
    private configService: ConfigService,
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @Inject(IntegrationsService)
    private integrationsService: IntegrationsService,
    @Inject('INTEGRATION_ENGINE') private client: ClientProxy
  ) {
    this.nodeEnv = configService.get('nodeEnv')
  }

  async findAll (options?: FindManyOptions<Order>) {
    return await this.ordersRepository.find(options)
  }

  async findOne (args: FindOneOfTypeOptions<Order>) {
    const order = await this.ordersRepository.findOne(args.id, args.options)

    if (!order) {
      throw new NotFoundException('The order was not found')
    }

    return order
  }

  async getOrderResults (
    organization: Organization,
    orderId: string,
    format: 'json' | 'pdf'
  ) {
    this.logger.debug(
      `Getting (placeholder) order results for order id "${orderId}"...`
    )

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
      const messageType = `${providerConfiguration.diagnosticProviderId}.orders.results`

      const message = {
        id: uuidv4(),
        type: messageType,
        version: EVENTS_VERSION,
        data: {
          payload: {
            id: orderId
          }
        }
      }

      return await this.client.send(messageType, message).toPromise()
    } else if (format === 'pdf') {
      const filePath = path.join(__dirname, '../../assets', 'Random PDF.pdf')
      return fs.createReadStream(filePath)
    }
  }

  async createOrder (createOrderDto: CreateOrderDto) {
    const integration = await this.integrationsService.findOne({
      id: createOrderDto.integrationId,
      options: {
        relations: ['providerConfiguration']
      }
    })

    if (!integration) {
      throw new NotFoundException('The integration was not found')
    }

    const order = this.ordersRepository.create(createOrderDto)

    await this.ordersRepository.save(order)

    const { providerConfiguration, integrationOptions } = integration
    const messageType = `${providerConfiguration.diagnosticProviderId}.orders.create`
    const { providerConfigurationOptions } = providerConfiguration

    if (this.nodeEnv !== 'seed') {
      const message = {
        id: uuidv4(),
        type: messageType,
        version: EVENTS_VERSION,
        data: {
          providerConfiguration: providerConfigurationOptions,
          integrationOptions,
          payload: order
        }
      }

      const res = await this.client.send(messageType, message).toPromise()

      return res
    }

    return order
  }

  async cancelOrder (organization: Organization, orderId: string) {
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

    const messageType = `${providerConfiguration.diagnosticProviderId}.orders.cancel`

    const message = {
      id: uuidv4(),
      type: messageType,
      version: EVENTS_VERSION,
      data: {
        providerConfiguration,
        integrationOptions,
        payload: {
          id: orderId
        }
      }
    }

    const res = await this.client.send(messageType, message).toPromise()

    this.logger.debug(res)

    // @TODO: Should order be deleted from our database after cancelling? Or should it be soft-deleted?
    // await this.ordersRepository.delete(orderId)
  }
}
