# MongoDB Sharding Plan and Migration (Cosmos DB)

This document proposes shard keys for the three MongoDB collections used by the DMI API and outlines a safe, step‑by‑step migration to new, sharded collections in Azure Cosmos DB API for MongoDB.

Cosmos DB does not allow adding a shard key to an existing collection. New collections must be created with a shard key and data must be migrated.

## Collections and Workloads

- `events`
  - Fields: `seq`, `namespace`, `type`, `providerId`, `practiceId`, `integrationId`, `accessionId`, `data`, `context`, `createdAt`, `currentTime`.
  - Access patterns:
    - Admin list/filter by `providerId`, `integrationId`, `type`, `createdAt` window; sort by `seq`.
    - Transaction logs fetch by `accessionId`.
    - Incremental fetch uses `seq > X`.
- `external_requests`
  - Fields: `createdAt`, `provider`, `accessionIds` (array), `status`, `method`, `url`, `headers`, `body`, `payload`.
  - Access patterns:
    - List/filter by `provider`, `status` ranges, `method`, `createdAt` window; sort by `createdAt`.
    - Transaction logs fetch by `accessionIds` contains an ID.
- `internal_events`
  - Fields: `createdAt` (timestamps), `pattern`, `payload`, `handlerName`, `methodName`, `accessionIds` (array).
  - Access patterns:
    - Lookup by `accessionIds` contains an ID.

## Shard Key Selection

General guidance for Cosmos DB (Mongo API):
- Prefer high‑cardinality keys that distribute writes evenly.
- Prefer keys used with equality in frequent queries to reduce cross‑partition fan‑out.
- Keys must be present on every document and are immutable once written.

Recommended keys:
- `events`: shard key on `integrationId` (hashed)
  - Rationale: high cardinality, present on every row, common equality filter; hashed key avoids hotspotting and distributes writes across partitions even if traffic is skewed. Queries by `integrationId` route to a single partition.
  - Alternatives considered: `practiceId` (also viable), `accessionId` (good for transaction log lookups but less aligned with frequent admin filters), `createdAt` (monotonic; poor without hashing and not used with equality).
- `external_requests`: shard key on `provider` (hashed)
  - Rationale: strong alignment with list/stats queries (frequent equality filter), good distribution across providers with hashing, simple and always present.
  - Not suitable: `accessionIds` (array; not allowed as a shard/partition key), `createdAt` alone (monotonic; poor for distribution without hashing and not an equality filter).
- `internal_events`: shard key on `createdAt` (hashed)
  - Rationale: primary query is by `accessionIds` (array, unsuitable). `pattern` has low cardinality; `createdAt` exists for all docs and, when hashed, balances writes. We accept cross‑partition fan‑out for accessionId lookups.

Notes:
- "Hashed" refers to Mongo hashed shard keys. In Cosmos DB API for Mongo, specifying `"hashed"` on `createCollection` is supported and maps to its internal partitioning.
- If your workload is primarily per‑practice, you may choose `practiceId` (hashed) for `events` instead of `integrationId`. The migration plan below works the same; just adjust the key.

## New Collection Names

Create parallel collections to enable a staged migration:
- `events_v2` with shard key `{ integrationId: 'hashed' }`
- `external_requests_v2` with shard key `{ provider: 'hashed' }`
- `internal_events_v2` with shard key `{ createdAt: 'hashed' }`

## Migration Plan

1) Prepare
- Ensure you have a connection string to the Cosmos DB (Mongo API) cluster for the same database.
- Verify all documents have the chosen shard key fields populated (`integrationId`, `provider`, `createdAt`). Fix or backfill any missing values first.

2) Create sharded collections
- Connect with `mongosh` to your target database and run:
  - `db.createCollection('events_v2', { shardKey: { integrationId: 'hashed' } })`
  - `db.createCollection('external_requests_v2', { shardKey: { provider: 'hashed' } })`
  - `db.createCollection('internal_events_v2', { shardKey: { createdAt: 'hashed' } })`

