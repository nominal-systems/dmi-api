import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FastifyReply } from 'fastify'

@Catch(HttpException)
export class FrontendHttpExceptionFilter implements ExceptionFilter {
  private readonly baseUrl: string

  constructor (private readonly configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('baseUrl', '') ?? ''
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  catch (exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<FastifyReply>()
    const status = exception.getStatus()

    if (status === 401) {
      // eslint-disable-next-line no-void
      void response.redirect(`${this.baseUrl}/ui/login`)
    } else {
      // If the status is not 401, send the original error response.
      // eslint-disable-next-line no-void
      void response.code(status).send({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: response.request.url
      })
    }
  }
}
