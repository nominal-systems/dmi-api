import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

@Schema({ collection: 'external_requests' })
export class ProviderExternalRequests {
    @Prop()
    createdAt: Date

    @Prop()
    provider: string

    @Prop()
    url: string

    @Prop()
    method: string

    @Prop({ type: mongoose.Schema.Types.Mixed })
    body: any
}

export type ProviderExternalRequestDocument = ProviderExternalRequests & mongoose.Document

export const ProviderExternalRequestsSchema = SchemaFactory.createForClass(ProviderExternalRequests)
