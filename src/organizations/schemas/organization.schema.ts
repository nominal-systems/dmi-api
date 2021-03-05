import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { User } from '../../users/schemas/user.schema'

@Schema()
export class Organization {
  @Prop()
  name: string

  @Prop({ unique: true })
  testKey: string

  @Prop({ unique: true })
  prodKey: string

  @Prop({ required: true, unique: true, type: Types.ObjectId, ref: 'User' })
  owner: User
}

export type OrganizationDocument = Organization & Document

export const OrganizationSchema = SchemaFactory.createForClass(Organization)
