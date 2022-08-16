import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm'
import { EventType } from '../constants/event-type.enum'
import { EventSubscriptionTypes } from '../constants/event-subscription-types.enum'
import { Exclude } from 'class-transformer'

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

  @Column()
  @Exclude()
  organizationId: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
