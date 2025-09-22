# Migration Script: mongo-shard-migrate.js

This script copies documents from existing (unsharded) collections into new, sharded collections in Cosmos DB (Mongo API), preserving `_id` and running in batches.

Prerequisites
- Destination collections already exist with the desired shard keys and indexes. See `docs/mongo-sharding-migration.md` for shard key choices and index recommendations.
- A valid Mongo/Cosmos connection string with write access.
- Dependencies installed: `npm install`.

Create destination collections (example)
- events_v2: `db.createCollection('events_v2', { shardKey: { integrationId: 'hashed' } })`
- external_requests_v2: `db.createCollection('external_requests_v2', { shardKey: { provider: 'hashed' } })`
- internal_events_v2: `db.createCollection('internal_events_v2', { shardKey: { createdAt: 'hashed' } })`

Usage
- Environment: set `MONGO_URI` to your Cosmos DB connection string.
- Preferred (simple): run with Node.js:

```
MONGO_URI='mongodb://...' node scripts/mongo-shard-migrate.js \
  --collections=events,external_requests,internal_events \
  --suffix=_v2 \
  --batch=1000
```

- Or use the npm alias (recommended for convenience):

```
MONGO_URI='mongodb://...' npm run migrate:mongo-shards -- --batch=2000 --suffix=_v3
```

- Notes:
  - Extra flags are passed after `--`.
  - Defaults in the alias: `--collections=events,external_requests,internal_events --suffix=_v2 --batch=1000`.
  - Optional flags:
    - `--mode=replace|insertOnly` (default: `replace`). `insertOnly` avoids rewriting docs that already exist (uses `$setOnInsert`).
    - `--checkpoint=/path/to/state.json` (default: `scripts/.mongo-shard-migrate.state.json`).
    - `--resume=true|false` (default: `true`). When true, resumes from last saved `_id` per collection.
    - `--retries=<n>` (default: `3`). Number of retry attempts for failed upsert operations.
    - `--retryDelayMs=<ms>` (default: `500`). Delay between retry attempts in milliseconds.

- Alternative (TypeScript): if your environment supports ts-node:

```
MONGO_URI='mongodb://...' npx ts-node -r tsconfig-paths/register scripts/mongo-shard-migrate.ts \
  --collections=events,external_requests,internal_events \
  --suffix=_v2 \
  --batch=1000
```

Options
- `--collections`: comma-separated list of source collections to migrate. Supported: `events`, `external_requests`, `internal_events`. Default: all three.
- `--suffix`: suffix appended to destination collection names. Default: `_v2` (e.g., `events_v2`).
- `--batch`: batch size for reads/writes. Default: `1000`.

Examples
- Migrate only events with smaller batches:
```
MONGO_URI='mongodb://...' node scripts/mongo-shard-migrate.js \
  --collections=events \
  --suffix=_v2 \
  --batch=200
```

- Migrate external_requests and internal_events:
```
MONGO_URI='mongodb://...' node scripts/mongo-shard-migrate.js \
  --collections=external_requests,internal_events \
  --suffix=_v2
```

Behavior and Safety
- The script preserves `_id` and uses `replaceOne(..., { upsert: true })`, making it restartable and safe to re-run.
- It processes documents with a forward `_id` cursor to limit memory usage.
- Verbose progress logs each batch: migrated totals, rate (docs/s), optional createdAt span, percent complete (if total can be estimated), and a final summary with elapsed time.
- Checkpointing: Writes a checkpoint file with the last processed `_id` and document counts so you can stop and resume later without reprocessing. When `--mode=insertOnly`, reprocessing already-migrated docs is safe and cheap (no-op updates).
- Graceful shutdown: Pressing Ctrl-C (SIGINT) or sending SIGTERM saves the current checkpoint immediately and stops after the current batch, allowing you to resume cleanly.
- Error handling and retries: Failed upserts are retried up to `--retries` times with `--retryDelayMs` delay; remaining failures are logged and tracked in the checkpoint for a later repair pass. Batch logs include successes, failures, and retry count.
- Ensure destination collections exist first; the script does not create them.

Verification
- Compare counts before cutover:
```
db.events.countDocuments()
db.events_v2.countDocuments()
```
- Spot-check a few documents by `_id` in both collections.

Cutover
- Update Mongoose schema collection names to the new collections and deploy. See `docs/mongo-sharding-migration.md` for details and clean-up steps.
