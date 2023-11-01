import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  lastName: string

  @Column({ nullable: true })
  firstName: string

  // TODO(gb): Add contact
  // TODO(gb): Add address
  // TODO(gb): Add isDoctor

  @Column({ default: false })
  isStaff: boolean
}
