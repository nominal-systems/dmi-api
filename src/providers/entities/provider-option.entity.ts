import { Exclude } from 'class-transformer'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Provider } from './provider.entity'

@Entity()
export class ProviderOption {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number

  @Column()
  type: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  required: boolean

  @Column({
    type: 'enum',
    enum: ['configuration', 'integration']
  })
  @Exclude()
  providerOptionType: 'configuration' | 'integration'

  @ManyToOne(() => Provider, provider => provider.options)
  provider: Provider
}
