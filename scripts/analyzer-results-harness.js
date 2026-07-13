#!/usr/bin/env node
/**
 * Analyzer-results injection harness.
 *
 * Reproduces and verifies the "typed requisition id funnels results onto a
 * stale, wrong-patient orphan report" defect by publishing crafted
 * `external_results` / `external_order_results` messages to a remote
 * environment's ActiveMQ broker (exactly what the IDEXX engine emits when it
 * polls in-house analyzer results), then verifying the outcome through the
 * environment's dmi-api REST endpoints.
 *
 * Run locally against a remote environment (DEV). See
 * scripts/analyzer-results-harness.README.md for setup and scenarios.
 *
 * Against a build WITHOUT the report-scoping fix, s1/s2 FAIL (that is the
 * prod defect reproduced). Against a build WITH the fix, all scenarios PASS.
 */

const mqtt = require('mqtt')

// ---------------------------------------------------------------------------
// Configuration: CLI flags > environment variables > defaults
// ---------------------------------------------------------------------------

function parseArgs (argv) {
  const args = { _: [] }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--dry-run') args.dryRun = true
    else if (a === '--skip-verify') args.skipVerify = true
    else if (a === '--help' || a === '-h') args.help = true
    else if (a.startsWith('--')) args[a.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = argv[++i]
    else args._.push(a)
  }
  return args
}

const args = parseArgs(process.argv.slice(2))

const config = {
  brokerUrl: args.broker ?? process.env.HARNESS_BROKER_URL ?? '',
  brokerUsername: args.brokerUsername ?? process.env.HARNESS_BROKER_USERNAME ?? '',
  brokerPassword: args.brokerPassword ?? process.env.HARNESS_BROKER_PASSWORD ?? '',
  apiBase: (args.api ?? process.env.HARNESS_API_BASE ?? 'https://devv2.dmi.voyager.marsvh.com/dmi').replace(/\/$/, ''),
  apiKey: args.apiKey ?? process.env.HARNESS_API_KEY ?? '',
  integrationId: args.integration ?? process.env.HARNESS_INTEGRATION_ID ?? '',
  scenario: (args.scenario ?? 'all').toLowerCase(),
  prefix: args.prefix ?? `HARNESS-${new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)}`,
  reusePrefix: args.reusePrefix ?? '',
  settleSeconds: Number(args.settle ?? 20),
  timeoutSeconds: Number(args.timeout ?? 120),
  dryRun: Boolean(args.dryRun),
  skipVerify: Boolean(args.skipVerify)
}

const USAGE = `
Usage: node scripts/analyzer-results-harness.js [options]

Options:
  --broker <url>            MQTT broker url, e.g. mqtt://dev.activemq:1883   [HARNESS_BROKER_URL]
  --broker-username <u>                                                      [HARNESS_BROKER_USERNAME]
  --broker-password <p>                                                      [HARNESS_BROKER_PASSWORD]
  --api <base>              dmi-api base url (default: DEV)                  [HARNESS_API_BASE]
  --api-key <key>           x-api-key for verification calls                 [HARNESS_API_KEY]
  --integration <id>        integration id the results belong to (required)  [HARNESS_INTEGRATION_ID]
  --scenario <s>            s1 | s2 | s4 | s5 | all   (default: all = s1,s2,s4)
  --prefix <p>              externalId prefix for this run (default: HARNESS-<timestamp>)
  --reuse-prefix <p>        s5 only: prefix of a run executed >60 min ago
  --settle <seconds>        wait after each publish before verifying (default 20)
  --timeout <seconds>       max wait for expected state to appear (default 120)
  --dry-run                 print config, payloads and verification plan; no network I/O
  --skip-verify             publish only; print manual verification steps
`

// ---------------------------------------------------------------------------
// Payload builders — mirror what the IDEXX engine emits for analyzer results
// ---------------------------------------------------------------------------

let resultSeq = 0

/**
 * Build a ProviderResult the way the IDEXX engine's result mapper does for an
 * in-house (IVLS) run: orderId falls back to the typed requisition id when
 * present, else to the diagnosticSetId, and the embedded order carries only
 * externalId/status/patient/tests (no client, no requisition metadata).
 */
