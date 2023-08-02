import { BadRequestException, Body, Controller, Inject, Logger, Param, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import ieMessageBuilder from '../common/utils/ieMessageBuilder'
import { ClientProxy } from '@nestjs/microservices'
import { Operation, Resource } from '@nominal-systems/dmi-engine-common'

@Controller('results')
@UseGuards(JwtAuthGuard)
export class ResultsController {
  private readonly logger = new Logger(ResultsController.name)

  constructor (
    @Inject('ACTIVEMQ') private readonly client: ClientProxy
  ) {
  }

  // TODO(gb): assert that the user is allowed to post results?
  @Post('heska/:clientId/')
  async processHeskaResults (
    @Param('clientId') clientId: string,
    @Body() results: any
  ): Promise<void> {
    const { message, messagePattern } = ieMessageBuilder('heska', {
      resource: Resource.Results,
      operation: Operation.Submit,
      data: {
        clientId: clientId,
        results: results
      }
    })

    try {
      await this.client.send(messagePattern, message).toPromise()
      this.logger.log(`Results from Heska client ${clientId} submitted`)
      // is returning 201 ok?
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
