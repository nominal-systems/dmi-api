import { Test, TestingModule } from '@nestjs/testing'
import { AdminController } from './admin.controller'
import { ConfigService } from '@nestjs/config'
import { ProviderConfigurationsService } from '../providers/services/provider-configurations.service'
import { IntegrationsService } from '../integrations/integrations.service'
import { EventSubscriptionService } from '../events/services/event-subscription.service'
import { OrganizationsService } from '../organizations/services/organizations.service'

describe('AdminController', () => {
  let controller: AdminController
  const configServiceMock = {
    get: jest.fn()
  }
  const organizationsServiceMock = {}
  const providersConfigurationsServiceMock = {}
  const integrationsServiceMock = {}
  const eventSubscriptionsServiceMock = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: ConfigService,
          useValue: configServiceMock
        },
        {
          provide: OrganizationsService,
          useValue: organizationsServiceMock
        },
        {
          provide: ProviderConfigurationsService,
          useValue: providersConfigurationsServiceMock
        },
        {
          provide: EventSubscriptionService,
          useValue: eventSubscriptionsServiceMock
        },
        {
          provide: IntegrationsService,
          useValue: integrationsServiceMock
        }
      ]
    }).compile()

    controller = module.get<AdminController>(AdminController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
