
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { Hashes } from '../interfaces/hash.interface'
import { Exclude } from 'class-transformer'
import { ProviderOption } from './provider-option.entity'

@Entity()
export class Provider {
  @PrimaryColumn()
  id: string

  @Column()
  description: string

  @OneToMany(() => ProviderOption, option => option.provider)
  @Exclude()
  options: ProviderOption[]

  @Column('json', { nullable: true, default: null })
  @Exclude()
  hashes: Hashes

  configurationOptions: ProviderOption[]

  integrationOptions: ProviderOption[]
}