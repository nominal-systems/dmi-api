import { Module } from '@nestjs/common'
import { RefController } from './refs.controller'
import { OrganizationsModule } from '../organizations/organizations.module'
import { ProvidersModule } from '../providers/providers.module'
import { RefsService } from './refs.service'
import { IntegrationsModule } from '../integrations/integrations.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Ref } from './entities/ref.entity'
import { ProviderRef } from './entities/providerRef.entity'
import { ProviderRefService } from './providerRef.service'
import { ProviderDefaultBreed } from './entities/providerDefaultBreed.entity'
import {
  ProviderSpeciesMappingDefaultBreed,
} from './entities/providerSpeciesMappingDefaultBreed.entity'

@Module({
  imports: [
    OrganizationsModule,
    ProvidersModule,
    IntegrationsModule,
    TypeOrmModule.forFeature([ProviderRef, Ref, ProviderDefaultBreed, ProviderSpeciesMappingDefaultBreed]),
  ],
  controllers: [RefController],
  providers: [RefsService, ProviderRefService],
  exports: [RefsService, ProviderRefService],
})
export class RefsModule {}
