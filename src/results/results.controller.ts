import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Inject,
  Logger,
  Param,
  Post,
  Req
} from '@nestjs/common'
import ieMessageBuilder from '../common/utils/ieMessageBuilder'
import { ClientProxy } from '@nestjs/microservices'
import { Operation, Resource } from '@nominal-systems/dmi-engine-common'
import { ProvidersService } from '../providers/services/providers.service'
import { FastifyRequest } from 'fastify'
import { ProviderRawDataDto } from '../providers/dtos/provider-raw-data.dto'

@Controller('results')
export class ResultsController {
  private readonly logger = new Logger(ResultsController.name)

  constructor (
    @Inject('ACTIVEMQ') private readonly client: ClientProxy,
    private readonly providerService: ProvidersService
  ) {
  }

  // TODO(gb): assert that the user is allowed to post results
  @Post('heska/:clientId')
  @HttpCode(201)
  async processHeskaResults (
    @Req() req: FastifyRequest,
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

    const providerRawData: ProviderRawDataDto = {
      provider: 'heska',
      status: 201,
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      url: `${req.protocol}://${req.headers.host}${req.url}`,
      method: req.method,
      body: '',
      payload: results
    }

    try {
      await this.client.send(messagePattern, message).toPromise()
      this.logger.log(`Results from Heska client ${clientId} submitted`)

      // Save external req
      await this.providerService.saveProviderRawData(providerRawData)
    } catch (err) {
      const badRequestException = new BadRequestException(err.message)
      providerRawData.status = 400
      providerRawData.body = badRequestException.getResponse()
      await this.providerService.saveProviderRawData(providerRawData)
      throw badRequestException
    }
  }
}
