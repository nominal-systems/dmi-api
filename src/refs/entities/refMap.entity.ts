import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Ref } from './ref.entity'
import { ProviderRef } from './providerRef.entity'

@Entity()
export class RefMap {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Ref, ref => ref.refsMap)
  ref: Ref

  @ManyToOne(() => ProviderRef, providerRef => providerRef.refsMap)
  providerRef: ProviderRef
}
