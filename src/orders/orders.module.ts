import { forwardRef, Module } from '@nestjs/common'
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
import { Test } from './entities/test.entity'
import { ReportsModule } from '../reports/reports.module'
import { RefsModule } from '../refs/refs.module'
import { ProvidersModule } from '../providers/providers.module'
import { InternalEventLoggingModule } from '../internal-event-logging/internal-event-logging.module'

@Module({
  imports: [
    OrganizationsModule,
    IntegrationsModule,
    EventsModule,
    RefsModule,
    ProvidersModule,
    forwardRef(() => ReportsModule),
    TypeOrmModule.forFeature([Order, Patient, Client, Veterinarian, Test]),
    ClientsModule.registerAsync([activeMQClientProvider]),
    InternalEventLoggingModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
