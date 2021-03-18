import {
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IntegrationsService } from '../integrations/integrations.service'
import { CreateOrderDto } from './dtos/create-order.dto'
import { Order } from './entities/order.entity'
import { v4 as uuidv4 } from 'uuid'
import { FindOneOfTypeOptions } from '../common/typings/find-one-of-type-options.interface'
import { Organization } from '../organizations/entities/organization.entity'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name)

  constructor (
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @Inject(IntegrationsService)
    private integrationsService: IntegrationsService,
    @Inject('INTEGRATION_ENGINE') private client: ClientProxy,
  ) {}

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
    format: 'json' | 'pdf',
  ) {
    this.logger.debug(
      `Getting (placeholder) order results for order id "${orderId}"...`,
    )

    const {
      integration: { providerConfiguration },
    } = await this.findOne({
      id: orderId,
      options: {
        relations: ['integration', 'integration.providerConfiguration'],
      },
    })

    if (organization.id !== providerConfiguration.organizationId) {
      throw new ForbiddenException("You don't have permissions to do that")
    }

    if (format === 'json') {
      return {
        id: 'string',
        orderId: 'string',
        status: 'string',
        modality: 'string',
        updatedAt: 'string',
        createdAt: 'string',
        results: [
          {
            code: 'string',
            name: 'string',
            notes: 'string',
            runDate: 'string',
            sampleType: 'string',
            items: [
              {
                code: 'string',
                analyte: 'string',
                name: 'string',
                status: 'string',
                indicator: '"LOW"',
                result: {
                  type: 'string',
                  valueText: 'string',
                  valueNumber: 'string',
                },
                low: 0,
                high: 0,
                criticalLow: 0,
                criticalHigh: 0,
                units: 'string',
                notes: 'string',
              },
            ],
          },
        ],
      }
    } else if (format === 'pdf') {
      const filePath = path.join(__dirname, '../../assets', 'Random PDF.pdf')
      this.logger.debug(filePath)
      return fs.createReadStream(filePath)
    }
  }

  async createOrder (createOrderDto: CreateOrderDto) {
    const integration = await this.integrationsService.findOne({
      id: createOrderDto.integrationId,
      options: {
        relations: ['providerConfiguration'],
      },
    })

    if (!integration) {
      throw new NotFoundException('The integration was not found')
    }

    const order = this.ordersRepository.create(createOrderDto)

    await this.ordersRepository.save(order)

    const { providerConfiguration, integrationOptions } = integration
    const messageType = `${providerConfiguration.diagnosticProviderId}.orders.create`
    const { providerConfigurationOptions } = providerConfiguration

    const message = {
      id: uuidv4(),
      type: messageType,
      version: '0.0.1',
      data: {
        providerConfiguration: providerConfigurationOptions,
        integrationOptions,
        payload: order,
      },
    }

    this.logger.debug(message)

    // @TODO: Confirm that below works after IE has this implemented
    const res = await this.client.send(messageType, message).toPromise()

    this.logger.debug(res)

    return createOrderDto
  }

  async cancelOrder (organization: Organization, orderId: string) {
    const {
      integration: { providerConfiguration, integrationOptions },
    } = await this.findOne({
      id: orderId,
      options: {
        relations: ['integration', 'integration.providerConfiguration'],
      },
    })

    if (organization.id !== providerConfiguration.organizationId) {
      throw new ForbiddenException("You don't have permissions to do that")
    }

    const messageType = `${providerConfiguration.diagnosticProviderId}.orders.cancel`

    const message = {
      id: uuidv4(),
      type: messageType,
      version: '0.0.1',
      data: {
        providerConfiguration,
        integrationOptions,
        payload: {
          id: orderId,
        },
      },
    }

    this.logger.debug(message)

    // @TODO: Confirm that below works after IE has this implemented
    const res = await this.client.send(messageType, message).toPromise()

    this.logger.debug(res)

    // @TODO: Should order be deleted from our database after cancelling? Or should it be soft-deleted?
    // await this.ordersRepository.delete(orderId)
  }
}
