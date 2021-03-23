import { Module } from '@nestjs/common'
import { ProvidersService } from './services/providers.service'
import { ProvidersController } from './providers.controller'
import { OrganizationsModule } from '../organizations/organizations.module'
import { ProviderConfiguration } from './entities/provider-configuration.entity'
import { ProviderConfigurationsService } from './services/provider-configurations.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IntegrationsModule } from '../integrations/integrations.module'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProviderConfiguration]),
    ClientsModule.registerAsync([
      {
        name: 'INTEGRATION_ENGINE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.MQTT,
          options: {
            ...configService.get('integrationEngine')
          }
        })
      }
    ]),
    OrganizationsModule,
    IntegrationsModule
  ],
  controllers: [ProvidersController],
  providers: [ProvidersService, ProviderConfigurationsService],
  exports: [ProvidersService, ProviderConfigurationsService]
})
export class ProvidersModule {}
