import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiGuard } from '../common/guards/api.guard'
import { CreateOrderDto } from './dtos/create-order.dto'
import { OrdersService } from './orders.service'

@Controller('orders')
@UseGuards(ApiGuard)
export class OrdersController {
  constructor (private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder (@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.sendOrder(createOrderDto)
  }
}
