import { Module } from '@nestjs/common'
import { ProvidersService } from './providers.service'
import { ProvidersController } from './providers.controller'
import { OrganizationsModule } from '../organizations/organizations.module'
import { ProviderConfiguration } from './entities/provider-configuration.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProviderConfiguration]),
    OrganizationsModule,
  ],
  controllers: [ProvidersController],
  providers: [ProvidersService],
})
export class ProvidersModule {}
