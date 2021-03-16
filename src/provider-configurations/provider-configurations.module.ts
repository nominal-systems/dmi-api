import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProvidersModule } from '../providers/providers.module'
import { ProviderConfiguration } from './entities/provider-configuration.entity'
import { ProviderConfigurationsService } from './provider-configurations.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProviderConfiguration]),
    forwardRef(() => ProvidersModule),
  ],
  providers: [ProviderConfigurationsService],
  exports: [ProviderConfigurationsService],
})
export class ProviderConfigurationsModule {}
