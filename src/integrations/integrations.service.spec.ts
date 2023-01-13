import { IntegrationsService } from './integrations.service'
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
import { Integration } from './entities/integration.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Organization } from '../organizations/entities/organization.entity'

const organization = {} as Organization

describe('IntegrationsService', () => {
  let service: IntegrationsService

  const configServiceMock = {
    get: jest.fn()
  }
  const integrationRepositoryMock = {
    findOne: jest.fn((obj) => obj),
    softDelete: jest.fn()
  }
  const clientProxyMock = {
    emit: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntegrationsService,
        {
          provide: ConfigService,
          useValue: configServiceMock
        },
        {
          provide: getRepositoryToken(Integration),
          useValue: integrationRepositoryMock
        },
        {
          provide: 'ACTIVEMQ',
          useValue: clientProxyMock
        }
      ]
    }).compile()

    service = module.get<IntegrationsService>(IntegrationsService)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('delete()', () => {
    const integrationA = {
      id: 'integrationA',
      providerConfiguration: {
        id: 'providerConfigurationA'
      }
    }
    const integrationB = {
      id: 'integrationB',
      deletedAt: new Date(),
      providerConfiguration: {
        id: 'providerConfigurationA'
      }
    }

    it('should delete an integration', async () => {
      integrationRepositoryMock.findOne.mockResolvedValue(integrationA)
      await service.delete(organization, integrationA.id)
      expect(clientProxyMock.emit).toHaveBeenCalled()
      expect(integrationRepositoryMock.softDelete).toHaveBeenCalledWith(integrationA.id)
    })

    it('should not delete a deleted integration', async () => {
      integrationRepositoryMock.findOne.mockResolvedValue(integrationB)
      await service.delete(organization, integrationA.id)
      expect(clientProxyMock.emit).toHaveBeenCalledTimes(0)
      expect(integrationRepositoryMock.softDelete).toHaveBeenCalledTimes(0)
    })

    it('should return a 404 if the integration does not exist', async () => {
      integrationRepositoryMock.findOne.mockResolvedValue(undefined)
      await expect(service.delete(organization, integrationA.id)).rejects.toThrowError()
    })
  })
})
