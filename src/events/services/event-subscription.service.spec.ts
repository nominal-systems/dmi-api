import { EventSubscriptionService } from './event-subscription.service'
import { Test, TestingModule } from '@nestjs/testing'
import { MockUtils } from '../../common/test/mock-utils'
import { Repository } from 'typeorm'
import { EventSubscription } from '../entities/event-subscription.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { IntegrationsService } from '../../integrations/integrations.service'

const repositoryMockFactory: () => MockUtils<Repository<any>> = jest.fn(() => ({}))

describe('EventSubscriptionService', () => {
  let service: EventSubscriptionService
  // let eventSubscriptionRepositoryMock: MockUtils<Repository<EventSubscription>>
  const integrationsServiceMock = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventSubscriptionService,
        {
          provide: getRepositoryToken(EventSubscription),
          useFactory: repositoryMockFactory
        },
        {
          provide: IntegrationsService,
          useValue: integrationsServiceMock
        }
      ]
    }).compile()

    service = module.get<EventSubscriptionService>(EventSubscriptionService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
