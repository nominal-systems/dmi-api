import { Exclude, Type } from 'class-transformer'
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { decrypt } from '../../common/utils/crypto.utils'
import configuration from '../../config/configuration'
import { Integration } from '../../integrations/entities/integration.entity'
import { Organization } from '../../organizations/entities/organization.entity'

@Entity()
export class ProviderConfiguration {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  diagnosticProviderId: string

  @Column('json')
  providerConfigurationOptions: any

  @Column()
  @Exclude()
  organizationId: string

  @OneToMany(
    () => Integration,
    integration => integration.providerConfiguration
  )
  @Type(() => Integration)
  integrations: Integration[]

  @ManyToOne(
    () => Organization,
    organization => organization.providerConfigurations
  )
  @Type(() => Organization)
  organization: Organization

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @AfterLoad()
  decryptOptions (): void {
    this.providerConfigurationOptions = decrypt(
      this.providerConfigurationOptions,
      configuration().secretKey
    )
  }
}
