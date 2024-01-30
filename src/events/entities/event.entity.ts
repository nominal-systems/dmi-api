import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { EventType } from '../constants/event-type.enum'
import { EventNamespace } from '../constants/event-namespace.enum'
import { EventData } from '../interfaces/event-data.interface'

@Schema({ timestamps: { updatedAt: false } })
export class Event {
  @Prop({ unique: true, index: true })
  seq: number

  @Prop({ enum: EventNamespace })
  namespace: string

  @Prop({ enum: EventType })
  type: string

  @Prop()
  integrationId: string

  @Prop({ type: mongoose.Schema.Types.Mixed })
  data: EventData

  @Prop({ type: mongoose.Schema.Types.Mixed })
  context: any

  @Prop({ index: true })
  createdAt: Date

  @Prop({ expires: '30d' })
  currentTime: number
}

export type EventDocument = Event & mongoose.Document

export const EventSchema = SchemaFactory.createForClass(Event)
