import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Identifier } from './identifier.entity'
import { Type } from 'class-transformer'

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @OneToMany(
    () => Identifier,
    identifier => identifier.patient,
    { cascade: true }
  )
  @Type(() => Identifier)
  identifier: Identifier[]

  @Column()
  sex: string

  @Column()
  species: string

  @Column({ nullable: true })
  breed: string

  @Column({ nullable: true })
  birthdate: string

  @Column({ nullable: true })
  weightMeasurement: number

  @Column({ nullable: true })
  weightUnits: string
}
