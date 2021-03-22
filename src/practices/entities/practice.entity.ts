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

  @Column({ unique: true })
  name: string

  @Column()
  @Exclude()
  organizationId: string

  @OneToMany(
    () => Integration,
    integration => integration.practice
  )
  @Type(() => Integration)
  integrations: Integration[]

  @ManyToOne(
    () => Organization,
    organization => organization.practices
  )
  @Type(() => Organization)
  organization: Organization

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