function analyzerResult ({ requisitionId, diagnosticSetId, patientName, status, testCodes }) {
  const linkId = requisitionId || diagnosticSetId
  return {
    id: `${diagnosticSetId}-${++resultSeq}`,
    orderId: linkId,
    status, // 'PARTIAL' | 'COMPLETED'
    order: {
      externalId: linkId,
      status: status === 'COMPLETED' ? 'COMPLETED' : 'PARTIAL',
      patient: { name: patientName, sex: '', species: 'Canine', breed: '', birthdate: null },
      tests: testCodes.map(code => ({ code })),
      editable: false
    },
    testResults: [
      {
        seq: 0,
        code: 'Chemistry',
        name: 'Chemistry',
        items: testCodes.map((code, i) => ({
          seq: i,
          code,
          name: code,
          status: 'DONE',
          valueQuantity: { value: 40 + i, units: 'U/L' }
        }))
      }
    ]
  }
}

function diagnosticSetId (prefix, n) {
  // Shape used by IVLS runs: YYYYMMDD_HHMMSS_<id>. Suffix keeps runs unique.
  const now = new Date().toISOString().replace(/[-:]/g, '')
  return `${now.slice(0, 8)}_${now.slice(9, 15)}_${prefix}-${n}`
}

// ---------------------------------------------------------------------------
// Scenarios
// ---------------------------------------------------------------------------

