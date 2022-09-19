import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Patient } from './patient.entity'
import { Exclude } from 'class-transformer'

@Entity()
export class Identifier {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number

  @Column()
  system: string

  @Column()
  value: string

  @ManyToOne(
    () => Patient,
    patient => patient.identifier,
    { onDelete: 'SET NULL' }
  )
  patient: Patient
}
