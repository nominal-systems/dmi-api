import { GatewayTimeoutException, Logger } from '@nestjs/common'
import { ClientMqtt, ReadPacket, WritePacket } from '@nestjs/microservices'
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
          return throwError(
            new GatewayTimeoutException('The engine did not respond in time')
          )
        }

        return throwError(err)
      })
    )
  }

  // Reply channels are re-subscribed on every request instead of trusting the
  // client-side counter, which is not proof that the broker still holds the
  // subscription: a lost channel would never be repaired (issue #366).
  protected publish (
    partialPacket: ReadPacket,
    callback: (packet: WritePacket) => any
  ): () => void {
    const responseChannel = this.getResponsePattern(
      this.normalizePattern(partialPacket.pattern)
    )
    this.mqttClient.subscribe(responseChannel, (err) => {
      if (err) {
        this.mqttLogger.error(
          `Failed to subscribe to ${responseChannel}: ${err.message}`
        )
      }
    })

    return super.publish(partialPacket, callback)
  }

  // Reply channels stay subscribed for the lifetime of the client. Releasing
  // them when the last in-flight request resolves is what stranded the channel
  // on the broker side (issue #366).
  protected unsubscribeFromChannel (_channel: string): void {
    // Intentional no-op: the reply channel is never released.
  }
}
