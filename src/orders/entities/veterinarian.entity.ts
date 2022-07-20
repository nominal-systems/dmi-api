import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Veterinarian {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  lastName: string

  @Column()
  firstName: string

  // TODO(gb): Add contact
}
