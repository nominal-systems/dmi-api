import { Exclude, Type } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
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
  @Exclude()
  testKey: string

  @Column({ unique: true, select: false })
  @Exclude()
  prodKey: string

  @OneToOne(
    () => User,
    user => user.organization
  )
  @JoinColumn()
  @Type(() => User)
  owner: User

  @OneToMany(
    () => User,
    user => user.organization
  )
  @Type(() => User)
  members: User[]

  @OneToMany(
    () => Practice,
    practice => practice.organization
  )
  @Type(() => Practice)
  practices: Practice[]

  @OneToMany(
    () => ProviderConfiguration,
    providerConfiguration => providerConfiguration.organization
  )
  @Type(() => ProviderConfiguration)
  providerConfigurations: ProviderConfiguration[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
