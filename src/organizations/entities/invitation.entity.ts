import { Exclude, Type } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from '../../users/entity/user.entity'
import { Organization } from './organization.entity'

export enum InvitationStatus {
  Pending = 'pending',
  Accepted = 'accepted'
}

@Entity()
export class Invitation {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Organization)
  @Type(() => Organization)
  organization: Organization

  @ManyToOne(
    () => User,
    user => user.invitations
  )
  @JoinColumn({ name: 'inviteesId' })
  @Type(() => User)
  invitee: User

  @Column()
  @Exclude()
  inviteesId: string

  @Column()
  organizationId: string

  @Column({
    type: 'enum',
    enum: InvitationStatus,
    default: InvitationStatus.Pending
  })
  status: InvitationStatus

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
