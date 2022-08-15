import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ReportStatus } from '@nominal-systems/dmi-engine-common'
import { Order } from '../../orders/entities/order.entity'
import { Type } from 'class-transformer'

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

  @Type(() => Order)
  @OneToOne(() => Order)
  order: Order
}
