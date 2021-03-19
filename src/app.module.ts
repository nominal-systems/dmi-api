import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { OrganizationsModule } from './organizations/organizations.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProvidersModule } from './providers/providers.module'
import { PracticesModule } from './practices/practices.module'
import { IntegrationsModule } from './integrations/integrations.module'
import { OrdersModule } from './orders/orders.module'
import { RefsModule } from './refs/refs.module'
import { EventsModule } from './events/events.module'
import configuration from './config/configuration'
import * as path from 'path'
import { MongooseModule } from '@nestjs/mongoose'
import { SeederModule } from './seeder/seeder.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('typeorm'),
        entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
        dropSchema: false
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('mongoose'),
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    OrganizationsModule,
    ProvidersModule,
    PracticesModule,
    IntegrationsModule,
    OrdersModule,
    RefsModule,
    EventsModule,
    SeederModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
