import { Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Test {
  @PrimaryColumn()
  code: string
}
