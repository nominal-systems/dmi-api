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
import { Practice } from '../../practices/entities/practice.entity'
import { ProviderConfiguration } from '../../providers/entities/provider-configuration.entity'
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

  @OneToMany(() => Practice, practice => practice.organization)
  practices: Practice[]

  @OneToMany(() => ProviderConfiguration, providerConfiguration => providerConfiguration.organization)
  providerConfigurations: ProviderConfiguration[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
