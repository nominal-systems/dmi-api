import { Exclude, Type } from 'class-transformer'
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { decrypt } from '../../common/utils/crypto.utils'
import configuration from '../../config/configuration'
import { Practice } from '../../practices/entities/practice.entity'
import { ProviderConfiguration } from '../../providers/entities/provider-configuration.entity'
import { IntegrationStatus } from '../constants/integration-status.enum'

@Entity()
export class Integration {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @Exclude()
  practiceId: string

  @Column()
  @Exclude()
  providerConfigurationId: string

  @Column({
    type: 'enum',
    enum: IntegrationStatus,
    default: IntegrationStatus.RUNNING
  })
  status: string

  @ManyToOne(
    () => Practice,
    practice => practice.integrations,
    { onDelete: 'CASCADE' }
  )
  @Type(() => Practice)
  practice: Practice

  @Column('json')
  integrationOptions: any

  @ManyToOne(
    () => ProviderConfiguration,
    providerConfiguration => providerConfiguration.integrations,
    { onDelete: 'CASCADE', orphanedRowAction: 'delete' }
  )
  @Type(() => ProviderConfiguration)
  providerConfiguration: ProviderConfiguration

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date

  @AfterLoad()
  decryptOptions (): void {
    this.integrationOptions = decrypt(
      this.integrationOptions,
      configuration().secretKey
    )
  }
}
