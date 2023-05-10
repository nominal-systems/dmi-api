import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { Request } from 'express'
import { HttpAdapterHost } from '@nestjs/core'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(AllExceptionsFilter.name)

  constructor (private readonly httpAdapterHost: HttpAdapterHost) {
  }

  catch (exception: unknown, host: ArgumentsHost): any {
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const errorMessage = exception instanceof HttpException
      ? exception.getResponse()
      : 'Internal server error'

    const responseBody = {
      statusCode: httpStatus,
      message: errorMessage,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      timestamp: new Date().toISOString()
    }

    const logFormat = `Request failed with status ${httpStatus}: ${request.method} ${request.url} - Exception: ${JSON.stringify(errorMessage)}`
    this.logger.error(logFormat)

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
  }
}
