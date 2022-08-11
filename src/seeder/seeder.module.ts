import { Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'
import { SeederService } from './seeder.service'
import { PracticesModule } from '../practices/practices.module'
import { IntegrationsModule } from '../integrations/integrations.module'
import { ProvidersModule } from '../providers/providers.module'
import { OrganizationsModule } from '../organizations/organizations.module'
import { OrdersModule } from '../orders/orders.module'
import { EventsModule } from '../events/events.module'
import { ReportsModule } from '../reports/reports.module'

@Module({
  imports: [
    UsersModule,
    OrganizationsModule,
    PracticesModule,
    IntegrationsModule,
    ProvidersModule,
    OrdersModule,
    EventsModule
  ],
  providers: [SeederService]
})
export class SeederModule {}
