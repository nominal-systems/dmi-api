import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Refs } from './refs.entity'
import { ProviderRefs } from './providerRefs.entity'

@Entity()
export class RefsMap {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Refs, ref => ref.refsMap)
  ref: Refs

  @ManyToOne(() => ProviderRefs, providerRef => providerRef.refsMap)
  providerRef: ProviderRefs
}
