import { IntegrationsService } from './integrations.service'
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
import { Integration } from './entities/integration.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Organization } from '../organizations/entities/organization.entity'
import { ProviderConfiguration } from '../providers/entities/provider-configuration.entity'
import { Provider } from '../providers/entities/provider.entity'
import { IntegrationStatus } from './constants/integration-status.enum'

const organization = {} as Organization

describe('IntegrationsService', () => {
  let integrationsService: IntegrationsService

  const configServiceMock = {
    get: jest.fn((key) => {
      switch (key) {
        case 'secretKey':
          return 'AAABBBCCCDDDEEEFFFGGGHHHIIIJJJKK'
        default:
          return undefined
      }
    }),
  }
  const integrationRepositoryMock = {
    findOne: jest.fn((obj) => obj),
    softDelete: jest.fn(),
    update: jest.fn(),
    create: jest.fn((obj) => {
      return {
        ...obj,
        status: IntegrationStatus.NEW,
      }
    }),
    save: jest.fn((obj) => obj),
  }
  const providerConfigurationRepositoryMock = {
    findOne: jest.fn((id) => {
      return {
        id,
        providerId: 'providerId',
        provider: {
          id: 'providerId',
        },
      }
    }),
  }
  const clientProxyMock = {
    send: jest.fn(),
  }
  const providersRepositoryMock = {
    findOne: jest.fn((id) => {
      return {
        id,
        options: [],
      }
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntegrationsService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
        {
          provide: getRepositoryToken(Integration),
          useValue: integrationRepositoryMock,
        },
        {
          provide: getRepositoryToken(ProviderConfiguration),
          useValue: providerConfigurationRepositoryMock,
        },
        {
          provide: getRepositoryToken(Provider),
          useValue: providersRepositoryMock,
        },
        {
          provide: 'ACTIVEMQ',
          useValue: clientProxyMock,
        },
      ],
    }).compile()

    integrationsService = module.get<IntegrationsService>(IntegrationsService)
  })

  it('should be defined', () => {
    expect(integrationsService).toBeDefined()
  })

  describe('delete()', () => {
    const integrationA = {
      id: 'integrationA',
      providerConfiguration: {
        id: 'providerConfigurationA',
      },
    }
    const integrationB = {
      id: 'integrationB',
      deletedAt: new Date(),
      providerConfiguration: {
        id: 'providerConfigurationA',
      },
    }

    it('should delete an integration', async () => {
      integrationRepositoryMock.findOne.mockResolvedValue(integrationA)
      await integrationsService.delete(organization, integrationA.id)
      expect(clientProxyMock.send).toHaveBeenCalled()
      expect(integrationRepositoryMock.softDelete).toHaveBeenCalledWith(integrationA.id)
      integrationRepositoryMock.softDelete.mockClear()
      clientProxyMock.send.mockClear()
    })

    it('should not delete a deleted integration', async () => {
      integrationRepositoryMock.findOne.mockResolvedValueOnce(integrationB)
      await integrationsService.delete(organization, integrationA.id)
      expect(clientProxyMock.send).toHaveBeenCalledTimes(0)
      expect(integrationRepositoryMock.softDelete).toHaveBeenCalledTimes(0)
      integrationRepositoryMock.softDelete.mockClear()
      clientProxyMock.send.mockClear()
    })

    it('should return a 404 if the integration does not exist', async () => {
      integrationRepositoryMock.findOne.mockResolvedValue(undefined)
      await expect(integrationsService.delete(organization, integrationA.id)).rejects.toThrowError()
    })
  })

  describe('create()', () => {
    it('should create an integration in NEW state and do not start it', async () => {
      integrationRepositoryMock.findOne.mockResolvedValue({ undefined })
      const integration = await integrationsService.create({
        practiceId: 'practiceId',
        providerConfigurationId: 'providerConfigurationId',
        integrationOptions: {},
      })
      expect(integration.status).toBe(IntegrationStatus.NEW)
    })
  })
})
