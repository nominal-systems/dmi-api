import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

@Schema({ collection: 'external_requests' })
export class ProviderExternalRequests {
    @Prop()
    createdAt: Date

    @Prop()
    provider: string

    @Prop()
    status: number

    @Prop()
    method: string

    @Prop()
    url: string

    @Prop({ type: mongoose.Schema.Types.Mixed })
    headers: any

    @Prop({ type: mongoose.Schema.Types.Mixed })
    body: any

    @Prop({ type: mongoose.Schema.Types.Mixed })
    payload?: any
}

export type ProviderExternalRequestDocument = ProviderExternalRequests & mongoose.Document

export const ProviderExternalRequestsSchema = SchemaFactory.createForClass(ProviderExternalRequests)
