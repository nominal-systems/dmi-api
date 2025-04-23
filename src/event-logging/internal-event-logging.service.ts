import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { EventLogDocument, InternalEvent } from './schemas/internal-event.schema'

@Injectable()
export class InternalEventLoggingService {
  private readonly logger = new Logger(InternalEventLoggingService.name)

  constructor (
    @InjectModel(InternalEvent.name)
    private readonly eventLogModel: Model<EventLogDocument>
  ) {
  }

  /**
   * Asynchronously log an event payload to MongoDB
   * This is designed to be "fire and forget" so we don't block the event handler
   */
  async logEvent (
    pattern: string,
    payload: any,
    handlerName?: string,
    methodName?: string
  ): Promise<void> {
    try {
      const eventLog = new this.eventLogModel({
        pattern,
        payload,
        handlerName,
        methodName
      })

      await eventLog.save()
    } catch (error) {
      // Log the error but don't rethrow - we don't want to affect the main flow
      this.logger.error(
        `Failed to log event payload: ${error.message}`,
        error.stack
      )
    }
  }
}
