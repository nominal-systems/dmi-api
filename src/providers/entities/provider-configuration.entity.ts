import { Exclude, Type } from 'class-transformer'
import {
  AfterInsert,
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
  providerId: string

  @Column('json')
  configurationOptions: any

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

  @AfterInsert()
  @AfterLoad()
  decryptOptions (): void {
    this.configurationOptions = decrypt(
      this.configurationOptions,
      configuration().secretKey
    )
  }
}
