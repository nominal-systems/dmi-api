import { Type } from 'class-transformer'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Identifier } from './identifier.entity'

@Entity()
export class Veterinarian {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  lastName: string

  @Column({ nullable: true })
  firstName: string

  @OneToMany(
    () => Identifier,
    identifier => identifier.veterinarian,
    { cascade: true }
  )
  @Type(() => Identifier)
  identifier: Identifier[]

  // TODO(gb): Add contact
}
