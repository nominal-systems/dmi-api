import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { OrganizationsModule } from '../organizations/organizations.module'
import { IntegrationsModule } from '../integrations/integrations.module'
import { ClientsModule } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from './entities/order.entity'
import { Patient } from './entities/patient.entity'
import { Client } from './entities/client.entity'
import { Veterinarian } from './entities/veterinarian.entity'
import { EventsModule } from '../events/events.module'
import activeMQClientProvider from '../common/providers/activemq-client.provider'

@Module({
  imports: [
    OrganizationsModule,
    IntegrationsModule,
    EventsModule,
    TypeOrmModule.forFeature([Order, Patient, Client, Veterinarian]),
    ClientsModule.registerAsync([activeMQClientProvider])
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
