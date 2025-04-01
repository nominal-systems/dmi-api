import { ClientProxy } from '@nestjs/microservices'
import { IntegrationsService } from '../../integrations/integrations.service'
import { ProvidersService } from './providers.service'
import { Model } from 'mongoose'
import * as fs from 'fs'
import * as path from 'path'
import { ProviderExternalRequestDocument } from '../entities/provider-external-requests.entity'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Integration } from '../../integrations/entities/integration.entity'
import { ProviderConfiguration } from '../entities/provider-configuration.entity'
import { Provider } from '../entities/provider.entity'
import { ProviderOption } from '../entities/provider-option.entity'

const configServiceMock = {
  get: jest.fn()
}
const integrationRepositoryMock = {
  findOne: jest.fn((obj) => obj),
  softDelete: jest.fn(),
  update: jest.fn()
}
const providerConfigurationRepositoryMock = {}
const clientProxyMock = {
  emit: jest.fn()
}
const providersRepositoryMock = {
  findOne: jest.fn((obj) => obj),
  find: jest.fn((obj) => obj),
  update: jest.fn()
}
const providerOptionRepositoryMock = {}

describe('ProvidersService', () => {
  let service: ProvidersService
  // let integrationsService: IntegrationsService
  // let clientProxy: ClientProxy
  let providerExternalRequestsModel: Model<ProviderExternalRequestDocument>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvidersService,
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
          provide: getRepositoryToken(ProviderConfiguration),
          useValue: providerConfigurationRepositoryMock
        },
        { provide: ClientProxy, useValue: {} },
        { provide: getModelToken('ProviderExternalRequests'), useValue: { create: jest.fn() } },
        {
          provide: getRepositoryToken(Provider),
          useValue: providersRepositoryMock
        },
        {
          provide: 'ACTIVEMQ',
          useValue: clientProxyMock
        },
        {
          provide: getRepositoryToken(ProviderOption),
          useValue: providerOptionRepositoryMock
        }
      ]
    }).compile()

    service = module.get<ProvidersService>(ProvidersService)
    // integrationsService = module.get<IntegrationsService>(IntegrationsService)
    // clientProxy = module.get<ClientProxy>(ClientProxy)
    providerExternalRequestsModel = module.get<Model<any>>(getModelToken('ProviderExternalRequests'))
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('saveProviderRawData', () => {
    it('should save the correct raw data having a JSON body', async () => {
      const createSpy = jest.spyOn(providerExternalRequestsModel, 'create')
      const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', 'test', 'externalRequests', 'results.json'), 'utf8'))

      await service.saveProviderRawData(data)

      expect(createSpy).toHaveBeenCalledWith({
        createdAt: expect.any(Date),
        headers: data.headers,
        body: data.body,
        url: data.url,
        method: data.method,
        provider: data.provider,
        status: data.status
      }, expect.any(Function))

      createSpy.mockRestore()
    })
    it('should save the correct raw data having a XML body', async () => {
      const createSpy = jest.spyOn(providerExternalRequestsModel, 'create')
      const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', 'test', 'externalRequests', 'results.json'), 'utf8'))
      data.body = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'test', 'externalRequests', 'results.xml'), 'utf8')
      await service.saveProviderRawData(data)

      expect(createSpy).toHaveBeenCalledWith({
        createdAt: expect.any(Date),
        headers: data.headers,
        body: data.body,
        url: data.url,
        method: data.method,
        provider: data.provider,
        status: data.status
      }, expect.any(Function))

      createSpy.mockRestore()
    })
    it('should save the payload when defined', async () => {
      const createSpy = jest.spyOn(providerExternalRequestsModel, 'create')
      const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', 'test', 'externalRequests', 'result-payload.json'), 'utf8'))

      await service.saveProviderRawData(data)

      expect(createSpy).toHaveBeenCalledWith({
        createdAt: expect.any(Date),
        headers: data.headers,
        body: data.body,
        url: data.url,
        method: data.method,
        provider: data.provider,
        status: data.status,
        payload: data.payload
      }, expect.any(Function))

      createSpy.mockRestore()
    })
    it('should remove duplicate accession IDs before saving', async () => {
      const createSpy = jest.spyOn(providerExternalRequestsModel, 'create')

      const data = {
        headers: { 'Content-Type': 'application/json' },
        body: { some: 'data' },
        url: 'http://example.com',
        method: 'POST',
        provider: 'test-provider',
        status: 200,
        accessionIds: ['ACC123', 'ACC123', 'ACC456', 'ACC789', 'ACC789'], // Duplicates present
        payload: { extra: 'info' }
      }

      await service.saveProviderRawData(data)

      expect(createSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          accessionIds: ['ACC123', 'ACC456', 'ACC789'] // Expect duplicates removed
        }),
        expect.any(Function)
      )

      createSpy.mockRestore()
    })
  })
  describe('checkLabRequisitionParameters()', () => {
    it('should throw an error if the lab requisition parameters are not defined or null', async () => {
      const labRequisitionInfo = {
        KitCode: null
      }

      // Mocks
      jest.spyOn(service, 'findOneById').mockReturnValue(Promise.resolve({
        labRequisitionParameters: [
          {
            name: 'KitCode',
            type: 'string',
            required: true
          }
        ]
      } as unknown as Provider))

      await expect(service.checkLabRequisitionParameters('provider', labRequisitionInfo))
        .rejects
        .toThrowError('The following lab requisition parameters are required and can\'t be null or empty: KitCode.')
    })
  })
})