3) Create indexes used by the app
- Although Cosmos auto‑indexes, create explicit indexes used by queries/sorts to maintain behavior and performance:

  - Events:
```
db.events_v2.createIndex({ seq: -1 })
db.events_v2.createIndex({ providerId: 1 })
db.events_v2.createIndex({ integrationId: 1 })
db.events_v2.createIndex({ practiceId: 1 })
db.events_v2.createIndex({ accessionId: 1 })
db.events_v2.createIndex({ createdAt: -1 })
```
  - External requests:
```
db.external_requests_v2.createIndex({ createdAt: -1 })
db.external_requests_v2.createIndex({ provider: 1 })
db.external_requests_v2.createIndex({ status: 1 })
db.external_requests_v2.createIndex({ method: 1 })
db.external_requests_v2.createIndex({ accessionIds: 1 })
```
  - Internal events:
```
db.internal_events_v2.createIndex({ createdAt: -1 })
db.internal_events_v2.createIndex({ pattern: 1 })
db.internal_events_v2.createIndex({ accessionIds: 1 })
```

4) Backfill data
- Run the provided script `scripts/mongo-shard-migrate.js` (preferred) to copy in batches from old → new collections while preserving `_id`:
  - `npm i` (if needed)
  - `MONGO_URI='mongodb://...' node scripts/mongo-shard-migrate.js --collections=events,external_requests,internal_events --suffix=_v2 --batch=1000`
- Alternatively, use the TypeScript variant if you prefer ts-node:
  - `MONGO_URI='mongodb://...' npx ts-node -r tsconfig-paths/register scripts/mongo-shard-migrate.ts --collections=events,external_requests,internal_events --suffix=_v2 --batch=1000`
- Or use external tooling (ADF, `mongodump`/`mongorestore`, `mongoexport`/`mongoimport`) ensuring `_id` is preserved and shard key fields are present.

5) Dual‑write or maintenance window
- Safer approach: deploy an app version that dual‑writes new events/requests to both old and new collections during backfill. Once backfill is complete, cut reads to the new collections.
- Alternatively, schedule a brief maintenance window to freeze writers, run backfill to completion, then cut over.

6) Cutover application schemas
- Update Mongoose schema collection names to point to the new collections:
  - `Event` schema: add `{ collection: 'events_v2' }` to `@Schema()` in `src/events/entities/event.entity.ts`.
  - `ProviderExternalRequests` schema already pins `collection: 'external_requests'` — change to `'external_requests_v2'` in `src/providers/entities/provider-external-requests.entity.ts`.
  - `InternalEvent` schema pins `collection: 'internal_events'` — change to `'internal_events_v2'` in `src/internal-event-logging/schemas/internal-event.schema.ts`.
- Deploy.

7) Verify
- Compare document counts: `db.events.countDocuments()` vs `db.events_v2.countDocuments()` (repeat for other collections).
- Run the app and validate:
  - Admin events list and stats endpoints respond as expected.
  - External requests list/details and stats render correctly.
  - Transaction logs resolve events across all three collections.

8) Cleanup
- After a bake period, optionally drop the old collections:
  - `db.events.drop()`, `db.external_requests.drop()`, `db.internal_events.drop()`

## Script: mongo-shard-migrate.js

Location: `scripts/mongo-shard-migrate.js`

Purpose: Copies documents from the current collections into the new sharded collections in batches, preserving `_id` and leaving documents unchanged.

Usage:
- `MONGO_URI='mongodb://...' node scripts/mongo-shard-migrate.js --collections=events,external_requests,internal_events --suffix=_v2 --batch=1000`
- Options:
  - `--collections`: comma‑separated list of collections to migrate (`events`, `external_requests`, `internal_events`).
  - `--suffix`: suffix for new collection names (default `_v2`).
  - `--batch`: batch size (default `1000`).

Notes and caveats:
- The script assumes the destination collections already exist with the chosen shard keys and required indexes.
- It uses a forward `_id` cursor and `upsert` to make it restartable.
- If you enable dual‑write during migration, you can safely re‑run to catch up without duplicates.
