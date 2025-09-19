import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ collection: 'internal_events_v2', timestamps: true })
export class InternalEvent {
  @Prop({ index: true })
  createdAt: Date

  @Prop({ required: true })
  pattern: string

  @Prop({ required: true, type: Object })
  payload: any

  @Prop()
  handlerName: string

  @Prop()
  methodName: string

  @Prop({ index: true })
  accessionIds: string[]
}

export type EventLogDocument = InternalEvent & Document;

export const InternalEventSchema = SchemaFactory.createForClass(InternalEvent)
