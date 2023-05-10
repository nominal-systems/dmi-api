import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NestInterceptor
} from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable()
export class RpcExceptionInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(RpcExceptionInterceptor.name)

  intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        this.logger.debug(JSON.stringify(err))
        if (err.type != null && err.type === RpcException.name) {
          if (
            err.response?.statusCode != null &&
            err.response?.message != null
          ) {
            return throwError(new HttpException(err.response, err.status))
          } else if (typeof err.response === 'string') {
            const { type, ...rest } = err
            return throwError(new HttpException(rest, rest.status))
          }

          return throwError(
            new InternalServerErrorException(err)
          )
        } else if (err.status != null && err.message != null) {
          const { status, message, response } = err
          let messageString = response.error != null ? response.error : message
          if (response.errors != null) {
            messageString = response.errors.map(err => err.message).join(', ')
          }
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          const path = response.path != null ? ` ${response.path}` : ''
          const separator = path !== '' ? ' - ' : ' '
          const logFormat = `Engine failed with status ${JSON.stringify(status)}:${path}${separator}Exception: ${JSON.stringify(messageString)}`
          this.logger.error(logFormat)
        }

        return throwError(err)
      })
    )
  }
}
