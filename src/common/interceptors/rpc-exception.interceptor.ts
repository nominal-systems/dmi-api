import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  InternalServerErrorException
} from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable()
export class RpcExceptionInterceptor implements NestInterceptor {
  intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
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
        }

        return throwError(err)
      })
    )
  }
}
