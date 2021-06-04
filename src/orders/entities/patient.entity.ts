import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  species: string

  @Column()
  sex: string

  @Column()
  birthdate: string

  @Column()
  breed: string

  @Column()
  weight: number

  @Column()
  weightUnits: string
}
