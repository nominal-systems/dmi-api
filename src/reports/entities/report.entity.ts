import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Type(() => Patient)
  @ManyToOne(() => Patient, { cascade: true })
  patient: Patient

  @OneToMany(() => TestResult, testResult => testResult.report, {
    cascade: true
  })
  testResultsSet: TestResult[]

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order
}
