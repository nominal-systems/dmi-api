import { Providers } from './../../providers/entities/providers.entity'
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { RefsMap } from './refsMap.entity'

@Entity()
@Index('idx_species_code', ['code'])
export class ProviderRefs {
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

  @ManyToOne(() => Providers)
  @JoinColumn({ name: 'provider', referencedColumnName: 'id' })
  provider: Providers

  @ManyToOne(() => ProviderRefs, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'species', referencedColumnName: 'code' })
  speciesEntity: ProviderRefs | null

  @OneToMany(() => RefsMap, RefsMap => RefsMap.providerRef)
  refsMap: RefsMap[]
}
