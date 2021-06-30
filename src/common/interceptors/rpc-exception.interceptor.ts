import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus
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
          }

          return throwError(
            new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
          )
        }

        return throwError(err)
      })
    )
  }
}
