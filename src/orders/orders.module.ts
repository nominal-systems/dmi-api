import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { OrganizationsModule } from '../organizations/organizations.module'
import { IntegrationsModule } from '../integrations/integrations.module'

@Module({
  imports: [OrganizationsModule, IntegrationsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
