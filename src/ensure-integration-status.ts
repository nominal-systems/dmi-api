#!/usr/bin/env node

import { loadEnv } from './config/load-env'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnsureStatusOptions, IntegrationsService } from './integrations/integrations.service'
import { IntegrationStatus } from './integrations/constants/integration-status.enum'

const USAGE = `
Restart integrations so the engines re-register their repeatable polling jobs.

Repeatable jobs live only in Redis and nothing re-creates them, so after a Redis cutover,
eviction or flush the integrations stay RUNNING in the database with polling silently dead.
This pass repairs that. It is idempotent and safe to re-run.

Usage: npm run ensure-integration-status -- [options]

Options:
  --status=RUNNING[,STOPPED]   Statuses to restart (default: RUNNING)
  --provider=idexx[,zoetis]    Restrict to these provider ids (default: all)
  --integration-id=<id>[,...]  Restrict to these integration ids (default: all)
  --concurrency=<n>            Integrations restarted in parallel (default: 5)
  --attempts=<n>               Attempts per integration (default: 3)
  --backoff=<ms>               Base delay between attempts, doubled each retry (default: 1000)
  --dry-run                    List what would be restarted, change nothing
  --help                       Show this message

Exits non-zero if any integration could not be restarted.

Note: each engine request is bounded by ENGINE_RESPONSE_TIMEOUT (default 90s). Lower it when
restarting a large batch where some engines are expected to be unreachable.
`

const loaded = loadEnv()

class UsageError extends Error {}

function parseList (value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
}

function parseNumber (name: string, value: string): number {
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new UsageError(`Invalid value for --${name}: ${value}`)
  }
  return parsed
}

function parseStatuses (value: string): IntegrationStatus[] {
  return parseList(value).map((status) => {
    const parsed = IntegrationStatus[status.toUpperCase() as keyof typeof IntegrationStatus]
    if (parsed === undefined) {
      throw new UsageError(
        `Invalid value for --status: ${status}. Expected one of ${Object.keys(IntegrationStatus).join(', ')}`
      )
    }
    return parsed
  })
}

export function parseArgs (argv: string[]): EnsureStatusOptions | undefined {
  const options: EnsureStatusOptions = {}

  for (const arg of argv) {
    const [flag, value] = arg.split(/=(.*)/s)

    if (flag === '--help' || flag === '-h') {
      return undefined
    }

    if (flag === '--dry-run') {
      options.dryRun = true
      continue
    }

    if (value === undefined) {
      throw new UsageError(`Unknown or incomplete argument: ${arg}`)
    }

    switch (flag) {
      case '--status':
        options.statuses = parseStatuses(value)
        break
      case '--provider':
        options.providerIds = parseList(value)
        break
      case '--integration-id':
        options.integrationIds = parseList(value)
        break
      case '--concurrency':
        options.concurrency = parseNumber('concurrency', value)
        break
      case '--attempts':
        options.attempts = parseNumber('attempts', value)
        break
      case '--backoff':
        options.backoffMs = parseNumber('backoff', value)
        break
      default:
        throw new UsageError(`Unknown argument: ${arg}`)
    }
  }

  return options
}

async function ensureIntegrationStatus (options: EnsureStatusOptions): Promise<number> {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['log', 'warn', 'error']
  })
  try {
    const summary = await app.get(IntegrationsService).ensureStatusAll(options)

    if (summary.failures.length > 0) {
      Logger.error(
        `Failed to restart ${summary.failures.length} of ${summary.total} integration(s):\n` +
          summary.failures
            .map((failure) => `  ${failure.integrationId} (${failure.providerId}): ${failure.error}`)
            .join('\n')
      )
      return 1
    }

    Logger.log(
      summary.dryRun
        ? `Dry run: ${summary.total} integration(s) would be restarted`
        : `Finished ensuring integration status: ${summary.restarted} of ${summary.total} restarted`
    )
    return 0
  } finally {
    await app.close()
  }
}

/* istanbul ignore next */
function main (): void {
  let options: EnsureStatusOptions | undefined
  try {
    options = parseArgs(process.argv.slice(2))
  } catch (err) {
    Logger.error(err instanceof Error ? err.message : String(err))
    console.log(USAGE)
    process.exit(2)
  }

  if (options === undefined) {
    console.log(USAGE)
    process.exit(0)
  }

  Logger.log(`Loaded environment configuration from ${loaded.join(', ')}`)

  /* eslint-disable @typescript-eslint/no-floating-promises */
  ensureIntegrationStatus(options)
    .then((exitCode) => { process.exit(exitCode) })
    .catch((err) => {
      Logger.error(
        `Failed to ensure integration status: ${err instanceof Error ? err.message : err}`,
        err instanceof Error ? err.stack : undefined)
      process.exit(1)
    })
}

/* istanbul ignore next */
if (require.main === module) {
  main()
}
