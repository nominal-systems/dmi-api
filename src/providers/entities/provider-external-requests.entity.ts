import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

@Schema({ collection: 'external_requests' })
export class ProviderExternalRequests {
    @Prop({ index: true })
    createdAt: Date

    @Prop({ index: true })
    provider: string

    @Prop({ index: true })
    accessionIds?: string[]

    @Prop({ index: true })
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
