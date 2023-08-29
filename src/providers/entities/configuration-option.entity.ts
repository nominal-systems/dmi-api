import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Provider } from './provider.entity'

@Entity()
export class ConfigurationOption {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  required: boolean

  @ManyToOne(() => Provider, provider => provider.configurationOptions)
  provider: Provider
}
