import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Patient } from './patient.entity'
import { Exclude } from 'class-transformer'
import { Practice } from '../../practices/entities/practice.entity'

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

  @ManyToOne(
    () => Practice,
    practice => practice.identifier,
    { onDelete: 'SET NULL' }
  )
  practice: Practice
}
