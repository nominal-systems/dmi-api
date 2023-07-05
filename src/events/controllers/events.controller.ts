import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { LeanDocument } from 'mongoose'
import { Organization } from '../../common/decorators/organization.decorator'
import { ApiGuard } from '../../common/guards/api.guard'
import { Organization as OrganizationEntity } from '../../organizations/entities/organization.entity'
import { GetEventsQueryParams } from '../dto/get-events-queryparams.dto'
import { Event } from '../entities/event.entity'
import { EventsService } from '../services/events.service'

@Controller('events')
@UseGuards(ApiGuard)
export class EventsController {
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
}
