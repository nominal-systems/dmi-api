import { Module } from '@nestjs/common'
import { AdminController } from './admin.controller'
import { ProvidersModule } from '../providers/providers.module'
import { IntegrationsModule } from '../integrations/integrations.module'

@Module({
  imports: [
    ProvidersModule,
    IntegrationsModule
  ],
  controllers: [AdminController]
})
export class AdminModule {}
