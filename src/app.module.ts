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
import { FrontendController } from './frontend.controller'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { RpcExceptionInterceptor } from './common/interceptors/rpc-exception.interceptor'
import { AuthModule } from './common/auth/auth.module'
import { RefsModule } from './refs/refs.module'
import { ReportsModule } from './reports/reports.module'
import { AdminModule } from './admin/admin.module'
import { HealthModule } from './health/health.module'
import { AllExceptionsFilter } from './common/interceptors/all-exceptions.filter'
import { ResultsModule } from './results/results.module'

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
    RefsModule,
    ReportsModule,
    AdminModule,
    HealthModule,
    ResultsModule
  ],
  controllers: [
    FrontendController
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RpcExceptionInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ]
})
export class AppModule {}
