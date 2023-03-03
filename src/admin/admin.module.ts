import { Module } from '@nestjs/common'
import { AdminController } from './admin.controller'
import { ProvidersModule } from '../providers/providers.module'
import { IntegrationsModule } from '../integrations/integrations.module'
import { EventsModule } from '../events/events.module'
import { OrganizationsModule } from '../organizations/organizations.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Integration } from '../integrations/entities/integration.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Integration]),
    OrganizationsModule,
    ProvidersModule,
    EventsModule,
    IntegrationsModule
  ],
  controllers: [AdminController]
})
export class AdminModule {}
