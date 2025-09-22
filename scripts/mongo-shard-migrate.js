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
    retries: 3,
    retryDelayMs: 500,
  }
  for (const arg of args) {
    const [k, v] = arg.split('=')
    if (k === '--collections' && v) out.collections = v
    if (k === '--suffix' && v) out.suffix = v
    if (k === '--batch' && v) out.batch = Number(v)
    if (k === '--mode' && v) out.mode = v
    if (k === '--checkpoint' && v) out.checkpoint = v
    if (k === '--resume' && v !== undefined) out.resume = v !== 'false'
    if (k === '--retries' && v) out.retries = Number(v)
    if (k === '--retryDelayMs' && v) out.retryDelayMs = Number(v)
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function repairFailedIds(conn, srcName, dstName, ids, mode, retries, retryDelayMs, state) {
  if (!ids || ids.length === 0) return { repaired: 0, remaining: 0 }
  const src = conn.db.collection(srcName)
  const dst = conn.db.collection(dstName)
  let repaired = 0
  const chunkSize = 500
  for (let i = 0; i < ids.length; i += chunkSize) {
    if (state && state.stopping) {
      console.log(`[${srcName}] stop requested during repair phase. Remaining IDs will be saved to checkpoint.`)
      break
    }
    const chunkIds = ids.slice(i, i + chunkSize)
    const docs = await src.find({ _id: { $in: chunkIds.map(parseId) } }).toArray()
    const byId = new Map(docs.map(d => [serializeId(d._id), d]))
    let ops = chunkIds.map(id => {
      const doc = byId.get(serializeId(id))
      if (!doc) return null
      if (mode === 'insertOnly') {
        return { updateOne: { filter: { _id: doc._id }, update: { $setOnInsert: doc }, upsert: true } }
      }
      return { replaceOne: { filter: { _id: doc._id }, replacement: doc, upsert: true } }
    }).filter(Boolean)

    if (ops.length === 0) continue

    let failedOps = ops
    let attempt = 0
    while (attempt <= retries && failedOps.length > 0) {
      try {
        await dst.bulkWrite(failedOps, { ordered: false, writeConcern: { w: 1 } })
        repaired += failedOps.length
        failedOps = []
        break
      } catch (err) {
        const writeErrors = (err && err.writeErrors) || []
        const failedIdx = new Set(writeErrors.map(e => e.index))
        const prevCount = failedOps.length
        failedOps = failedOps.filter((_, idx) => failedIdx.has(idx))
        const errMsg = writeErrors[0] ? `${writeErrors[0].code}: ${writeErrors[0].errmsg || writeErrors[0].message}` : (err.message || String(err))
        console.warn(`[repair ${srcName} -> ${dstName}] attempt ${attempt + 1} failed: ${errMsg} | failed=${prevCount} remaining=${failedOps.length}`)
        attempt += 1
        if (attempt <= retries && failedOps.length > 0) await sleep(retryDelayMs)
      }
    }
  }
  const remaining = Math.max(0, ids.length - repaired)
  return { repaired, remaining }
}

async function migrateOne(conn, srcName, dstName, batch, mode, cp, cpKey, cpFile, state, retries, retryDelayMs) {
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

  // Pre-repair any previously failed ids
  const prevFailed = Array.isArray(cp[cpKey]?.failedIds) ? cp[cpKey].failedIds : []
  if (prevFailed.length > 0) {
    console.log(`[${srcName}] attempting to repair ${prevFailed.length} previously failed documents...`)
    const { repaired, remaining } = await repairFailedIds(conn, srcName, dstName, prevFailed, mode, retries, retryDelayMs, state)
    console.log(`[${srcName}] repair phase complete: repaired=${repaired} remaining=${remaining}`)
    cp[cpKey].failedIds = prevFailed.slice(repaired)
    saveCheckpoint(cpFile, cp)
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
    let succeededInBatch = 0
    let failedOps = []
    let retryAttempts = 0
    if (ops.length > 0) {
      try {
        await dst.bulkWrite(ops, { ordered: false, writeConcern: { w: 1 } })
        succeededInBatch = ops.length
      } catch (err) {
        writeOk = false
        writeErr = err
        const writeErrors = (err && err.writeErrors) || []
        const failedIdx = new Set(writeErrors.map(e => e.index))
        failedOps = ops.filter((_, idx) => failedIdx.has(idx))
        succeededInBatch = ops.length - failedOps.length
        while (retryAttempts < retries && failedOps.length > 0 && !(state && state.stopping)) {
          await sleep(retryDelayMs)
          retryAttempts += 1
          try {
            await dst.bulkWrite(failedOps, { ordered: false, writeConcern: { w: 1 } })
            succeededInBatch += failedOps.length
            failedOps = []
            writeOk = true
            writeErr = null
            break
          } catch (e2) {
            writeErr = e2
            const errs = (e2 && e2.writeErrors) || []
            const fIdx = new Set(errs.map(e => e.index))
            const prevLen = failedOps.length
            failedOps = failedOps.filter((_, idx) => fIdx.has(idx))
            const eMsg = errs[0] ? `${errs[0].code}: ${errs[0].errmsg || errs[0].message}` : (e2.message || String(e2))
            console.warn(`[retry ${srcName} -> ${dstName}] attempt ${retryAttempts} failed: ${eMsg} | failed=${prevLen} remaining=${failedOps.length}`)
          }
        }
      }
    }

    migrated += succeededInBatch
    lastId = batchDocs[batchDocs.length - 1]._id
    const t1 = Date.now()
    const elapsed = t1 - startedAt
    const batchMs = t1 - t0
    const rate = migrated > 0 ? (migrated / (elapsed / 1000)).toFixed(1) : '0.0'
    const pct = total ? ((migrated / total) * 100).toFixed(2) : undefined
    const pctStr = pct ? ` | ${pct}%` : ''
    const first = batchDocs[0]
    const last = batchDocs[batchDocs.length - 1]
    const caFirst = first && first.createdAt instanceof Date ? first.createdAt.toISOString() : undefined
    const caLast = last && last.createdAt instanceof Date ? last.createdAt.toISOString() : undefined
    const span = caFirst && caLast ? ` | createdAt: ${caFirst} .. ${caLast}` : ''
    const failedCount = failedOps.length
    const errMsg = writeErr && writeErr.writeErrors && writeErr.writeErrors[0]
      ? `${writeErr.writeErrors[0].code}: ${writeErr.writeErrors[0].errmsg || writeErr.writeErrors[0].message}`
      : (writeErr && writeErr.message) || ''
    const status = failedCount === 0 ? 'ok' : `errors=${failedCount} (${errMsg})`
    console.log(`[${srcName} -> ${dstName}] +${succeededInBatch}/${batchDocs.length} in ${batchMs}ms | elapsed=${humanDuration(elapsed)} | total=${migrated}${pctStr} | rate=${rate}/s | retries=${retryAttempts} | lastId=${String(lastId)}${span} | ${status}`)

    // Save checkpoint
    const prevFailedIds = Array.isArray(cp[cpKey]?.failedIds) ? new Set(cp[cpKey].failedIds) : new Set()
    if (failedCount > 0) {
      const batchFailedIds = failedOps.map(op => serializeId(op.updateOne ? op.updateOne.filter._id : op.replaceOne.filter._id))
      for (const id of batchFailedIds) prevFailedIds.add(id)
    }
    cp[cpKey] = {
      lastId: serializeId(lastId),
      migrated,
      suffix: dstName,
      failedIds: Array.from(prevFailedIds),
      updatedAt: new Date().toISOString(),
    }
    saveCheckpoint(cpFile, cp)
  }

  const totalStr = total !== undefined ? ` of ≈${total}` : ''
  const outstanding = Array.isArray(cp[cpKey]?.failedIds) ? cp[cpKey].failedIds.length : 0
  console.log(`[${srcName} -> ${dstName}] done. migrated ${migrated}${totalStr} in ${humanDuration(Date.now() - startedAt)} | outstandingFailures=${outstanding}`)

  if (outstanding > 0 && !(state && state.stopping)) {
    const failedIds = cp[cpKey].failedIds
    console.log(`[${srcName}] final repair attempt for ${failedIds.length} failed documents...`)
    const { repaired, remaining } = await repairFailedIds(conn, srcName, dstName, failedIds, mode, retries, retryDelayMs, state)
    console.log(`[${srcName}] final repair complete: repaired=${repaired} remaining=${remaining}`)
    if (remaining === 0) cp[cpKey].failedIds = []
    saveCheckpoint(cpFile, cp)
  }
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
      await migrateOne(conn, 'events', `events${args.suffix}`, args.batch, args.mode, cp, `events->events${args.suffix}`, args.checkpoint, state, args.retries, args.retryDelayMs)
    }
    if (toMigrate.includes('external_requests')) {
      await migrateOne(conn, 'external_requests', `external_requests${args.suffix}`, args.batch, args.mode, cp, `external_requests->external_requests${args.suffix}`, args.checkpoint, state, args.retries, args.retryDelayMs)
    }
    if (toMigrate.includes('internal_events')) {
      await migrateOne(conn, 'internal_events', `internal_events${args.suffix}`, args.batch, args.mode, cp, `internal_events->internal_events${args.suffix}`, args.checkpoint, state, args.retries, args.retryDelayMs)
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
