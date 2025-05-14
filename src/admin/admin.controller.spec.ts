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
import { ProviderRefService } from '../refs/providerRef.service'
import { ProviderRef } from '../refs/entities/providerRef.entity'
import { Ref } from '../refs/entities/ref.entity'
import { Practice } from '../practices/entities/practice.entity'
import { OrdersService } from '../orders/orders.service'
import { ExternalRequestsQueryDto } from './dtos/external-requests-query.dto'
import { PaginationResult } from '../common/classes/pagination-result'
import { ProviderExternalRequests } from '../providers/entities/provider-external-requests.entity'
import { ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common'
import { PAGINATION_PAGE_LIMIT } from '../common/constants/pagination.constant'
import { InternalEventLoggingService } from '../internal-event-logging/internal-event-logging.service'
import { OidcAuthGuard } from '../common/guards/oidc-auth.guard'
import { AdminJwtAuthGuard } from '../common/guards/admin-jwt-auth.guard'

describe('AdminController', () => {
  let adminController: AdminController
  const providersServiceMock = {
    findExternalRequests: jest.fn(),
    countExternalRequests: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: ConfigService,
          useValue: {}
        },
        {
          provide: OidcAuthGuard,
          useValue: {}
        },
        {
          provide: AdminJwtAuthGuard,
          useValue: {}
        },
        {
          provide: OrganizationsService,
          useValue: {}
        },
        {
          provide: ProviderConfigurationsService,
          useValue: {}
        },
        {
          provide: EventsService,
          useValue: {}
        },
        {
          provide: EventSubscriptionService,
          useValue: {}
        },
        {
          provide: IntegrationsService,
          useValue: {}
        },
        {
          provide: getRepositoryToken(Integration),
          useValue: {}
        },
        {
          provide: getRepositoryToken(Ref),
          useValue: {}
        },
        {
          provide: getRepositoryToken(ProviderRef),
          useValue: {}
        },
        {
          provide: RefsService,
          useValue: {}
        },
        {
          provide: ProvidersService,
          useValue: providersServiceMock
        },
        {
          provide: ProviderRefService,
          useValue: {}
        },
        {
          provide: getRepositoryToken(Practice),
          useValue: {}
        },
        {
          provide: OrdersService,
          useValue: {}
        },
        {
          provide: InternalEventLoggingService,
          useValue: {}
        }
      ]
    }).compile()

    adminController = module.get<AdminController>(AdminController)
  })

  it('should be defined', () => {
    expect(adminController).toBeDefined()
  })

  describe('getExternalRequests()', () => {
    const validationPipe = new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    })
    const metadata: ArgumentMetadata = { type: 'query', metatype: ExternalRequestsQueryDto }

    it('should validate and transform query parameters correctly', async () => {
      const query: ExternalRequestsQueryDto = {
        providers: ['provider1', 'provider2'],
        status: ['2xx', '4xx'],
        method: ['GET', 'POST'],
        startDate: '2023-01-01',
        endDate: '2023-01-31',
        page: 1,
        limit: 10
      }

      const expectedOptions = {
        provider: { $in: ['provider1', 'provider2'] },
        $or: [
          { status: { $gte: 200, $lte: 299 } },
          { status: { $gte: 400, $lte: 499 } }
        ],
        method: { $in: ['GET', 'POST'] },
        createdAt: { $gte: new Date('2023-01-01'), $lte: new Date('2023-01-31') }
      }

      const expectedResult: PaginationResult<ProviderExternalRequests> = {
        total: 2,
        page: 1,
        limit: 10,
        data: []
      }

      providersServiceMock.findExternalRequests.mockResolvedValueOnce(expectedResult.data)
      providersServiceMock.countExternalRequests.mockResolvedValueOnce(expectedResult.total)

      const result = await adminController.getExternalRequests(query)

      expect(providersServiceMock.findExternalRequests).toHaveBeenCalledWith(expectedOptions, { page: 1, limit: 10 })
      expect(providersServiceMock.countExternalRequests).toHaveBeenCalledWith(expectedOptions)
      expect(result).toEqual(expectedResult)
    })

    it('should throw BadRequestException for invalid query parameters', async () => {
      await expect(validationPipe.transform({ page: '-1' }, metadata)).rejects.toThrow(BadRequestException)
      await expect(validationPipe.transform({ page: 'a' }, metadata)).rejects.toThrow(BadRequestException)
      await expect(validationPipe.transform({ limit: '-1' }, metadata)).rejects.toThrow(BadRequestException)
    })

    it('should use default values if undefined', async () => {
      const transformedQuery = await validationPipe.transform({}, metadata)
      expect(transformedQuery).toBeInstanceOf(ExternalRequestsQueryDto)
      expect(transformedQuery.limit).toBe(PAGINATION_PAGE_LIMIT)
      expect(transformedQuery.page).toBe(1)
    })
  })
})
