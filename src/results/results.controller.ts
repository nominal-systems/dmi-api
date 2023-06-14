import { Body, Controller, Inject, Param, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import ieMessageBuilder from '../common/utils/ieMessageBuilder'
import { ClientProxy } from '@nestjs/microservices'

@Controller('results')
@UseGuards(JwtAuthGuard)
export class ResultsController {
  constructor (
    @Inject('ACTIVEMQ') private readonly client: ClientProxy
  ) {
  }

// TODO(gb): assert that the user is allowed to post results?
  @Post(':providerId')
  async processHeskaResults (
    @Param('providerId') providerId: string,
    @Body() results: any
  ): Promise<void> {
    const { message, messagePattern } = ieMessageBuilder(providerId, {
      resource: 'results',
      operation: 'submit',
      data: {
        payload: results
      }
    })

    await this.client.send(messagePattern, message)
  }
}
