import { Type } from 'class-transformer'
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm'
import { decrypt } from '../../common/utils/crypto.utils'
import configuration from '../../config/configuration'
import { Practice } from '../../practices/entities/practice.entity'
import { ProviderConfiguration } from '../../providers/entities/provider-configuration.entity'

@Entity()
export class Integration {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  practiceId: string

  @Column()
  providerConfigurationId: string

  @Column('json')
  integrationOptions: any

  @ManyToOne(
    () => Practice,
    practice => practice.integrations,
    { onDelete: 'CASCADE' }
  )
  @Type(() => Practice)
  practice: Practice

  @ManyToOne(
    () => ProviderConfiguration,
    providerConfiguration => providerConfiguration.integrations
  )
  @Type(() => ProviderConfiguration)
  providerConfiguration: ProviderConfiguration

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @AfterLoad()
  decryptOptions (): void {
    this.integrationOptions = decrypt(
      this.integrationOptions,
      configuration().secretKey
    )
  }
}
