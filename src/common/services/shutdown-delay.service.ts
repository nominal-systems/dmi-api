import { BeforeApplicationShutdown, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppConfig } from '../../config/config.interface'

// Keeps serving for a few seconds after SIGTERM, while Kubernetes removes the pod from the Service endpoints
@Injectable()
export class ShutdownDelayService implements BeforeApplicationShutdown {
  private readonly logger = new Logger(ShutdownDelayService.name)

  constructor (private readonly configService: ConfigService<AppConfig>) {}

  async beforeApplicationShutdown (signal?: string): Promise<void> {
    const delayMs = this.configService.get<number>('shutdownDelayMs', 3000)
    // No signal means a programmatic app.close() (e.g. tests), which needs no draining
    if (signal === undefined || !(delayMs > 0)) return

    this.logger.log(`Received ${signal}, waiting ${delayMs}ms before closing`)
    await new Promise((resolve) => setTimeout(resolve, delayMs))
  }
}
