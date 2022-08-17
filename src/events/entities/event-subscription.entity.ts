import {
  AfterInsert,
  AfterLoad,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'
import { EventType } from '../constants/event-type.enum'
import { EventSubscriptionTypes } from '../constants/event-subscription-types.enum'
import { Exclude } from 'class-transformer'
import { decrypt, encrypt } from '../../common/utils/crypto.utils'
import configuration from '../../config/configuration'

@Entity()
@Unique(['event_type', 'subscription_type', 'organizationId'])
export class EventSubscription {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'enum',
    enum: EventType
  })
  event_type: EventType

  @Column({
    type: 'enum',
    enum: EventSubscriptionTypes,
    default: EventSubscriptionTypes.AZURE_EVENT_HUBS
  })
  subscription_type: EventSubscriptionTypes

  @Column('json')
  subscription_options: any

  @Column()
  @Exclude()
  organizationId: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @BeforeInsert()
  encryptOptions (): void {
    this.subscription_options = encrypt(
      this.subscription_options,
      configuration().secretKey
    )
  }

  @AfterLoad()
  @AfterInsert()
  decryptOptions (): void {
    this.subscription_options = decrypt(
      this.subscription_options,
      configuration().secretKey
    )
  }
}
