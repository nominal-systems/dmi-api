import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { RefMap } from './refMap.entity'

@Entity()
@Index('idx_species_code', ['code'])
export class Ref {
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

  @ManyToOne(() => Ref, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'species', referencedColumnName: 'code' })
  speciesEntity: Ref | null

  @OneToMany(() => RefMap, refMap => refMap.ref)
  refsMap: RefMap[]
}
