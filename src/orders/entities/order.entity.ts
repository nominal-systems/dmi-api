import { Type } from 'class-transformer'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Client } from './client.entity'
import { Patient } from './patient.entity'
import { Veterinarian } from './veterinarian.entity'

export class Test {
  code: string
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  notes: string

  @Column()
  technician: string

  @Column()
  editable: boolean

  @Type(() => Patient)
  @ManyToOne(() => Patient, { cascade: true })
  patient: Patient

  @Type(() => Client)
  @ManyToOne(() => Client, { cascade: true })
  client: Client

  @Type(() => Test)
  tests: Test[]

  @Type(() => Veterinarian)
  @ManyToOne(() => Veterinarian, { cascade: true })
  veterinarian: Veterinarian
}
