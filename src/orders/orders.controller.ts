import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { DisableGuards } from '../common/decorators/disable-guards.decorator'
import { Organization } from '../common/decorators/organization.decorator'
import { ApiGuard } from '../common/guards/api.guard'
import { Organization as OrganizationEntity } from '../organizations/entities/organization.entity'
import { AddTestsToOrderDTO } from './dtos/add-tests-to-order.dto'
import { CreateOrderDto } from './dtos/create-order.dto'
import { OrderSearchQueryParams } from './dtos/order-search-queryparams.dto'
import { OrderTestCancelPathParams } from './dtos/order-test-cancel-path-params.dto'
import { Order } from './entities/order.entity'
import { OrdersService } from './orders.service'
import { Report } from '../reports/entities/report.entity'
import { ApiParam } from '@nestjs/swagger'
import { Attachment } from '../common/entities/attachment.entity'
import { InternalEventLoggingInterceptor } from '../event-logging/internal-event-logging.interceptor'
import { ExternalOrdersEventData, ExternalResultEventData } from '../common/typings/internal-event-data.interface'

@Controller('orders')
@UseGuards(ApiGuard)
export class OrdersController {
  private readonly logger = new Logger(OrdersController.name)

  constructor (private readonly ordersService: OrdersService) {
  }

  @Get()
  async searchOrders (
    @Organization() organization: OrganizationEntity,
    @Query() searchQuery: OrderSearchQueryParams
  ): Promise<Order[]> {
    return await this.ordersService.searchOrders(organization.id, searchQuery)
  }

  @Get(':id')
  async getOrder (
    @Organization() organization: OrganizationEntity,
    @Param('id') id: string
  ): Promise<Order> {
    return await this.ordersService.getOrder(id, organization)
  }

  @Post(':id/tests')
  async addTestsToOrder (
    @Organization() organization: OrganizationEntity,
    @Param('id') id: string,
    @Body() { tests }: AddTestsToOrderDTO
  ): Promise<Order> {
    return await this.ordersService.addTestsToOrder({
      orderId: id,
      tests,
      organizationId: organization.id
    })
  }

  @Delete(':id/tests/:testCode')
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiParam({ name: 'testCode', description: 'Test Code' })
  async cancelOrderTests (
    @Organization() organization: OrganizationEntity,
    @Param() { id, testCode }: OrderTestCancelPathParams
  ): Promise<void> {
    await this.ordersService.cancelOrderTests({
      orderId: id,
      tests: [{ code: testCode }],
      organizationId: organization.id
    })
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
    @Param('id') id: string
  ): Promise<any> {
    return await this.ordersService.getOrderResults(organization, id, 'pdf')
  }

  @Get(':id/report')
  async getOrderReport (
    @Organization() organization: OrganizationEntity,
    @Param('id') id: string
  ): Promise<Report> {
    return await this.ordersService.getOrderReport(organization, id)
  }

  @Get(':id/manifest')
  async getOrderManifest (
    @Organization() organization: OrganizationEntity,
    @Param('id') id: string
  ): Promise<Attachment> {
    return await this.ordersService.getOrderManifest(organization, id)
  }

  @Post()
  async createOrder (
    @Body() createOrderDto: CreateOrderDto,
    @Query('autoSubmitOrder') autoSubmitOrder: boolean
  ): Promise<Order> {
    return await this.ordersService.createOrder(createOrderDto, autoSubmitOrder)
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
  @DisableGuards(ApiGuard)
  @UseInterceptors(InternalEventLoggingInterceptor)
  async handleExternalOrders (data: ExternalOrdersEventData): Promise<void> {
    await this.ordersService.handleExternalOrders(data)
  }

  @EventPattern('external_order_results')
  @DisableGuards(ApiGuard)
  @UseInterceptors(InternalEventLoggingInterceptor)
  async handleExternalOrderResults (data: ExternalResultEventData): Promise<void> {
    await this.ordersService.handleExternalOrderResults(data)
  }
}
