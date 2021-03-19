import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SeederService } from './seeder/seeder.service'

async function bootstrap () {
  const app = await NestFactory.createApplicationContext(AppModule)

  const seederService = app.get(SeederService)

  try {
    await seederService.seed()
  } catch (error) {
    await app.close()
    throw error
  }

  Logger.log('Seeder was successfully executed!', 'SeederBootstrap')

  await app.close()
}
bootstrap()
