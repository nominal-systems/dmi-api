import { BeforeApplicationShutdown, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppConfig } from '../../config/config.interface'

// On SIGTERM, keeps serving for a few seconds while Kubernetes removes the pod from the Service endpoints.
// On any signal, exits if the shutdown is still running after shutdownTimeoutMs.
@Injectable()
export class ShutdownDelayService implements BeforeApplicationShutdown {
  private readonly logger = new Logger(ShutdownDelayService.name)

  constructor (private readonly configService: ConfigService<AppConfig>) {}

  async beforeApplicationShutdown (signal?: string): Promise<void> {
    // No signal means a programmatic app.close() (e.g. tests), which needs neither
    if (signal === undefined) return

    const timeoutMs = this.configService.get<number>('shutdownTimeoutMs') ?? 0
    if (timeoutMs > 0) {
      // A request still waiting on the engine would otherwise hold the process until SIGKILL.
      // unref() so the timer doesn't keep the process alive once the shutdown finishes in time.
      setTimeout(() => {
        this.logger.error(`Shutdown still running ${timeoutMs}ms after ${signal}, exiting`)
        process.exit(1)
      }, timeoutMs).unref()
    }

    // Only SIGTERM comes from a pod stop; Ctrl+C (SIGINT) has no endpoints to wait for
    const delayMs = this.configService.get<number>('shutdownDelayMs') ?? 0
    if (signal !== 'SIGTERM' || delayMs === 0) return

    this.logger.log(`Received ${signal}, waiting ${delayMs}ms before closing`)
    await new Promise((resolve) => setTimeout(resolve, delayMs))
  }
}
