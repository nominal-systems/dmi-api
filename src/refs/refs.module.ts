import { Module } from '@nestjs/common'
import { RefsController } from './refs.controller'
import { OrganizationsModule } from '../organizations/organizations.module'
import { ProvidersModule } from '../providers/providers.module'
import { RefsService } from './refs.service'
import { IntegrationsModule } from './../integrations/integrations.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Refs } from './entities/refs.entity'
import { ProviderRefs } from './entities/providerRefs.entity'
import { RefsMap } from './entities/refsMap.entity'

@Module({
  imports: [
    OrganizationsModule,
    ProvidersModule,
    IntegrationsModule,
    TypeOrmModule.forFeature([ProviderRefs, Refs, RefsMap])
  ],
  controllers: [RefsController],
  providers: [RefsService]
})
export class RefsModule {}
