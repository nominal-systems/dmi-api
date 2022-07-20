import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  sex: string

  @Column()
  species: string

  @Column()
  breed: string

  @Column({ nullable: true })
  birthdate: string

  @Column({ nullable: true })
  weightMeasurement: number

  @Column({ nullable: true })
  weightUnits: string
}
