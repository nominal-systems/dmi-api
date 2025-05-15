import { Logger } from '@nestjs/common'
import { join } from 'path'
import { NestFastifyApplication } from '@nestjs/platform-fastify'

export async function registerStaticAssets (app: NestFastifyApplication): Promise<void> {
  const staticFilesDirectory = join(__dirname, '..', '..', '..', 'public') // adjusted for file location
  const staticFilesPrefix = '/ui'

  app.useStaticAssets({
    root: staticFilesDirectory,
    prefix: staticFilesPrefix,
    prefixAvoidTrailingSlash: true
  })

  Logger.log(`Serving static files from ${staticFilesDirectory} at ${staticFilesPrefix}`)
}
