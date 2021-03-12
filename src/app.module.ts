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
import { OrdersModule } from './orders/orders.module';
import configuration from './config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        ...configService.get('database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        dropSchema: false,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    OrganizationsModule,
    ProvidersModule,
    PracticesModule,
    IntegrationsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
