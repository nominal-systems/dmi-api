import { Module } from '@nestjs/common'
import { IntegrationsService } from './integrations.service'
import { IntegrationsController } from './integrations.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Integration } from './entities/integration.entity'
import { OrganizationsModule } from '../organizations/organizations.module'

@Module({
  imports: [TypeOrmModule.forFeature([Integration]), OrganizationsModule],
  controllers: [IntegrationsController],
  providers: [IntegrationsService],
  exports: [IntegrationsService]
})
export class IntegrationsModule {}
