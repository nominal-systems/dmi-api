import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Veterinarian {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  lastName: string

  @Column({ nullable: true })
  firstName: string

  // TODO(gb): Add contact
}
