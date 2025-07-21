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
import { IntegrationStatus } from '../../integrations/constants/integration-status.enum'

const providerConfigurationRepositoryMock = {
  findOne: jest.fn(),
  update: jest.fn(),
}
const integrationsRepositoryMock = { find: jest.fn() }
const providersServiceMock = { findOneById: jest.fn() }
const integrationsServiceMock = { updateJobs: jest.fn() }
const configServiceMock = {
  get: jest.fn(() => 'AAABBBCCCDDDEEEFFFGGGHHHIIIJJJKK'),
}

describe('ProviderConfigurationsService', () => {
  let service: ProviderConfigurationsService

  beforeEach(async () => {
    configServiceMock.get.mockReturnValue('AAABBBCCCDDDEEEFFFGGGHHHIIIJJJKK')
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProviderConfigurationsService,
        {
          provide: getRepositoryToken(ProviderConfiguration),
          useValue: providerConfigurationRepositoryMock,
        },
        { provide: getRepositoryToken(Integration), useValue: integrationsRepositoryMock },
        { provide: ProvidersService, useValue: providersServiceMock },
        { provide: IntegrationsService, useValue: integrationsServiceMock },
        { provide: ConfigService, useValue: configServiceMock },
      ],
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
          required: true,
        },
      ],
    })

    const organization = {} as Organization
    const options = { configuration: { username: ' admin ' } }

    await expect(service.create(organization, 'providerId', options)).rejects.toThrow(
      BadRequestException,
    )
  })

  it('should update jobs only for running integrations', async () => {
    providersServiceMock.findOneById.mockResolvedValue({ configurationOptions: [] })
    providerConfigurationRepositoryMock.findOne.mockResolvedValue({
      id: 'config',
      organization: {} as Organization,
    })
    const runningIntegration = {
      id: 'int1',
      providerConfiguration: {},
      integrationOptions: {},
    }
    integrationsRepositoryMock.find.mockResolvedValue([runningIntegration])

    await service.update({} as Organization, 'provider', 'config', { configuration: {} })

    expect(integrationsRepositoryMock.find).toHaveBeenCalledWith({
      where: { providerConfigurationId: 'config', status: IntegrationStatus.RUNNING },
      relations: ['providerConfiguration', 'practice'],
    })
    expect(integrationsServiceMock.updateJobs).toHaveBeenCalledTimes(1)
    expect(integrationsServiceMock.updateJobs).toHaveBeenCalledWith(
      runningIntegration.id,
      runningIntegration.providerConfiguration,
      runningIntegration.integrationOptions,
    )
  })
})
