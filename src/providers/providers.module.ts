import { Module } from '@nestjs/common'
import { ProvidersService } from './services/providers.service'
import { ProvidersController } from './providers.controller'
import { OrganizationsModule } from '../organizations/organizations.module'
import { ProviderConfiguration } from './entities/provider-configuration.entity'
import { ProviderConfigurationsService } from './services/provider-configurations.service'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProviderConfiguration]),
    OrganizationsModule,
  ],
  controllers: [ProvidersController],
  providers: [ProvidersService, ProviderConfigurationsService],
})
export class ProvidersModule {}
