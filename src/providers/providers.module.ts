import { forwardRef, Module } from '@nestjs/common'
import { ProvidersService } from './providers.service'
import { ProvidersController } from './providers.controller'
import { OrganizationsModule } from '../organizations/organizations.module'
import { ProviderConfigurationsModule } from '../provider-configurations/provider-configurations.module'

@Module({
  imports: [
    OrganizationsModule,
    forwardRef(() => ProviderConfigurationsModule),
  ],
  controllers: [ProvidersController],
  providers: [ProvidersService],
  exports: [ProvidersService],
})
export class ProvidersModule {}
