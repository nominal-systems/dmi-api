import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { ProviderExternalRequests } from './provider-external-requests.entity'

export const EXTERNAL_REQUESTS_V3_COLLECTION = 'external_requests_v3'
export const EXTERNAL_REQUESTS_V3_SHARD_KEY = 'partitionKey'

// Cosmos DB caps every logical partition at 30 GB. v2 was sharded on
// `provider` (cardinality 3-4), so a single busy provider (idexx) fills its
// partition and every write then fails with 403 / Substatus 1014. The v3
// partition key scopes documents to provider + practice (falling back to
// integration, then 'na') + UTC day, so no logical partition can outgrow one
// day of one practice's traffic for one provider.
export function buildExternalRequestPartitionKey (
  provider: string,
  scopeId: string | undefined,
  createdAt: Date
): string {
  const day = createdAt.toISOString().slice(0, 10).replace(/-/g, '')
  return `${provider}:${scopeId ?? 'na'}:${day}`
}

@Schema({ collection: EXTERNAL_REQUESTS_V3_COLLECTION })
export class ProviderExternalRequestsV3 extends ProviderExternalRequests {
  @Prop({ required: true, index: true })
  partitionKey: string
}

export type ProviderExternalRequestV3Document = ProviderExternalRequestsV3 & mongoose.Document

export const ProviderExternalRequestsV3Schema = SchemaFactory.createForClass(ProviderExternalRequestsV3)
