import { Test, TestingModule } from '@nestjs/testing'
import { ProviderConfigurationsService } from './provider-configurations.service'
import { ProvidersService } from './providers.service'
import { IntegrationsService } from '../../integrations/integrations.service'
import { ConfigService } from '@nestjs/config'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ProviderConfiguration } from '../entities/provider-configuration.entity'
import { Integration } from '../../integrations/entities/integration.entity'
import { BadRequestException } from '@nestjs/common'
import { Organization } from '../../organizations/entities/organization.entity'

const providerConfigurationRepositoryMock = {}
const integrationsRepositoryMock = {}
const providersServiceMock = { findOneById: jest.fn() }
const integrationsServiceMock = {}
const configServiceMock = {
  get: jest.fn(() => 'AAABBBCCCDDDEEEFFFGGGHHHIIIJJJKK')
}

describe('ProviderConfigurationsService', () => {
  let service: ProviderConfigurationsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProviderConfigurationsService,
        {
          provide: getRepositoryToken(ProviderConfiguration),
          useValue: providerConfigurationRepositoryMock
        },
        { provide: getRepositoryToken(Integration), useValue: integrationsRepositoryMock },
        { provide: ProvidersService, useValue: providersServiceMock },
        { provide: IntegrationsService, useValue: integrationsServiceMock },
        { provide: ConfigService, useValue: configServiceMock }
      ]
    }).compile()

    service = module.get<ProviderConfigurationsService>(ProviderConfigurationsService)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should reject provider configuration options with leading or trailing whitespace', async () => {
    providersServiceMock.findOneById.mockResolvedValue({
      configurationOptions: [
        {
          name: 'username',
          type: 'string',
          required: true
        }
      ]
    })

    const organization = {} as Organization
    const options = { configuration: { username: ' admin ' } }

    await expect(service.create(organization, 'providerId', options)).rejects.toThrow(
      BadRequestException
    )
  })
})
