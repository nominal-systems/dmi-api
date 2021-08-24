import { GatewayTimeoutException } from '@nestjs/common'
import { ClientMqtt } from '@nestjs/microservices'
import { Observable, TimeoutError, throwError } from 'rxjs'
import { timeout, catchError } from 'rxjs/operators'
import { ENGINE_RESPONSE_TIMEOUT } from '../constants/engine.constant'

export class TimeoutClientMqtt extends ClientMqtt {
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
}
