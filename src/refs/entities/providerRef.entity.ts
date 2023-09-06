import { Provider } from '../../providers/entities/provider.entity'
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Ref } from './ref.entity'

@Entity()
@Index('idx_species_code', ['code'])
export class ProviderRef {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  code: string

  @Column()
  name: string

  @Column({ nullable: true, default: null })
  species?: string

  @Column({
    type: 'enum',
    enum: ['species', 'breed', 'sex']
  })
  type: 'species' | 'breed' | 'sex'

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider', referencedColumnName: 'id' })
  provider: Provider

  @ManyToOne(() => ProviderRef, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'species', referencedColumnName: 'code' })
  speciesEntity: ProviderRef | null

  @ManyToOne(() => Ref, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'refId', referencedColumnName: 'id' })
  ref: Ref | null
}
