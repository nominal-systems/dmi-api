import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  lastName: string

  @Column()
  firstName: string
}