import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string
}
