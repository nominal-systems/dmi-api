import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { Request } from 'express'
import { HttpAdapterHost } from '@nestjs/core'
import { ProviderError } from '@nominal-systems/dmi-engine-common'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(AllExceptionsFilter.name)

  constructor (private readonly httpAdapterHost: HttpAdapterHost) {
  }

  catch (exception: unknown, host: ArgumentsHost): any {
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()

    let httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    let errorMessage = 'Internal Server Error'
    let errors: string[] = []
    if (exception instanceof HttpException) {
      errorMessage = exception.getResponse() as string
    } else if (exception instanceof ProviderError) {
      errorMessage = exception.response.message
      errors = exception.response.error
      httpStatus = exception.response.code
    } else if (exception instanceof Error) {
      errorMessage = exception.message
    }

    const responseBody = {
      statusCode: httpStatus,
      message: errorMessage,
      ...(errors.length > 0 && { errors }),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      timestamp: new Date().toISOString()
    }

    const logFormat = `Request failed with status ${httpStatus}: ${request.method} ${request.url} - Exception: ${JSON.stringify(errorMessage)}`
    this.logger.error(logFormat)

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
  }
}
