import { Type } from 'class-transformer'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Hash } from '../../common/typings/hash.interface'
import { Organization } from '../../organizations/entities/organization.entity'
import { Practice } from '../../practices/entities/practice.entity'
import { ProviderConfiguration } from '../../providers/entities/provider-configuration.entity'

@Entity()
export class Integration {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  practiceSlug: string

  @Column()
  organizationId: string

  @Column()
  providerConfigurationId: string

  @Column('json')
  integrationOptions: Hash

  @ManyToOne(
    () => Practice,
    practice => practice.integrations,
    { onDelete: 'CASCADE' }
  )
  @Type(() => Practice)
  practice: Practice

  @ManyToOne(
    () => Organization,
    organization => organization.integrations,
    { onDelete: 'CASCADE' }
  )
  @Type(() => Organization)
  organization: Organization

  @ManyToOne(
    () => ProviderConfiguration,
    providerConfiguration => providerConfiguration.integrations
  )
  @Type(() => ProviderConfiguration)
  providerConfiguration: ProviderConfiguration
}
