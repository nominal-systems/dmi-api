import { Module } from '@nestjs/common'
import { OrganizationsService } from './organizations.service'
import { OrganizationsController } from './organizations.controller'
import { Organization } from './entities/organization.entity'
import { UsersModule } from '../users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization]),
    UsersModule,
  ],
  controllers: [OrganizationsController],
  providers: [
    OrganizationsService
  ],
})
export class OrganizationsModule {}
