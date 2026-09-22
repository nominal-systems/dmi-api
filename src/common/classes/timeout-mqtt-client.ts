import { GatewayTimeoutException, Logger } from '@nestjs/common'
import { ClientMqtt } from '@nestjs/microservices'
import { Observable, TimeoutError, throwError } from 'rxjs'
import { timeout, catchError } from 'rxjs/operators'
import { ENGINE_RESPONSE_TIMEOUT } from '../constants/engine.constant'

export class TimeoutClientMqtt extends ClientMqtt {
  private readonly mqttLogger = new Logger(TimeoutClientMqtt.name)

  send<TResult = any, TInput = any> (
    pattern: any,
    data: TInput
  ): Observable<TResult> {
    return super.send(pattern, data).pipe(
      timeout(ENGINE_RESPONSE_TIMEOUT),
      catchError(err => {
        if (err instanceof TimeoutError) {
          // A timeout is the only hint that the reply channel may be gone (#366).
          this.forceResubscribe(pattern)

          return throwError(
            new GatewayTimeoutException('The engine did not respond in time')
          )
        }

        return throwError(err)
      })
    )
  }

  // Never released: dropping it on the last in-flight request is what stranded the
  // channel (#366), and keeping it lets mqtt.js replay it after a reconnect.
  protected unsubscribeFromChannel (_channel: string): void {}

  /**
   * `resubscribe: true` is required: mqtt.js drops a SUBSCRIBE for a topic already
   * in `_resubscribeTopics` before the wire, and reports success anyway (#366).
   */
  private forceResubscribe (pattern: any): void {
    const responseChannel = this.getResponsePattern(
      this.normalizePattern(pattern)
    )

    this.mqttClient.subscribe(
      { [responseChannel]: { qos: 0 }, resubscribe: true } as any,
      (err) => {
        if (err != null) {
          this.mqttLogger.error(
            `Failed to re-subscribe to ${responseChannel}: ${err.message}`
          )
        } else {
          this.mqttLogger.warn(
            `Re-subscribed to ${responseChannel} after a request timed out`
          )
        }
      }
    )
  }
}
