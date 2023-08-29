
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { Hashes } from '../interfaces/hash.interface'
import { Exclude } from 'class-transformer'
import { ConfigurationOption } from './configuration-option.entity'
import { IntegrationOption } from './integration-option.entity'

@Entity()
export class Provider {
  @PrimaryColumn()
  id: string

  @Column()
  description: string

  @OneToMany(() => ConfigurationOption, configOption => configOption.provider)
  configurationOptions: ConfigurationOption[]

  @OneToMany(() => IntegrationOption, intOption => intOption.provider)
  integrationOptions: IntegrationOption[]

  @Column('json', { nullable: true, default: null })
  @Exclude()
  hashes: Hashes
}