function buildScenarios (cfg) {
  const p = cfg.prefix
  return {
    s1: {
      title: 'S1 — reused requisition id across patients (the prod defect)',
      steps: [
        {
          publish: analyzerResult({
            requisitionId: `${p}-R1`,
            diagnosticSetId: diagnosticSetId(p, 'S1A'),
            patientName: 'Harness Fixture-A',
            status: 'COMPLETED',
            testCodes: ['GLU', 'CREA']
          }),
          note: 'seed: final result for Fixture-A, typed requisition id R1'
        },
        {
          publish: analyzerResult({
            requisitionId: `${p}-R1`,
            diagnosticSetId: diagnosticSetId(p, 'S1B'),
            patientName: 'Harness Fixture-B',
            status: 'COMPLETED',
            testCodes: ['ALB', 'TP']
          }),
          note: 'attack: final result for a DIFFERENT patient, same requisition id'
        }
      ],
      verify: async (api, cfg) => {
        const orders = await ordersByExternalId(api, `${p}-R1`)
        assert(orders.length === 2, `expected 2 orders with externalId ${p}-R1, found ${orders.length}`)
        const a = orders.find(o => o.patient?.name === 'Harness Fixture-A')
        const b = orders.find(o => o.patient?.name === 'Harness Fixture-B')
        assert(a != null, 'order for Fixture-A not found')
        assert(b != null, 'order for Fixture-B not found — pre-fix builds funnel it onto Fixture-A')
        const reportA = await reportForOrder(api, a.id)
        const reportB = await reportForOrder(api, b.id)
        assert(reportA != null, 'Fixture-A must keep its own report')
        assert(reportB != null, 'Fixture-B must get its OWN report (pre-fix: none, results were appended to Fixture-A\'s report)')
        assert(reportA.patient?.name === 'Harness Fixture-A',
          `Fixture-A's report patient was overwritten to '${reportA.patient?.name}' — cross-patient funneling`)
        const aCodes = observationCodes(reportA)
        assert(!aCodes.includes('ALB') && !aCodes.includes('TP'),
          `Fixture-B's results leaked onto Fixture-A's report (observations: ${aCodes.join(',')})`)
        const bCodes = observationCodes(reportB)
        assert(bCodes.includes('ALB') && bCodes.includes('TP'),
          `Fixture-B's report is missing its own results (observations: ${bCodes.join(',')})`)
      }
    },

    s2: {
      title: 'S2 — one analyzer run polled multiple times (partial → partial → final)',
      steps: [
        {
          publish: analyzerResult({
            requisitionId: `${p}-R2`,
            diagnosticSetId: diagnosticSetId(p, 'S2'),
            patientName: 'Harness Fixture-C',
            status: 'PARTIAL',
            testCodes: ['GLU']
          }),
          note: 'poll 1: partial'
        },
        {
          publish: analyzerResult({
            requisitionId: `${p}-R2`,
            diagnosticSetId: diagnosticSetId(p, 'S2'),
            patientName: 'Harness Fixture-C',
            status: 'PARTIAL',
            testCodes: ['GLU', 'CREA']
          }),
          note: 'poll 2: partial with one more analyte'
        },
        {
          publish: analyzerResult({
            requisitionId: `${p}-R2`,
            diagnosticSetId: diagnosticSetId(p, 'S2'),
            patientName: 'Harness Fixture-C',
            status: 'COMPLETED',
            testCodes: ['GLU', 'CREA', 'ALB']
          }),
          note: 'poll 3: final'
        }
      ],
      verify: async (api, cfg) => {
        const orders = await ordersByExternalId(api, `${p}-R2`)
        assert(orders.length === 1,
          `expected exactly 1 order for the run, found ${orders.length} — pre-fix builds mint one orphan per poll`)
        const report = await reportForOrder(api, orders[0].id)
        assert(report != null, 'the run must have a report')
        assert(report.status === 'FINAL', `report should end FINAL, is '${report.status}'`)
        const codes = observationCodes(report)
        for (const c of ['GLU', 'CREA', 'ALB']) {
          assert(codes.includes(c), `final report missing analyte ${c} (has: ${codes.join(',')})`)
        }
      }
    },

    s4: {
      title: 'S4 — no typed requisition id (diagnosticSetId path, unchanged behavior)',
      steps: [
        {
          publish: analyzerResult({
            requisitionId: null,
            diagnosticSetId: `${diagnosticSetId(p, 'S4')}`,
            patientName: 'Harness Fixture-D',
            status: 'COMPLETED',
            testCodes: ['TBIL', 'CHOL']
          }),
          note: 'analyzer run with no typed id: links by diagnosticSetId'
        }
      ],
      verify: async (api, cfg, scenario) => {
        const extId = scenario.steps[0].publish.orderId
        const orders = await ordersByExternalId(api, extId)
        assert(orders.length === 1, `expected 1 order with externalId ${extId}, found ${orders.length}`)
        const report = await reportForOrder(api, orders[0].id)
        assert(report != null, 'diagnosticSetId run must produce a report')
        assert(report.patient?.name === 'Harness Fixture-D', 'report patient mismatch')
      }
    },

    s5: {
      title: 'S5 — stale externalId reuse after the match window (needs --reuse-prefix of a run >60 min old)',
      steps: [
        {
          publishFactory: (cfg) => analyzerResult({
            requisitionId: `${cfg.reusePrefix}-R2`,
            diagnosticSetId: diagnosticSetId(cfg.prefix, 'S5'),
            patientName: 'Harness Fixture-C',
            status: 'COMPLETED',
            testCodes: ['PHOS']
          }),
          note: 'same patient + same requisition id as an old run: beyond the 60-min window it must NOT reconcile'
        }
      ],
      verify: async (api, cfg) => {
        const orders = await ordersByExternalId(api, `${cfg.reusePrefix}-R2`)
        assert(orders.length >= 2,
          `expected a NEW order for the stale reuse (>=2 total with externalId ${cfg.reusePrefix}-R2), found ${orders.length}`)
        const newest = orders.reduce((x, y) => (x.createdAt > y.createdAt ? x : y))
        const report = await reportForOrder(api, newest.id)
        assert(report != null, 'the stale-reuse run must get its own report')
        assert(observationCodes(report).includes('PHOS'), 'new report missing PHOS')
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Transport: publish exactly like the engine's NestJS MQTT client does
// ---------------------------------------------------------------------------

async function connectBroker (cfg) {
  const client = mqtt.connect(cfg.brokerUrl, {
    username: cfg.brokerUsername || undefined,
    password: cfg.brokerPassword || undefined,
    connectTimeout: 10_000,
    reconnectPeriod: 0
  })
  await new Promise((resolve, reject) => {
    client.once('connect', resolve)
    client.once('error', reject)
  })
  return client
}

async function publishResults (client, integrationId, results) {
  // The IDEXX engine emits both events for every poll, in this order.
  for (const pattern of ['external_order_results', 'external_results']) {
    const packet = JSON.stringify({ pattern, data: { integrationId, results } })
    await new Promise((resolve, reject) => {
      client.publish(pattern, packet, { qos: 1 }, (err) => (err != null ? reject(err) : resolve()))
    })
  }
}

// ---------------------------------------------------------------------------
// Verification via dmi-api REST (x-api-key)
// ---------------------------------------------------------------------------

function api (cfg) {
  return async function request (path) {
    const res = await fetch(`${cfg.apiBase}${path}`, { headers: { 'x-api-key': cfg.apiKey } })
    if (res.status === 404) return null
    if (!res.ok) throw new Error(`GET ${path} -> ${res.status} ${await res.text()}`)
    return await res.json()
  }
}

async function ordersByExternalId (request, externalId) {
  const dayMs = 24 * 3600 * 1000
  const dateStart = new Date(Date.now() - dayMs).toISOString()
  const dateEnd = new Date(Date.now() + dayMs).toISOString()
  const orders = await request(`/orders?date_start=${dateStart}&date_end=${dateEnd}`)
  return (orders ?? []).filter(o => o.externalId === externalId)
}

async function reportForOrder (request, orderId) {
  return await request(`/orders/${orderId}/report`)
}

function observationCodes (report) {
  return (report?.testResultsSet ?? []).flatMap(tr => (tr.observations ?? []).map(o => o.code))
}

function assert (cond, message) {
  if (!cond) throw new Error(message)
}

async function waitFor (fn, timeoutSeconds, description) {
  const deadline = Date.now() + timeoutSeconds * 1000
  let lastError
  while (Date.now() < deadline) {
    try {
      await fn()
      return
    } catch (err) {
      lastError = err
      await sleep(5000)
    }
  }
  throw new Error(`timed out waiting for: ${description}\n  last failure: ${lastError?.message}`)
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

function maskedConfig (cfg) {
  const mask = (v) => (v ? `${String(v).slice(0, 3)}…(${String(v).length} chars)` : '(not set)')
  return {
    ...cfg,
    brokerPassword: mask(cfg.brokerPassword),
    apiKey: mask(cfg.apiKey)
  }
}

async function main () {
  if (args.help) {
    console.log(USAGE)
    return
  }

  const scenarios = buildScenarios(config)
  const requested = config.scenario === 'all' ? ['s1', 's2', 's4'] : config.scenario.split(',')
  for (const key of requested) {
    if (scenarios[key] == null) {
      console.error(`Unknown scenario '${key}'. Known: ${Object.keys(scenarios).join(', ')}`)
      process.exit(2)
    }
  }
  if (requested.includes('s5') && !config.reusePrefix) {
    console.error('s5 requires --reuse-prefix <prefix of a harness run executed more than 60 minutes ago>')
    process.exit(2)
  }

  console.log('Config:', JSON.stringify(maskedConfig(config), null, 2))
  console.log(`Run prefix: ${config.prefix} (all orders this run creates carry it in their externalId)\n`)

  if (config.dryRun) {
    for (const key of requested) {
      const sc = scenarios[key]
      console.log(`\n=== ${sc.title} [dry run] ===`)
      sc.steps.forEach((step, i) => {
        const payload = step.publishFactory != null ? step.publishFactory(config) : step.publish
        console.log(`\n-- step ${i + 1}: ${step.note}`)
        console.log(`   would publish to topics 'external_order_results' + 'external_results':`)
        console.log(JSON.stringify({ pattern: 'external_results', data: { integrationId: config.integrationId || '<integration-id>', results: [payload] } }, null, 2))
      })
      console.log(`\n-- then verify via GET ${config.apiBase}/orders and /orders/:id/report`)
    }
    console.log('\nDry run complete. No messages were published, no requests were made.')
    return
  }

  if (!config.brokerUrl) { console.error('Missing --broker / HARNESS_BROKER_URL'); process.exit(2) }
  if (!config.integrationId) { console.error('Missing --integration / HARNESS_INTEGRATION_ID'); process.exit(2) }
  if (!config.skipVerify && !config.apiKey) { console.error('Missing --api-key / HARNESS_API_KEY (or use --skip-verify)'); process.exit(2) }

  const client = await connectBroker(config)
  console.log(`Connected to broker ${config.brokerUrl}`)
  const request = api(config)
  const failures = []

  try {
    for (const key of requested) {
      const sc = scenarios[key]
      console.log(`\n=== ${sc.title} ===`)
      for (const [i, step] of sc.steps.entries()) {
        const payload = step.publishFactory != null ? step.publishFactory(config) : step.publish
        console.log(`-- step ${i + 1}: ${step.note}`)
        await publishResults(client, config.integrationId, [payload])
        console.log(`   published (requisition/link id: ${payload.orderId}); settling ${config.settleSeconds}s…`)
        await sleep(config.settleSeconds * 1000)
      }
      if (config.skipVerify) {
        console.log('   --skip-verify: inspect orders with externalId prefix', config.prefix)
        continue
      }
      try {
        await waitFor(() => sc.verify(request, config, sc), config.timeoutSeconds, sc.title)
        console.log(`   PASS: ${sc.title}`)
      } catch (err) {
        console.error(`   FAIL: ${sc.title}\n   ${err.message}`)
        failures.push(key)
      }
    }
  } finally {
    client.end(true)
  }

  console.log('\n================================')
  if (failures.length === 0) {
    console.log('All scenarios passed.')
  } else {
    console.log(`FAILED scenarios: ${failures.join(', ')}`)
    console.log('Note: s1/s2 failing against a build WITHOUT the report-scoping fix is the expected reproduction of the prod defect.')
    process.exitCode = 1
  }
}

main().catch((err) => {
  console.error('Fatal:', err.message)
  process.exit(1)
})
