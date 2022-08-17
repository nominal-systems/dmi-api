import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, UseGuards } from '@nestjs/common'
import { ApiGuard } from '../../common/guards/api.guard'
import { CreateEventSubscriptionDto } from '../dto/create-event-subscription.dto'
import { EventSubscription } from '../entities/event-subscription.entity'
import { EventSubscriptionService } from '../services/event-subscription.service'
import { Organization } from '../../common/decorators/organization.decorator'
import { Organization as OrganizationEntity } from '../../organizations/entities/organization.entity'

@Controller('event-subscriptions')
@UseGuards(ApiGuard)
export class EventSubscriptionsController {
  private readonly logger = new Logger(EventSubscriptionsController.name)

  constructor (
    private readonly eventSubscriptionService: EventSubscriptionService
  ) {}

  @Get(':id')
  async getEventSubscription (
    @Organization() organization: OrganizationEntity,
    @Param('id') subscriptionId: string
  ): Promise<EventSubscription> {
    return await this.eventSubscriptionService.findOne({
      options: {
        where: {
          id: subscriptionId,
          organizationId: organization.id
        }
      }
    })
  }

  @Post()
  async createEventSubscription (
    @Organization() organization: OrganizationEntity,
    @Body() createEventSubscriptionDto: CreateEventSubscriptionDto
  ): Promise<EventSubscription> {
    return await this.eventSubscriptionService.create(organization.id, createEventSubscriptionDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEventSubscription (
    @Organization() organization: OrganizationEntity,
    @Param('id') subscriptionId: string
  ): Promise<void> {
    await this.eventSubscriptionService.delete(organization.id, subscriptionId)
  }
}
