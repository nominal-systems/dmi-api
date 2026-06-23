#!/usr/bin/env node

import { loadEnv } from './config/load-env'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { IntegrationsService } from './integrations/integrations.service'

const loaded = loadEnv()
Logger.log(`Loaded environment configuration from ${loaded.join(', ')}`)

async function ensureIntegrationStatus (): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['log', 'warn', 'error']
  })
  try {
    await app.get(IntegrationsService).ensureStatusAll()
    Logger.log('Finished ensuring integration status')
  } finally {
    await app.close()
  }
}

/* eslint-disable @typescript-eslint/no-floating-promises */
ensureIntegrationStatus()
  .then(() => { process.exit(0) })
  .catch((err) => {
    Logger.error(
      `Failed to ensure integration status: ${err instanceof Error ? err.message : err}`,
      err instanceof Error ? err.stack : undefined)
    process.exit(1)
  })
