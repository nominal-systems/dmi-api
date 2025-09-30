import { Provider } from '../../providers/entities/provider.entity'
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Ref } from './ref.entity'

@Entity()
export class ProviderRef {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: null })
  @Index()
  code: string

  @Column()
  name: string

  @Column({ nullable: true, default: null })
  species?: string

  @Column({
    type: 'enum',
    enum: ['species', 'breed', 'sex'],
  })
  type: 'species' | 'breed' | 'sex'

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider', referencedColumnName: 'id' })
  provider: Provider

  @ManyToOne(() => ProviderRef, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'species', referencedColumnName: 'code' })
  speciesEntity: ProviderRef | null

  @ManyToMany(() => Ref, ref => ref.providerRef)
  refs: Ref[]
}
