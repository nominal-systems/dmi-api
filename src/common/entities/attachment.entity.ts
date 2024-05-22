import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Report } from '../../reports/entities/report.entity'

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  uri: string

  @Column({ type: 'longtext', nullable: true })
  data: string

  @Column({ nullable: true })
  contentType: string

  @ManyToOne(() => Report, (user) => user.presentedFrom)
  report: Report
}
