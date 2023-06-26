import { Controller, Get, Logger, Query, UseGuards } from '@nestjs/common'
import { LeanDocument } from 'mongoose'
import { Organization } from '../../common/decorators/organization.decorator'
import { ApiGuard } from '../../common/guards/api.guard'
import { Organization as OrganizationEntity } from '../../organizations/entities/organization.entity'
import { GetEventsQueryParams } from '../dto/get-events-queryparams.dto'
import { Event } from '../entities/event.entity'
import { EventsService } from '../services/events.service'
import { EventPattern } from '@nestjs/microservices'
import { DisableGuards } from 'src/common/decorators/disable-guards.decorator'
import { ProviderRawData } from '@nominal-systems/dmi-engine-common'

@Controller('events')
@UseGuards(ApiGuard)
export class EventsController {
  private readonly logger = new Logger(EventsController.name)
  constructor (private readonly eventsService: EventsService) {
  }

  @Get()
  async getEvents (
    @Organization() organization: OrganizationEntity,
    @Query() { start_seq: seq, practice_id: practiceId }: GetEventsQueryParams
  ): Promise<Array<LeanDocument<Event>>> {
    return await this.eventsService.getEventsForOrganization(organization, {
      seq,
      practiceId
    })
  }

  @EventPattern('raw_data')
  @DisableGuards(ApiGuard)
  async handleProviderRawData (data: ProviderRawData): Promise<void> {
    const { provider, url }: ProviderRawData = data

    this.logger.debug(`${provider} ${url}`)
  }
}
