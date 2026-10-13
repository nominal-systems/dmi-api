import { IndexDefinition, IndexOptions } from 'mongoose'
import { EventSchema } from './event.entity'

describe('EventSchema', () => {
  // Mongoose index failures at boot are silent, and dropping the wildcard index relies on these
  it('declares the indexes the events_v2 queries rely on', () => {
    // Mongoose 6 types indexes() as IndexDefinition[], but it returns [fields, options] pairs
    const indexes = EventSchema.indexes() as unknown as Array<[IndexDefinition, IndexOptions]>
    const fields = indexes.map(([keys]) => Object.keys(keys)[0]).sort()

    expect(fields).toEqual([
      'accessionId',
      'createdAt',
      'integrationId',
      'practiceId',
      'providerId',
      'seq',
      'type',
    ])
  })
})
