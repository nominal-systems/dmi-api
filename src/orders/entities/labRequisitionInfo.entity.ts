import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './order.entity'

@Entity()
export class LabRequisitionInfo {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: true })
    DexSuppression?: string

    @Column({ nullable: true })
    CollectionMethod?: string

    @Column({ nullable: true })
    CultureSource?: string

    @Column({ nullable: true })
    HistoSource?: string

    @Column({ nullable: true })
    HistoPatientHistory?: string

    @Column({ nullable: true })
    HistoPathologistName?: string

    @Column({ nullable: true })
    HistoBiopsyType?: string

    @Column({ nullable: true })
    HistoTissue?: string

    @Column({ nullable: true })
    HistoContainerSize?: string

    @Column({ nullable: true })
    HistoSpecimens?: string

    @Column({ nullable: true })
    HistoAccessionID?: string

    @Column({ nullable: true })
    IsSpecialStaining?: boolean

    @Column({ nullable: true })
    HistoSpecialStaining?: string

    @ManyToOne(() => Order, (order) => order.labRequisitionInfo, { onDelete: 'CASCADE' })
    @JoinColumn()
    order: Order
}
