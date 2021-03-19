import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export class EventValue {
  @Prop()
  orderId: string

  @Prop()
  status: string
}

@Schema({ timestamps: { updatedAt: false } })
export class Event {
  @Prop({ unique: true })
  seq: number

  @Prop()
  namespace: string

  @Prop()
  type: string

  @Prop({ type: EventValue })
  value: EventValue

  @Prop({ type: mongoose.Schema.Types.Mixed })
  context: any

  @Prop({ expires: '30d' })
  createdAt: Date
}

export type EventDocument = Event & mongoose.Document

export const EventSchema = SchemaFactory.createForClass(Event)
