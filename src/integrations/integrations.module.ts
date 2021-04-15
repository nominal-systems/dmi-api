import { Module } from '@nestjs/common'
import { IntegrationsService } from './integrations.service'
import { IntegrationsController } from './integrations.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Integration } from './entities/integration.entity'
import { OrganizationsModule } from '../organizations/organizations.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
  imports: [
    TypeOrmModule.forFeature([Integration]),
    ClientsModule.registerAsync([
      {
        name: 'INTEGRATION_ENGINE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.MQTT,
          options: {
            ...configService.get('integrationEngine')
          }
        })
      }
    ]),
    OrganizationsModule,
    ConfigModule
  ],
  controllers: [IntegrationsController],
  providers: [IntegrationsService],
  exports: [IntegrationsService]
})
export class IntegrationsModule {}
