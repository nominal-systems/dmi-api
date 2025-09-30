import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ProviderRef } from './providerRef.entity'

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
    enum: ['species', 'breed', 'sex'],
  })
  type: 'species' | 'breed' | 'sex'

  @ManyToOne(() => Ref, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'species', referencedColumnName: 'code' })
  speciesEntity: Ref | null

  @ManyToMany(() => ProviderRef, providerRef => providerRef.refs)
  @JoinTable({
    name: 'provider_ref_ref',
    joinColumn: { name: 'refId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'providerRefId', referencedColumnName: 'id' },
  })
  providerRef: ProviderRef[]
}
