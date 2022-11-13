import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { OrganizationsModule } from './organizations/organizations.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProvidersModule } from './providers/providers.module'
import { PracticesModule } from './practices/practices.module'
import { IntegrationsModule } from './integrations/integrations.module'
import { OrdersModule } from './orders/orders.module'
import { EventsModule } from './events/events.module'
import configuration from './config/configuration'
import { MongooseModule } from '@nestjs/mongoose'
import { SeederModule } from './seeder/seeder.module'
import { AppController } from './app.controller'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { RpcExceptionInterceptor } from './common/interceptors/rpc-exception.interceptor'
import { WinstonModule } from 'nest-winston'
import { consoleTransport, fileTransport } from './config/winstonconfig'
import { AuthModule } from './common/auth/auth.module'
import { RefsModule } from './refs/refs.module'
import { ReportsModule } from './reports/reports.module'
import { AdminModule } from './admin/admin.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('typeorm')
      }),
      inject: [ConfigService]
    }),
    WinstonModule.forRoot({
      transports: [consoleTransport, fileTransport]
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
    AuthModule,
    UsersModule,
    OrganizationsModule,
    ProvidersModule,
    PracticesModule,
    IntegrationsModule,
    OrdersModule,
    EventsModule,
    SeederModule,
    RefsModule,
    ReportsModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RpcExceptionInterceptor
    }
  ]
})
export class AppModule {}
