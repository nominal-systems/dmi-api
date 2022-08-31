import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TestResult } from './test-result.entity'
import { ObservationStatus } from '@nominal-systems/dmi-engine-common'
import { ValueQuantity } from '../interfaces/value-quantity.interface'
import { ReferenceRange } from '../interfaces/reference-range.interface'

@Entity()
export class Observation {
  @PrimaryGeneratedColumn('uuid')
  id: string

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

  @Column({ nullable: true })
  interpretation?: string

  @Column({
    type: 'simple-json',
    nullable: true
  })
  referenceRange?: ReferenceRange[]

  @Column({ nullable: true })
  notes?: string

  @ManyToOne(() => TestResult, (testResult) => testResult.observations, {
    onDelete: 'CASCADE'
  })
  testResult: TestResult
}
