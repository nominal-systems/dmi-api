#!/usr/bin/env node
/**
 * One-off ops script: re-emit `report:created` events for a list of reports.
 *
 * Reads a CSV (default: ~/Downloads/Re_process_list.csv) that contains at least
 * `integrationId` and `reportId` columns, loads each report + its integration
 * from the database, and re-emits a `report:created` event via EventsService.
 *
 * NOTE: EventsService.addEvent() BOTH persists a new event to `events_v2`
 * (with a fresh seq) AND fans out to Event Hub subscribers. So running this
 * REPLAYS the events to live partner subscribers. Run DRY_RUN=true first, and
 * make sure the env points at the intended database + subscriptions.
 *
 * Usage:
 *   DRY_RUN=true  node dist/reemit-reports              # preview, emits nothing
 *   REEMIT_CSV=/path/file.csv node dist/reemit-reports  # actually re-emit
 */
import { loadEnv } from './config/load-env'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { readFileSync } from 'fs'
import { AppModule } from './app.module'
import { EventsService } from './events/services/events.service'
import { IntegrationsService } from './integrations/integrations.service'
import { Report } from './reports/entities/report.entity'
import { Integration } from './integrations/entities/integration.entity'
import { EventNamespace } from './events/constants/event-namespace.enum'
import { EventType } from './events/constants/event-type.enum'

const loaded = loadEnv()
Logger.log(`Loaded environment configuration from ${loaded.join(', ')}`, 'ReemitReports')

const CSV_PATH = process.env.REEMIT_CSV ?? `${process.env.HOME}/Downloads/Re_process_list.csv`
const DRY_RUN = process.env.DRY_RUN === 'true'

interface Row {
  integrationId: string
  reportId: string
}

// integrationId / reportId are the first columns and are UUIDs (no embedded
// commas), so a plain split is safe for those two fields.
function parseCsv (path: string): Row[] {
  const lines = readFileSync(path, 'utf8').split(/\r?\n/).filter(l => l.trim() !== '')
  const header = lines.shift()
  if (header == null) return []
  const cols = header.split(',')
  const iIdx = cols.indexOf('integrationId')
  const rIdx = cols.indexOf('reportId')
  if (iIdx < 0 || rIdx < 0) {
    throw new Error("CSV must contain 'integrationId' and 'reportId' columns")
  }
  return lines
    .map(line => {
      const parts = line.split(',')
      return { integrationId: parts[iIdx]?.trim(), reportId: parts[rIdx]?.trim() }
    })
    .filter(r => r.integrationId && r.reportId)
}

async function reemitReports (): Promise<void> {
  const rows = parseCsv(CSV_PATH)
  Logger.log(`Loaded ${rows.length} reports to re-emit from ${CSV_PATH}${DRY_RUN ? ' (DRY_RUN)' : ''}`, 'ReemitReports')

  const app = await NestFactory.createApplicationContext(AppModule, { logger: ['log', 'warn', 'error'] })
  const eventsService = app.get(EventsService)
  const integrationsService = app.get(IntegrationsService)
  const reportsRepo = app.get<Repository<Report>>(getRepositoryToken(Report))

  // Cache integrations — the CSV typically repeats the same integrationId many times.
  const integrationCache = new Map<string, Integration>()

  let emitted = 0
  let skipped = 0
  let failed = 0

  try {
    for (const [i, row] of rows.entries()) {
      const at = `[${i + 1}/${rows.length}]`
      try {
        // Load the report with the same relations the normal emit path has.
        const report = await reportsRepo.createQueryBuilder('report')
          .leftJoinAndSelect('report.order', 'order')
          .leftJoinAndSelect('report.patient', 'patient')
          .leftJoinAndSelect('report.testResultsSet', 'testResult')
          .leftJoinAndSelect('testResult.observations', 'observation')
          .where('report.id = :id', { id: row.reportId })
          .orderBy('testResult.seq', 'ASC')
          .addOrderBy('observation.seq', 'ASC')
          .getOne()

        if (report == null) {
          Logger.warn(`${at} report ${row.reportId} not found — skipping`, 'ReemitReports')
          skipped++
          continue
        }

        let integration = integrationCache.get(row.integrationId)
        if (integration == null) {
          integration = await integrationsService.findById(row.integrationId)
          integrationCache.set(row.integrationId, integration)
        }

        // Mirrors the production `report:created` shape in ReportsService.
        const event = {
          namespace: EventNamespace.REPORTS,
          type: EventType.REPORT_CREATED,
          providerId: integration.providerConfiguration.providerId,
          practiceId: integration.practice.id,
          integrationId: row.integrationId,
          accessionId: report.order?.requisitionId,
          data: {
            practice: integration.practice,
            orderId: report.orderId,
            reportId: report.id,
            report
          }
        }

        if (DRY_RUN) {
          Logger.log(`${at} DRY_RUN would emit report:created for report ${report.id} (order ${report.orderId})`, 'ReemitReports')
        } else {
          await eventsService.addEvent(event)
          Logger.log(`${at} emitted report:created for report ${report.id}`, 'ReemitReports')
        }
        emitted++
      } catch (err) {
        failed++
        const message = err instanceof Error ? err.message : String(err)
        Logger.error(`${at} failed for report ${row.reportId}: ${message}`, 'ReemitReports')
      }
    }
  } finally {
    await app.close()
  }

  Logger.log(`Done. emitted=${emitted} skipped=${skipped} failed=${failed}`, 'ReemitReports')
}

/* eslint-disable @typescript-eslint/no-floating-promises */
reemitReports()
  .then(() => { process.exit(0) })
  .catch((err) => {
    Logger.error(err instanceof Error ? err.stack : String(err), 'ReemitReports')
    process.exit(1)
  })
