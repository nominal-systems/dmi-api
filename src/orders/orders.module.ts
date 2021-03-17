import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { OrganizationsModule } from '../organizations/organizations.module'
import { IntegrationsModule } from '../integrations/integrations.module'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from './entities/order.entity'
import { Patient } from './entities/patient.entity'
import { Client } from './entities/client.entity'
import { Veterinarian } from './entities/veterinarian.entity'

@Module({
  imports: [
    OrganizationsModule,
    IntegrationsModule,
    TypeOrmModule.forFeature([Order, Patient, Client, Veterinarian]),
    ClientsModule.registerAsync([
      {
        name: 'INTEGRATION_ENGINE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.MQTT,
          options: {
            host: configService.get('integrationEngine').host,
            port: configService.get('integrationEngine').microservicePort,
          },
        }),
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
