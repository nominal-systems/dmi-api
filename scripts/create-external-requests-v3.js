/*
  Creates the sharded external_requests_v3 collection on Cosmos DB (Mongo API)
  with its TTL index, ahead of deploying the code that writes to it. The app
  also does this at startup (ProvidersService.onModuleInit), so running this
  script is optional but lets ops verify the shard key before the deploy.

  Idempotent — safe to run repeatedly.

  Usage:
    MONGO_URI='mongodb://...' node scripts/create-external-requests-v3.js
*/

const mongoose = require('mongoose')

const COLLECTION = 'external_requests_v3'
const SHARD_KEY = 'partitionKey'
const TTL_SECONDS = Number(process.env.EXTERNAL_REQUESTS_TTL_SECONDS || 2592000)

async function main() {
  const MONGO_URI = process.env.MONGO_URI
  if (!MONGO_URI) {
    console.error('MONGO_URI is required')
    process.exitCode = 1
    return
  }

  const conn = await mongoose.createConnection(MONGO_URI, {
    bufferCommands: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  try {
    try {
      await conn.db.command({
        customAction: 'CreateCollection',
        collection: COLLECTION,
        shardKey: SHARD_KEY,
      })
      console.log(`Created sharded collection ${COLLECTION} (shard key: ${SHARD_KEY})`)
    } catch (err) {
      const msg = (err && err.message) || String(err)
      if (msg.includes('already exists')) {
        console.log(`${COLLECTION} already exists — skipping creation`)
      } else {
        throw err
      }
    }

    await conn.db.collection(COLLECTION).createIndex(
      { _ts: 1 },
      { expireAfterSeconds: TTL_SECONDS, name: 'ttl_ts_30d' }
    )
    console.log(`Ensured TTL index ttl_ts_30d (_ts, expireAfterSeconds=${TTL_SECONDS})`)

    const stats = await conn.db.command({ customAction: 'GetCollection', collection: COLLECTION }).catch(() => undefined)
    if (stats) {
      console.log('Collection info:', JSON.stringify(stats))
    }
  } finally {
    await conn.close()
  }
}

main().catch((err) => {
  console.error('Failed:', err.message || err)
  process.exitCode = 1
})
