import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class TestResult {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  code: string

  @Column()
  name: string

  @Column({ nullable: true })
  deviceId: string

  @Column({ nullable: true })
  notes: string

  // TODO(gb): add observations
}
