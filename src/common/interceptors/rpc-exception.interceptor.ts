import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException
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
          return throwError(
            new HttpException(
              { type: RpcException.name, errors: err.errors },
              err.statusCode
            )
          )
        }

        return throwError(err)
      })
    )
  }
}
