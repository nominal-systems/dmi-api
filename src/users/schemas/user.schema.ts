import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Organization } from '../../organizations/schemas/organization.schema'

@Schema()
export class User {
  @Prop({ unique: true })
  email: string

  @Prop()
  password: string

  @Prop({ type: Types.ObjectId, ref: Organization.name })
  organization: Organization
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)
