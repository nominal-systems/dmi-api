import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { RefsMap } from './refsMap.entity'

@Entity()
@Index('idx_species_code', ['code'])
export class Refs {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  code: string

  @Column({ nullable: true, default: null })
  species?: string

  @Column({
    type: 'enum',
    enum: ['species', 'breed', 'sex']
  })
  type: 'species' | 'breed' | 'sex'

  @ManyToOne(() => Refs, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'species', referencedColumnName: 'code' })
  speciesEntity: Refs | null

  @OneToMany(() => RefsMap, RefsMap => RefsMap.ref)
  refsMap: RefsMap[]
}
