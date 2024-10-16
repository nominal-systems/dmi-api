import { Controller, Get, Res } from '@nestjs/common'
import { join } from 'path'
import { FastifyReply } from 'fastify'
import { readFileSync } from 'node:fs'

@Controller('ui')
export class FrontendController {
  @Get()
  async index (@Res() res: FastifyReply): Promise<void> {
    await this.sendFile(res, 'index.html')
  }

  @Get('login')
  async login (@Res() res: FastifyReply): Promise<void> {
    await this.sendFile(res, 'login.html')
  }

  @Get('integrations')
  async integrations (@Res() res: FastifyReply): Promise<void> {
    await this.sendFile(res, 'integrations.html')
  }

  @Get('integrations/:id')
  async integration (@Res() res: FastifyReply): Promise<void> {
    await this.sendFile(res, 'integration.html')
  }

  @Get('events')
  async events (@Res() res: FastifyReply): Promise<void> {
    await this.sendFile(res, 'events.html')
  }

  @Get('events/:id')
  async event (@Res() res: FastifyReply): Promise<void> {
    await this.sendFile(res, 'event.html')
  }

  @Get('external-requests')
  async externalRequests (@Res() res: FastifyReply): Promise<void> {
    await this.sendFile(res, 'external-requests.html')
  }

  @Get('providers')
  async providers (@Res() res: FastifyReply): Promise<void> {
    await this.sendFile(res, 'providers.html')
  }

  @Get('providers/:id')
  async provider (@Res() res: FastifyReply): Promise<void> {
    await this.sendFile(res, 'provider.html')
  }

  @Get('refs')
  async refs (@Res() res: FastifyReply): Promise<void> {
    await this.sendFile(res, 'refs.html')
  }

  @Get('practices')
  async practices (@Res() res: FastifyReply): Promise<void> {
    await this.sendFile(res, 'practices.html')
  }

  @Get('transaction-logs')
  async transactionLogs (@Res() res: FastifyReply): Promise<void> {
    await this.sendFile(res, 'transaction-logs.html')
  }

  private async sendFile (res: FastifyReply, filename: string): Promise<void> {
    const filePath = join(__dirname, '..', 'public', filename)
    const fileContent = readFileSync(filePath, 'utf-8')
    await res.type('text/html').send(fileContent)
  }
}
