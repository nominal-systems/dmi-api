import { Module } from '@nestjs/common'
import { RefsController } from './refs.controller'
import { OrganizationsModule } from '../organizations/organizations.module'

@Module({
  imports: [OrganizationsModule],
  controllers: [RefsController]
})
export class RefsModule {}
