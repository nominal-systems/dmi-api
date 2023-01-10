import { Module } from '@nestjs/common'
import { AdminController } from './admin.controller'
import { ProvidersModule } from '../providers/providers.module'
import { IntegrationsModule } from '../integrations/integrations.module'
import { EventsModule } from '../events/events.module'

@Module({
  imports: [
    ProvidersModule,
    EventsModule,
    IntegrationsModule
  ],
  controllers: [AdminController]
})
export class AdminModule {}
