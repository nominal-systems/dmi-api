import { Module } from '@nestjs/common'
import { RefsController } from './refs.controller'
import { OrganizationsModule } from '../organizations/organizations.module'
import { ProvidersModule } from '../providers/providers.module'

@Module({
  imports: [
    OrganizationsModule,
    ProvidersModule
  ],
  controllers: [RefsController]
})
export class RefsModule {}
