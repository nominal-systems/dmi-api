import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { ReportStatus } from '@nominal-systems/dmi-engine-common'
import { Type } from 'class-transformer'
import { TestResult } from './test-result.entity'
import { Order } from '../../orders/entities/order.entity'
import { Patient } from '../../orders/entities/patient.entity'
import { Attachment } from '../../common/entities/attachment.entity'

@Entity()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  orderId: string

  @Column({
    type: 'enum',
    enum: ReportStatus,
    default: ReportStatus.REGISTERED
  })
  status: string

  @Type(() => Patient)
  @ManyToOne(() => Patient, { cascade: true })
  patient: Patient

  @OneToMany(() => TestResult, testResult => testResult.report, {
    cascade: true
  })
  testResultsSet: TestResult[]

  @OneToMany(() => Attachment, (attachment) => attachment.report, { cascade: true })
  @JoinTable()
  presentedFrom?: Attachment[]

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
