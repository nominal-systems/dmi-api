import { Module } from '@nestjs/common'
import { AdminController } from './admin.controller'
import { ProvidersModule } from '../providers/providers.module'
import { IntegrationsModule } from '../integrations/integrations.module'
import { EventsModule } from '../events/events.module'
import { OrganizationsModule } from '../organizations/organizations.module'

@Module({
  imports: [
    OrganizationsModule,
    ProvidersModule,
    EventsModule,
    IntegrationsModule
  ],
  controllers: [AdminController]
})
export class AdminModule {}
