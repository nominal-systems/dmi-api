import { Type } from 'class-transformer'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Integration } from '../../integrations/entities/integration.entity'
import { Client } from './client.entity'
import { Patient } from './patient.entity'
import { Test } from './test.entity'
import { Veterinarian } from './veterinarian.entity'

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  integrationId: string

  @Column()
  notes: string

  @Column()
  technician: string

  @Column()
  editable: boolean

  @Type(() => Integration)
  @ManyToOne(() => Integration)
  integration: Integration

  @Type(() => Patient)
  @ManyToOne(() => Patient, { cascade: true })
  patient: Patient

  @Type(() => Client)
  @ManyToOne(() => Client, { cascade: true })
  client: Client

  @Type(() => Test)
  @ManyToMany(() => Test, { cascade: true })
  @JoinTable()
  tests: Test[]

  @Type(() => Veterinarian)
  @ManyToOne(() => Veterinarian, { cascade: true })
  veterinarian: Veterinarian
}