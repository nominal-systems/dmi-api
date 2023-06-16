import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, headers } = request;
    const requestTimestamp = Date.now();

    return next.handle().pipe(
      tap((response: AxiosResponse) => {
        const responseTimestamp = Date.now();
        const responseTime = responseTimestamp - requestTimestamp;

        this.logRequest(method, url, headers);
        this.logResponse(response, responseTime);
      }),
    );
  }

  private logRequest(method: string, url: string, headers: any): void {
    this.logger.log(`Outgoing Request - ${method.toUpperCase()}: ${url}`);
    this.logger.debug(`Request Headers: ${JSON.stringify(headers, null, 2)}`);
  }

  private logResponse(response: AxiosResponse, responseTime: number): void {
    const { status, statusText, data, headers } = response;

    this.logger.log(`Incoming Response - Status: ${status} ${statusText} - Time: ${responseTime}ms`);
    this.logger.debug(`Response Headers: ${JSON.stringify(headers, null, 2)}`);
    this.logger.debug(`Response Body: ${JSON.stringify(data, null, 2)}`);
  }
}
