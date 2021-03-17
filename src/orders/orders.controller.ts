import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiGuard } from '../common/guards/api.guard'
import { CreateOrderDto } from './dtos/create-order.dto'
import { OrdersService } from './orders.service'

@Controller('orders')
@UseGuards(ApiGuard)
export class OrdersController {
  constructor (private readonly ordersService: OrdersService) {}

  @Get(':id')
  async getOrder (@Param('id') id: string) {
    return await this.ordersService.findOne({
      id,
      options: { relations: ['patient', 'client', 'veterinarian'] },
    })
  }

  @Post()
  async createOrder (@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.createOrder(createOrderDto)
  }
}
