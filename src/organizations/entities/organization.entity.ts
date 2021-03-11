import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from '../../users/entity/user.entity'

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true, select: false })
  testKey: string

  @Column({ unique: true, select: false })
  prodKey: string

  @OneToOne(
    () => User,
    user => user.organization,
  )
  @JoinColumn()
  owner: User

  @OneToMany(
    () => User,
    user => user.organization,
  )
  members: User[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
