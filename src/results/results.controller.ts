import { Body, Controller, Inject, Logger, Param, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import ieMessageBuilder from '../common/utils/ieMessageBuilder'
import { ClientProxy } from '@nestjs/microservices'
import { Operation, Resource } from '../../../dmi-engine-common'

@Controller('results')
@UseGuards(JwtAuthGuard)
export class ResultsController {
  private readonly logger = new Logger(ResultsController.name)

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
      resource: Resource.Results,
      operation: Operation.Submit,
      data: {
        payload: results
      }
    })

    await this.client.send(messagePattern, message).toPromise()
    this.logger.log(`Results from ${providerId} submitted`)
  }
}
