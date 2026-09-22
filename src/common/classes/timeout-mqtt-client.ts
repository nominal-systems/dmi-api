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
          // A timeout is the only evidence available that the reply channel may
          // be gone: nothing reports a subscription dropped at the broker while
          // the connection stays up (issue #366).
          this.forceResubscribe(pattern)

          return throwError(
            new GatewayTimeoutException('The engine did not respond in time')
          )
        }

        return throwError(err)
      })
    )
  }

  // Reply channels stay subscribed for the lifetime of the client. Releasing
  // them once the last in-flight request resolves is what stranded the channel
  // on the broker side (issue #366); keeping the topic also lets mqtt.js replay
  // it on its own after a reconnect.
  protected unsubscribeFromChannel (_channel: string): void {
    // Intentional no-op: the reply channel is never released.
  }

  /**
   * Puts a SUBSCRIBE for a pattern's reply channel back on the wire.
   *
   * `resubscribe: true` is not optional. mqtt.js keeps its own list of
   * subscribed topics (`_resubscribeTopics`) and drops a SUBSCRIBE for a topic
   * already on that list before it reaches the broker, reporting success to the
   * caller. Without the flag this call is silently a no-op — which is precisely
   * the failure it exists to repair.
   */
  private forceResubscribe (pattern: any): void {
    const responseChannel = this.getResponsePattern(
      this.normalizePattern(pattern)
    )

    this.mqttClient.subscribe(
      // `resubscribe` travels alongside the topics in the same object; the
      // typings only describe the topic map, hence the cast.
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
