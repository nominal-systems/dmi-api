import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { TestResult } from './test-result.entity'
import { ObservationStatus } from '@nominal-systems/dmi-engine-common'
import { ValueQuantity } from '../interfaces/value-quantity.interface'
import { ReferenceRange } from '../interfaces/reference-range.interface'
import { Interpretation } from '../interfaces/interpretation.interface'
import { Exclude } from 'class-transformer'

@Entity()
export class Observation {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Exclude()
  @Column({ nullable: true })
  seq?: number

  @Column()
  code: string

  @Column()
  name: string

  @Column({
    type: 'enum',
    enum: ObservationStatus,
    default: ObservationStatus.DONE
  })
  status: string

  @Column({ nullable: true })
  valueString?: string

  @Column({
    type: 'simple-json',
    nullable: true
  })
  valueQuantity?: ValueQuantity

  // TODO(gb): add media

  @Column({
    type: 'simple-json',
    nullable: true
  })
  interpretation?: Interpretation

  @Column({
    type: 'simple-json',
    nullable: true
  })
  referenceRange?: ReferenceRange[]

  @Column({ type: 'text', nullable: true })
  notes?: string

  @ManyToOne(() => TestResult, (testResult) => testResult.observations, {
    onDelete: 'CASCADE'
  })
  testResult: TestResult

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
