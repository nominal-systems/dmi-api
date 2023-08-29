import { Module } from '@nestjs/common'
import { ProvidersService } from './services/providers.service'
import { ProvidersController } from './providers.controller'
import { OrganizationsModule } from '../organizations/organizations.module'
import { ProviderConfiguration } from './entities/provider-configuration.entity'
import { ProviderConfigurationsService } from './services/provider-configurations.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IntegrationsModule } from '../integrations/integrations.module'
import { ClientsModule } from '@nestjs/microservices'
import { ConfigModule } from '@nestjs/config'
import activeMQClientProvider from '../common/providers/activemq-client.provider'
import { Integration } from '../integrations/entities/integration.entity'
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose'
import { ProviderExternalRequests, ProviderExternalRequestsSchema } from './entities/provider-external-requests.entity'
import { Provider } from './entities/provider.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProviderConfiguration, Integration, Provider]),
    MongooseModule.forFeatureAsync([
      {
        name: ProviderExternalRequests.name,
        useFactory: () => {
          const schema = ProviderExternalRequestsSchema

          return schema
        },
        inject: [getConnectionToken()]
      }
    ]),
    ClientsModule.registerAsync([
      activeMQClientProvider
    ]),
    OrganizationsModule,
    IntegrationsModule,
    ConfigModule
  ],
  controllers: [ProvidersController],
  providers: [ProvidersService, ProviderConfigurationsService],
  exports: [ProvidersService, ProviderConfigurationsService]
})
export class ProvidersModule {}
