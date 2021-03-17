import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IntegrationsService } from '../integrations/integrations.service'
import { CreateOrderDto } from './dtos/create-order.dto'
import { Order } from './entities/order.entity'
import { v4 as uuidv4 } from 'uuid'
import { FindOneOfTypeOptions } from '../common/typings/find-one-of-type-options.interface'

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
    return await this.ordersRepository.findOne(args.id, args.options)
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

    const message = {
      id: uuidv4(),
      type: `${providerConfiguration.diagnosticProviderId}.orders.create`,
      version: '0.0.1',
      data: {
        providerConfiguration,
        integrationOptions,
        payload: order,
      },
    }

    this.logger.debug(message)

    // @TODO: Confirm that below works after IE has this implemented
    const res = await this.client
      .send(
        `${providerConfiguration.diagnosticProviderId}.orders.create`,
        message,
      )
      .toPromise()

    this.logger.debug(res)

    return createOrderDto
  }
}
