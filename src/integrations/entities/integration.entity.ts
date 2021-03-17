import { Type } from 'class-transformer'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Practice } from '../../practices/entities/practice.entity'
import { ProviderConfiguration } from '../../providers/entities/provider-configuration.entity'

@Entity()
export class Integration {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  practiceId: string

  @Column()
  providerConfigurationId: string

  @Column('json')
  integrationOptions: any

  @ManyToOne(
    () => Practice,
    practice => practice.integrations,
    { onDelete: 'CASCADE' },
  )
  @Type(() => Practice)
  practice: Practice

  @ManyToOne(
    () => ProviderConfiguration,
    providerConfiguration => providerConfiguration.integrations,
  )
  @Type(() => ProviderConfiguration)
  providerConfiguration: ProviderConfiguration
}
