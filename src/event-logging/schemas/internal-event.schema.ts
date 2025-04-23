import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type EventLogDocument = InternalEvent & Document;

@Schema({ collection: 'iternal-events', timestamps: true })
export class InternalEvent {
  @Prop({ required: true })
  pattern: string

  @Prop({ required: true, type: Object })
  payload: any

  @Prop()
  handlerName: string

  @Prop()
  methodName: string

  // TODO(gb): add accessionIds
}

export const InternalEventSchema = SchemaFactory.createForClass(InternalEvent)
