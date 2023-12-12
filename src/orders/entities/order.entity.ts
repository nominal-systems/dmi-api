import { Exclude, Type } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Integration } from '../../integrations/entities/integration.entity'
import { LabRequisitionInfo } from './labRequisitionInfo.entity'
import { Attachment } from './attachment.entity'
import { Client } from './client.entity'
import { Patient } from './patient.entity'
import { Test } from './test.entity'
import { Veterinarian } from './veterinarian.entity'

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  requisitionId: string

  // TODO(gb): rename to accessionId?
  @Column({ nullable: true })
  externalId: string

  @Column()
  integrationId: string

  @Type(() => Attachment)
  @ManyToOne(() => Attachment, { cascade: true })
  manifest: Attachment

  @Column({ nullable: true })
  submissionUri: string

  // TODO(gb): validate status
  @Column({ nullable: true })
  status: string

  @Type(() => Patient)
  @ManyToOne(() => Patient, { cascade: true })
  patient: Patient

  @Type(() => Client)
  @ManyToOne(() => Client, { cascade: true })
  client: Client

  @Type(() => Veterinarian)
  @ManyToOne(() => Veterinarian, { cascade: true })
  veterinarian: Veterinarian

  @Type(() => Test)
  @ManyToMany(() => Test, { cascade: true })
  @JoinTable()
  tests: Test[]

  @Column('json', { nullable: true })
  @Type(() => String)
  devices?: string[]

  @Column({ nullable: true })
  technician: string

  @Column({ nullable: true })
  notes: string

  @Column({ default: false })
  editable: boolean

  @ManyToMany(() => LabRequisitionInfo, { cascade: true })
  @JoinColumn()
  labRequisitionInfo: LabRequisitionInfo

  @Type(() => Integration)
  @ManyToOne(() => Integration)
  @Exclude()
  integration: Integration

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
