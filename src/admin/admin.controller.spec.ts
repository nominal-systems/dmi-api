import { Test, TestingModule } from '@nestjs/testing'
import { AdminController } from './admin.controller'
import { ProviderConfigurationsService } from '../providers/services/provider-configurations.service'
import { IntegrationsService } from '../integrations/integrations.service'
import { EventSubscriptionService } from '../events/services/event-subscription.service'
import { OrganizationsService } from '../organizations/services/organizations.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Integration } from '../integrations/entities/integration.entity'
import { RefsService } from '../refs/refs.service'
import { ProvidersService } from '../providers/services/providers.service'
import { EventsService } from '../events/services/events.service'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { ProviderRefService } from '../refs/providerRef.service'
import { ProviderRef } from '../refs/entities/providerRef.entity'

describe('AdminController', () => {
  let controller: AdminController
  const organizationsServiceMock = {}
  const providersConfigurationsServiceMock = {}
  const integrationsServiceMock = {}
  const integrationsRepositoryMock = {}
  const providerRefRepositoryMock = {}
  const eventSubscriptionsServiceMock = {}
  const refsServiceMock = {}
  const providersServiceMock = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: OrganizationsService,
          useValue: organizationsServiceMock
        },
        {
          provide: ProviderConfigurationsService,
          useValue: providersConfigurationsServiceMock
        },
        {
          provide: EventsService,
          useValue: {}
        },
        {
          provide: EventSubscriptionService,
          useValue: eventSubscriptionsServiceMock
        },
        {
          provide: IntegrationsService,
          useValue: integrationsServiceMock
        },
        {
          provide: getRepositoryToken(Integration),
          useValue: integrationsRepositoryMock
        },
        {
          provide: getRepositoryToken(ProviderRef),
          useValue: providerRefRepositoryMock
        },
        {
          provide: RefsService,
          useValue: refsServiceMock
        },
        {
          provide: ProvidersService,
          useValue: providersServiceMock
        },
        {
          provide: ConfigService,
          useValue: {}
        },
        {
          provide: JwtService,
          useValue: {}
        },
        {
          provide: ProviderRefService,
          useValue: {}
        }
      ]
    }).compile()

    controller = module.get<AdminController>(AdminController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
