import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { Provider } from '../../providers/entities/provider.entity'
import { Ref } from './ref.entity'
import { ProviderRef } from './providerRef.entity'

// Stores an optional default breed for a specific mapping from a DMI ref species
// to a provider's species code for a given provider.
@Entity()
@Unique(['provider', 'refSpecies', 'providerSpecies'])
export class ProviderSpeciesMappingDefaultBreed {
  @PrimaryGeneratedColumn()
  id: number

  // DMI Ref species
  @ManyToOne(() => Ref, { onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'refSpecies', referencedColumnName: 'id' })
  refSpecies: Ref

  // Provider species
  @ManyToOne(() => ProviderRef, { onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'providerSpecies', referencedColumnName: 'id' })
  providerSpecies: ProviderRef

  // Provider breed to use when no breed or unmapped breed (optional per mapping)
  @ManyToOne(() => ProviderRef, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'defaultBreed', referencedColumnName: 'id' })
  defaultBreed?: ProviderRef | null

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider', referencedColumnName: 'id' })
  provider: Provider
}
