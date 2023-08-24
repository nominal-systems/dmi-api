import { Module } from '@nestjs/common'
import { IntegrationsService } from './integrations.service'
import { IntegrationsController } from './integrations.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Integration } from './entities/integration.entity'
import { OrganizationsModule } from '../organizations/organizations.module'
import { ConfigModule } from '@nestjs/config'
import { ClientsModule } from '@nestjs/microservices'
import activeMQClientProvider from '../common/providers/activemq-client.provider'
import { ProviderConfiguration } from '../providers/entities/provider-configuration.entity'
import { Providers } from './../providers/entities/providers.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Integration, ProviderConfiguration, Providers]),
    ClientsModule.registerAsync([activeMQClientProvider]),
    OrganizationsModule,
    ConfigModule
  ],
  controllers: [IntegrationsController],
  providers: [IntegrationsService],
  exports: [IntegrationsService]
})
export class IntegrationsModule {}
