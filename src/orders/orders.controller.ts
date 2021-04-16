import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { Organization } from '../common/decorators/organization.decorator'
import { ApiGuard } from '../common/guards/api.guard'
import { RpcExceptionInterceptor } from '../common/interceptors/rpc-exception.interceptor'
import { ExternalOrdersEventData } from '../common/typings/external-order-event-data.interface'
import { Organization as OrganizationEntity } from '../organizations/entities/organization.entity'
import { CreateOrderDto } from './dtos/create-order.dto'
import { Order } from './entities/order.entity'
import { OrdersService } from './orders.service'

@Controller('orders')
@UseGuards(ApiGuard)
@UseInterceptors(RpcExceptionInterceptor)
export class OrdersController {
  constructor (private readonly ordersService: OrdersService) {}

  @Get(':id')
  async getOrder (
    @Organization() organization: OrganizationEntity,
    @Param('id') id: string
  ): Promise<Order> {
    return await this.ordersService.getOrder(id, organization)
  }

  @Get(':id/result.json')
  async getOrderResultInJSON (
    @Organization() organization: OrganizationEntity,
    @Param('id') id: string
  ): Promise<any> {
    return await this.ordersService.getOrderResults(organization, id, 'json')
  }

  @Get(':id/result.pdf')
  async getOrderResultInPDF (
    @Organization() organization: OrganizationEntity,
    @Param('id') id: string,
    @Res({ passthrough: true }) res
  ): Promise<any> {
    const pdfStream = await this.ordersService.getOrderResults(
      organization,
      id,
      'pdf'
    )

    return res
      .type('application/pdf')
      .header('Content-Disposition', 'attachment; filename=result.pdf')
      .send(pdfStream)
  }

  @Post()
  async createOrder (@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.ordersService.createOrder(createOrderDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancelOrder (
    @Organization() organization: OrganizationEntity,
    @Param('id') id: string
  ): Promise<void> {
    return await this.ordersService.cancelOrder(organization, id)
  }

  @EventPattern('external_orders')
  async handleExternalOrders (data: ExternalOrdersEventData): Promise<void> {
    await this.ordersService.handleExternalOrders(data)
  }
}
