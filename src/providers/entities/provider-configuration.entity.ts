import { Exclude } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Integration } from '../../integrations/entities/integration.entity'
import { Organization } from '../../organizations/entities/organization.entity'

@Entity()
export class ProviderConfiguration {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  diagnosticProviderId: string

  @Column('json')
  providerConfigurationOptions: any

  @Column()
  @Exclude()
  organizationId: string

  @OneToMany(
    () => Integration,
    integration => integration.providerConfiguration,
  )
  integrations: Integration[]

  @ManyToOne(
    () => Organization,
    organization => organization.providerConfigurations,
  )
  organization: Organization

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}