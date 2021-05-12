import { Module } from '@nestjs/common'
import { OrganizationsService } from './services/organizations.service'
import { OrganizationsController } from './organizations.controller'
import { Organization } from './entities/organization.entity'
import { UsersModule } from '../users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Invitation } from './entities/invitation.entity'
import { InvitationsService } from './services/invitations.service'

@Module({
  imports: [TypeOrmModule.forFeature([Organization, Invitation]), UsersModule],
  controllers: [OrganizationsController],
  providers: [OrganizationsService, InvitationsService],
  exports: [OrganizationsService]
})
export class OrganizationsModule {}
