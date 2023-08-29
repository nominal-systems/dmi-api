import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Provider } from './provider.entity'

@Entity()
export class IntegrationOption {
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

  @ManyToOne(() => Provider, provider => provider.integrationOptions)
  provider: Provider
}
