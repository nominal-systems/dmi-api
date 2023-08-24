
import { IntegrationOptions } from '@nominal-systems/dmi-engine-common'
import { ConfigurationOption } from '../../common/typings/provider.interface'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { Hashes } from '../interfaces/hash.interface'

@Entity()
export class Providers {
  @PrimaryColumn()
  id: string

  @Column()
  description: string

  @Column('json')
  configurationOptions: ConfigurationOption[]

  @Column('json')
  integrationOptions: IntegrationOptions[]

  @Column('json', { nullable: true, default: null })
  hashes: Hashes
}
