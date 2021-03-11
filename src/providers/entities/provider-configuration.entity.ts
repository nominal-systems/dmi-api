import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class ProviderConfiguration {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  diagnosticProviderId: string

  @Column('json')
  providerConfigurationOptions: any

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
