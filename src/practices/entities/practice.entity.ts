import { Exclude, Type } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Integration } from '../../integrations/entities/integration.entity'
import { Organization } from '../../organizations/entities/organization.entity'

@Entity()
export class Practice {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  @Exclude()
  organizationId: string

  @ManyToOne(
    () => Organization,
    organization => organization.practices
  )
  @Type(() => Organization)
  organization: Organization

  @OneToMany(
    () => Integration,
    integration => integration.practice
  )
  @Type(() => Integration)
  integrations: Integration[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
