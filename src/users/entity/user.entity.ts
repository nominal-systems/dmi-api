import { Exclude } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Invitation } from '../../organizations/entities/invitation.entity'
import { Organization } from '../../organizations/entities/organization.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  @Exclude()
  password: string

  @ManyToOne(
    () => Organization,
    organization => organization.members,
    { onDelete: 'SET NULL' }
  )
  organization: Organization

  @OneToMany(
    () => Invitation,
    invitation => invitation.invitee
  )
  invitations: Invitation[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
