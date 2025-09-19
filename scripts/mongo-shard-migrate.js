/*
  Plain Node.js migration script (no TypeScript):
  Copies documents from existing collections into new sharded collections, preserving _id.

  Usage example:
    MONGO_URI='mongodb://...' node scripts/mongo-shard-migrate.js \
      --collections=events,external_requests,internal_events --suffix=_v2 --batch=1000
*/

const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

function humanDuration(ms) {
  const s = Math.floor(ms / 1000)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const parts = []
  if (h) parts.push(`${h}h`)
  if (m) parts.push(`${m}m`)
  parts.push(`${sec}s`)
  return parts.join(' ')
}

function parseArgs() {
  const args = process.argv.slice(2)
  const out = {
    collections: 'events,external_requests,internal_events',
    suffix: '_v2',
    batch: 1000,
    mode: 'replace', // replace | insertOnly
    checkpoint: path.join(__dirname, '.mongo-shard-migrate.state.json'),
    resume: true,
  }
  for (const arg of args) {
    const [k, v] = arg.split('=')
    if (k === '--collections' && v) out.collections = v
    if (k === '--suffix' && v) out.suffix = v
    if (k === '--batch' && v) out.batch = Number(v)
    if (k === '--mode' && v) out.mode = v
    if (k === '--checkpoint' && v) out.checkpoint = v
    if (k === '--resume' && v !== undefined) out.resume = v !== 'false'
  }
  return out
}

async function getTotalCount(conn, name) {
  const col = conn.db.collection(name)
  try {
    return await col.estimatedDocumentCount()
  } catch (_) {
    try {
      return await col.countDocuments({})
    } catch (__) {
      return undefined
    }
  }
}

function loadCheckpoint(file) {
  try {
    const raw = fs.readFileSync(file, 'utf8')
    return JSON.parse(raw)
  } catch (_) {
    return {}
  }
}

function saveCheckpoint(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
  } catch (err) {
    console.warn('Failed to write checkpoint:', err && err.message ? err.message : err)
  }
}

function serializeId(id) {
  if (id && id._bsontype === 'ObjectID') {
    return id.toHexString()
  }
  return id
}

function parseId(idStr) {
  if (typeof idStr === 'string' && /^[a-fA-F0-9]{24}$/.test(idStr)) {
    try {
      return new mongoose.Types.ObjectId(idStr)
    } catch (_) {
      return idStr
    }
  }
  return idStr
}

async function migrateOne(conn, srcName, dstName, batch, mode, cp, cpKey, cpFile, state) {
  const src = conn.db.collection(srcName)
  const dst = conn.db.collection(dstName)
  let migrated = 0
  let lastId = null
  const startedAt = Date.now()
  const total = await getTotalCount(conn, srcName)

  console.log(`[${srcName}] starting migration -> ${dstName}` + (total !== undefined ? ` | total≈${total}` : ''))

  if (cp[cpKey] && cp[cpKey].lastId && cp[cpKey].suffix === dstName) {
    lastId = parseId(cp[cpKey].lastId)
    migrated = cp[cpKey].migrated || 0
    console.log(`[${srcName}] resuming from checkpoint: lastId=${cp[cpKey].lastId} | migrated=${migrated}`)
  }

  while (true) {
    if (state && state.stopping) {
      console.log(`[${srcName}] stop requested. Exiting loop before next batch...`)
      break
    }
    const query = lastId ? { _id: { $gt: lastId } } : {}
    const t0 = Date.now()
    const batchDocs = await src.find(query).sort({ _id: 1 }).limit(batch).toArray()
    if (batchDocs.length === 0) break

    let ops
    if (mode === 'insertOnly') {
      ops = batchDocs.map((doc) => ({
        updateOne: {
          filter: { _id: doc._id },
          update: { $setOnInsert: doc },
          upsert: true,
        },
      }))
    } else {
      ops = batchDocs.map((doc) => ({
        replaceOne: {
          filter: { _id: doc._id },
          replacement: doc,
          upsert: true,
        },
      }))
    }

    let writeOk = true
    let writeErr = null
    if (ops.length > 0) {
      try {
        await dst.bulkWrite(ops, { ordered: false, writeConcern: { w: 1 } })
      } catch (err) {
        writeOk = false
        writeErr = err
      }
    }

    migrated += batchDocs.length
    lastId = batchDocs[batchDocs.length - 1]._id
    const t1 = Date.now()
    const elapsed = t1 - startedAt
    const batchMs = t1 - t0
    const rate = migrated > 0 ? (migrated / (elapsed / 1000)).toFixed(1) : '0.0'
    const pct = total ? ((migrated / total) * 100).toFixed(2) : undefined
    const pctStr = pct ? ` | ${pct}%` : ''
    const status = writeOk ? 'ok' : `error: ${writeErr && writeErr.message ? writeErr.message : writeErr}`
    console.log(`[${srcName} -> ${dstName}] +${batchDocs.length} in ${batchMs}ms | elapsed=${humanDuration(elapsed)} | total=${migrated}${pctStr} | rate=${rate}/s | lastId=${String(lastId)} | ${status}`)

    // Save checkpoint
    cp[cpKey] = { lastId: serializeId(lastId), migrated, suffix: dstName, updatedAt: new Date().toISOString() }
    saveCheckpoint(cpFile, cp)
  }

  const totalStr = total !== undefined ? ` of ≈${total}` : ''
  console.log(`[${srcName} -> ${dstName}] done. migrated ${migrated}${totalStr} in ${humanDuration(Date.now() - startedAt)}`)
}

async function main() {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/diagnostic-modality-integration'
  const args = parseArgs()
  const toMigrate = args.collections.split(',').map((s) => s.trim()).filter(Boolean)

  console.log('Connecting to Mongo:', MONGO_URI)
  const conn = await mongoose.createConnection(MONGO_URI, {
    bufferCommands: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  try {
    console.log('Collections:', toMigrate, 'suffix:', args.suffix, 'batch:', args.batch)
    console.log('Mode:', args.mode, '| checkpoint:', args.checkpoint, '| resume:', args.resume)

    const cp = args.resume ? loadCheckpoint(args.checkpoint) : {}
    const state = { stopping: false, cp, cpFile: args.checkpoint }

    // Graceful shutdown on Ctrl-C / SIGTERM
    const handleSignal = (sig) => {
      if (!state.stopping) {
        console.log(`\n[signal] ${sig} received. Saving checkpoint and stopping after current batch...`)
        state.stopping = true
        try {
          saveCheckpoint(state.cpFile, state.cp)
        } catch (_) {
        }
      }
    }
    process.once('SIGINT', handleSignal)
    process.once('SIGTERM', handleSignal)

    if (toMigrate.includes('events')) {
      await migrateOne(conn, 'events', `events${args.suffix}`, args.batch, args.mode, cp, `events->events${args.suffix}`, args.checkpoint, state)
    }
    if (toMigrate.includes('external_requests')) {
      await migrateOne(conn, 'external_requests', `external_requests${args.suffix}`, args.batch, args.mode, cp, `external_requests->external_requests${args.suffix}`, args.checkpoint, state)
    }
    if (toMigrate.includes('internal_events')) {
      await migrateOne(conn, 'internal_events', `internal_events${args.suffix}`, args.batch, args.mode, cp, `internal_events->internal_events${args.suffix}`, args.checkpoint, state)
    }
    console.log('All requested migrations completed.')
  } finally {
    await conn.close()
  }
}

main().catch((err) => {
  console.error('Migration failed:', err.message || err)
  process.exitCode = 1
})
