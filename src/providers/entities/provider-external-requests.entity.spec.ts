import { IndexDefinition, IndexOptions, Schema } from 'mongoose'
import { ProviderExternalRequestsSchema } from './provider-external-requests.entity'
import { ProviderExternalRequestsV3Schema } from './provider-external-requests-v3.entity'

// Mongoose 6 types indexes() as IndexDefinition[], but it returns [fields, options] pairs
const indexedFields = (schema: Schema): string[] =>
  (schema.indexes() as unknown as Array<[IndexDefinition, IndexOptions]>)
    .map(([keys]) => Object.keys(keys)[0])
    .sort()

// Mongoose index failures at boot are silent, and the admin external requests filters rely on these
describe('ProviderExternalRequests schemas', () => {
  const fields = [
    'accessionIds',
    'createdAt',
    'integrationId',
    'method',
    'practiceId',
    'provider',
    'status',
  ]

  it('declares the indexes the external_requests_v2 queries rely on', () => {
    expect(indexedFields(ProviderExternalRequestsSchema)).toEqual(fields)
  })

  it('declares the indexes the external_requests_v3 queries rely on', () => {
    expect(indexedFields(ProviderExternalRequestsV3Schema)).toEqual(
      [...fields, 'partitionKey'].sort(),
    )
  })
})
