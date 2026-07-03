import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export enum EventDeliveryStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED'
}

@Schema({ collection: 'event_deliveries', timestamps: true })
export class EventDelivery {
  @Prop({ index: true })
  subscriptionId: string

  @Prop({ type: mongoose.Schema.Types.Mixed })
  event: any

  @Prop({ index: true })
  seq: number

  @Prop({ enum: EventDeliveryStatus, default: EventDeliveryStatus.PENDING, index: true })
  status: string

  @Prop({ default: 0 })
  attempts: number

  @Prop({ index: true })
  nextAttemptAt: Date

  @Prop()
  claimedAt: Date

  @Prop()
  lastError: string

  @Prop()
  deliveredAt: Date

  @Prop({ type: Date, expires: '30d', default: () => new Date() })
  expiresAt: Date
}

export type EventDeliveryDocument = EventDelivery & mongoose.Document

export const EventDeliverySchema = SchemaFactory.createForClass(EventDelivery)

EventDeliverySchema.index({ subscriptionId: 1, status: 1, seq: 1 })
