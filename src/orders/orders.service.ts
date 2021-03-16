import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { IntegrationsService } from '../integrations/integrations.service'
import { CreateOrderDto } from './dtos/create-order.dto'

@Injectable()
export class OrdersService {
  constructor (
    @Inject(IntegrationsService)
    private integrationsService: IntegrationsService,
  ) {}

  async sendOrder (createOrderDto: CreateOrderDto) {
    const integration = await this.integrationsService.findOne({
      id: createOrderDto.integrationId,
    })

    if (!integration) {
      throw new NotFoundException('The integration was not found')
    }

    // Send the order
    // Get the response with the order ID and return it

    return createOrderDto
  }
}
