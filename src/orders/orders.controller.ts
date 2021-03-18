import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Organization } from '../common/decorators/organization.decorator'
import { ApiGuard } from '../common/guards/api.guard'
import { Organization as OrganizationEntity } from '../organizations/entities/organization.entity'
import { CreateOrderDto } from './dtos/create-order.dto'
import { OrdersService } from './orders.service'

@Controller('orders')
@UseGuards(ApiGuard)
export class OrdersController {
  constructor (private readonly ordersService: OrdersService) {}

  @Get(':id')
  async getOrder (
    @Organization() organization: OrganizationEntity,
    @Param('id') id: string,
  ) {
    const order = await this.ordersService.findOne({
      id,
      options: {
        relations: [
          'patient',
          'client',
          'tests',
          'veterinarian',
          'integration',
          'integration.providerConfiguration',
        ],
      },
    })

    if (
      order.integration.providerConfiguration.organizationId !== organization.id
    ) {
      throw new ForbiddenException("You don't have access to this resource")
    }

    return order
  }

  @Get(':id/result.json')
  async getOrderResultInJSON (
    @Organization() organization: OrganizationEntity,
    @Param('id') id: string,
  ) {
    return await this.ordersService.getOrderResults(organization, id, 'json')
  }

  @Get(':id/result.pdf')
  async getOrderResultInPDF (
    @Organization() organization: OrganizationEntity,
    @Param('id') id: string,
    @Res({ passthrough: true }) res,
  ) {
    const pdfStream = await this.ordersService.getOrderResults(
      organization,
      id,
      'pdf',
    )

    return res
      .type('application/pdf')
      .header('Content-Disposition', 'attachment; filename=result.pdf')
      .send(pdfStream)
  }

  @Post()
  async createOrder (@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.createOrder(createOrderDto)
  }

  @Delete(':id')
  async cancelOrder (
    @Organization() organization: OrganizationEntity,
    @Param('id') id: string,
  ) {
    return await this.ordersService.cancelOrder(organization, id)
  }
}
