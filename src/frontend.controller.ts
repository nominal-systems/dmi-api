import { Controller, Get, Res } from '@nestjs/common'
import { join } from 'path'
import { FastifyReply } from 'fastify'
import { readFileSync } from 'node:fs'

@Controller('ui')
export class FrontendController {
  @Get('login')
  async login (@Res() res: FastifyReply): Promise<void> {
    await this.sendFile(res, 'login.html')
  }

  @Get('integrations')
  async integrations (@Res() res: FastifyReply): Promise<void> {
    await this.sendFile(res, 'integrations.html')
  }

  @Get('events')
  async events (@Res() res: FastifyReply): Promise<void> {
    await this.sendFile(res, 'events.html')
  }

  @Get('external-requests')
  async externalRequests (@Res() res: FastifyReply): Promise<void> {
    await this.sendFile(res, 'external-requests.html')
  }

  @Get('providers')
  async providers (@Res() res: FastifyReply): Promise<void> {
    await this.sendFile(res, 'providers.html')
  }

  @Get('refs')
  async refs (@Res() res: FastifyReply): Promise<void> {
    await this.sendFile(res, 'refs.html')
  }

  private async sendFile (res: FastifyReply, filename: string): Promise<void> {
    const filePath = join(__dirname, '..', 'public', filename)
    const fileContent = readFileSync(filePath, 'utf-8')
    await res.type('text/html').send(fileContent)
  }
}
