import { Module } from '@nestjs/common'
import { AdminController } from './admin.controller'
import { ProvidersModule } from '../providers/providers.module'
import { IntegrationsModule } from '../integrations/integrations.module'
import { EventsModule } from '../events/events.module'
import { OrganizationsModule } from '../organizations/organizations.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Integration } from '../integrations/entities/integration.entity'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { UsersModule } from '../users/users.module'
import { RefsModule } from '../refs/refs.module'
import { ProviderRef } from '../refs/entities/providerRef.entity'
import { Ref } from '../refs/entities/ref.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Integration, Ref, ProviderRef]),
    OrganizationsModule,
    ProvidersModule,
    EventsModule,
    IntegrationsModule,
    UsersModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '30m' }
      }),
      inject: [ConfigService]
    }),
    RefsModule,
    ProvidersModule
  ],
  controllers: [AdminController]
})
export class AdminModule {}
