import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Report } from './report.entity'
import { TestResultStatus } from '@nominal-systems/dmi-engine-common'
import { Observation } from './observation.entity'

@Entity()
export class TestResult {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  code: string

  @Column()
  name: string

  @Column({
    type: 'enum',
    enum: TestResultStatus,
    default: TestResultStatus.PENDING
  })
  status: string

  @Column({ nullable: true })
  deviceId?: string

  @Column({ nullable: true })
  notes?: string

  @OneToMany(() => Observation, observation => observation.testResult, {
    cascade: true
  })
  observations: Observation[]

  @ManyToOne(() => Report, (report) => report.testResultsSet, {
    onDelete: 'CASCADE'
  })
  report: Report
}
