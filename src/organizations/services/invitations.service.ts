import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FindOneOfTypeOptions } from '../../common/typings/find-one-of-type-options.interface'
import { User } from '../../users/entity/user.entity'
import { UsersService } from '../../users/users.service'
import { CreateInvitationDTO } from '../dtos/create-invitation.dto'
import { UpdateInvitationDTO } from '../dtos/update-invitation.dto'
import { Invitation, InvitationStatus } from '../entities/invitation.entity'

@Injectable()
export class InvitationsService {
  constructor (
    @InjectRepository(Invitation)
    private readonly invitationsRepository: Repository<Invitation>,
    private readonly usersService: UsersService
  ) {}

  async findOne (args: FindOneOfTypeOptions<Invitation>): Promise<Invitation> {
    const invitation = await this.invitationsRepository.findOne(
      args.id,
      args.options
    )

    if (invitation == null) {
      throw new NotFoundException('The invitation was not found')
    }

    return invitation
  }

  async findAllForOrganization ({
    user,
    organizationId
  }: {
    user: User
    organizationId: string
  }): Promise<Invitation[]> {
    if (user.organization.id !== organizationId) {
      throw new ForbiddenException()
    }

    return await this.invitationsRepository.find({
      where: { organizationId },
      relations: ['invitee']
    })
  }

  async findOneForOrganization ({
    invitationId,
    organizationId
  }: {
    invitationId: string
    organizationId: string
  }): Promise<Invitation> {
    return await this.findOne({
      id: invitationId,
      options: {
        where: { organizationId },
        relations: ['invitee']
      }
    })
  }

  async create (createInvitationDto: CreateInvitationDTO): Promise<Invitation> {
    const invitee = await this.usersService.findOne({
      options: { where: { email: createInvitationDto.inviteesEmail } }
    })

    if (invitee.organization != null) {
      throw new ConflictException(
        'The user already has an organization and can not be invited to another one'
      )
    }

    const newInvitation = this.invitationsRepository.create({
      invitee,
      organizationId: createInvitationDto.organizationId
    })

    await this.invitationsRepository.save(newInvitation)

    return newInvitation
  }

  async update ({
    id,
    user,
    invitation
  }: {
    id: string
    user: User
    invitation: UpdateInvitationDTO
  }): Promise<Invitation> {
    const existingInvitation = await this.findOne({
      id,
      options: { relations: ['invitee', 'organization'] }
    })

    if (existingInvitation.inviteesId !== user.id) {
      throw new ForbiddenException(
        "You don't have permissions to accept this invitation"
      )
    }

    const newInvitation = Object.assign({}, existingInvitation, invitation)

    await this.invitationsRepository.save(newInvitation)

    if (
      user.organization == null &&
      newInvitation.status === InvitationStatus.Accepted
    ) {
      await this.usersService.updateOrganization(
        user,
        existingInvitation.organization
      )
    }

    return newInvitation
  }
}
