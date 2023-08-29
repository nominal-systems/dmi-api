import { Provider } from '../../providers/entities/provider.entity'
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { RefMap } from './refMap.entity'

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

  @OneToMany(() => RefMap, refMap => refMap.providerRef)
  refsMap: RefMap[]
}
