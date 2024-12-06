import { Type } from 'class-transformer'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Identifier } from './identifier.entity'
import { Contact } from './contact'

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  lastName: string

  @Column({ nullable: true })
  firstName: string

  @Column(() => Contact)
  contact: Contact

  // TODO(gb): Add address
  // TODO(gb): Add isDoctor

  @OneToMany(
    () => Identifier,
    identifier => identifier.client,
    { cascade: true }
  )
  @Type(() => Identifier)
  identifier: Identifier[]

  @Column({ default: false })
  isStaff: boolean
}
