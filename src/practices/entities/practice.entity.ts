import { Exclude, Type } from 'class-transformer'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { Integration } from '../../integrations/entities/integration.entity'
import { Organization } from '../../organizations/entities/organization.entity'
import slugify from 'slugify'

@Entity()
export class Practice {
  @PrimaryColumn()
  slug: string

  @Column()
  name: string

  @PrimaryColumn()
  @Exclude()
  organizationId: string

  @ManyToOne(
    () => Organization,
    organization => organization.practices
  )
  @Type(() => Organization)
  organization: Organization

  @OneToMany(
    () => Integration,
    integration => integration.practice
  )
  @Type(() => Integration)
  integrations: Integration[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @BeforeInsert()
  @BeforeUpdate()
  generateSlugId (): void {
    this.slug = slugify(this.name, { lower: true })
  }
}
