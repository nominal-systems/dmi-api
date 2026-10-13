import { ClientProxy } from '@nestjs/microservices'
import { IntegrationsService } from '../../integrations/integrations.service'
import { ProvidersService } from './providers.service'
import { Model } from 'mongoose'
import * as fs from 'fs'
import * as path from 'path'
import { ProviderExternalRequestDocument } from '../entities/provider-external-requests.entity'
import { buildExternalRequestPartitionKey, ProviderExternalRequestV3Document } from '../entities/provider-external-requests-v3.entity'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Integration } from '../../integrations/entities/integration.entity'
import { ProviderConfiguration } from '../entities/provider-configuration.entity'
import { Provider } from '../entities/provider.entity'
import { ProviderOption } from '../entities/provider-option.entity'
import { Practice } from '../../practices/entities/practice.entity'
import { BadRequestException, GatewayTimeoutException, HttpException, NotFoundException } from '@nestjs/common'
import { ProviderError } from '@nominal-systems/dmi-engine-common'
import { of, throwError } from 'rxjs'

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
  emit: jest.fn(),
  send: jest.fn()
}
const providersRepositoryMock = {
  findOne: jest.fn((obj) => obj),
  find: jest.fn((obj) => obj),
  update: jest.fn()
}
const providerOptionRepositoryMock = {}

describe('ProvidersService', () => {
  let service: ProvidersService
  let integrationsService: IntegrationsService
  // let clientProxy: ClientProxy
  let providerExternalRequestsModel: Model<ProviderExternalRequestDocument>
  let providerExternalRequestsV3Model: Model<ProviderExternalRequestV3Document>

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
        { provide: getModelToken('ProviderExternalRequests'), useValue: { create: jest.fn(), countDocuments: jest.fn() } },
        { provide: getModelToken('ProviderExternalRequestsV3'), useValue: { create: jest.fn(), countDocuments: jest.fn() } },
        {
          provide: getRepositoryToken(Provider),
          useValue: providersRepositoryMock
        },
        {
          provide: getRepositoryToken(Practice),
          useValue: {}
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
    integrationsService = module.get<IntegrationsService>(IntegrationsService)
    // clientProxy = module.get<ClientProxy>(ClientProxy)
    providerExternalRequestsModel = module.get<Model<any>>(getModelToken('ProviderExternalRequests'))
    providerExternalRequestsV3Model = module.get<Model<any>>(getModelToken('ProviderExternalRequestsV3'))
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('saveProviderRawData', () => {
    it('should save the correct raw data having a JSON body', async () => {
      const createSpy = jest.spyOn(providerExternalRequestsV3Model, 'create')
      const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', 'test', 'externalRequests', 'results.json'), 'utf8'))

      await service.saveProviderRawData(data)

      expect(createSpy).toHaveBeenCalledWith({
        createdAt: expect.any(Date),
        headers: data.headers,
        body: data.body,
        url: data.url,
        method: data.method,
        provider: data.provider,
        status: data.status,
        partitionKey: expect.stringMatching(new RegExp(`^${String(data.provider)}:na:\\d{8}$`))
      }, expect.any(Function))

      createSpy.mockRestore()
    })
    it('should save the correct raw data having a XML body', async () => {
      const createSpy = jest.spyOn(providerExternalRequestsV3Model, 'create')
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
        status: data.status,
        partitionKey: expect.stringMatching(new RegExp(`^${String(data.provider)}:na:\\d{8}$`))
      }, expect.any(Function))

      createSpy.mockRestore()
    })
    it('should save the payload when defined', async () => {
      const createSpy = jest.spyOn(providerExternalRequestsV3Model, 'create')
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
        payload: data.payload,
        partitionKey: expect.stringMatching(new RegExp(`^${String(data.provider)}:na:\\d{8}$`))
      }, expect.any(Function))

      createSpy.mockRestore()
    })
    it('should remove duplicate accession IDs before saving', async () => {
      const createSpy = jest.spyOn(providerExternalRequestsV3Model, 'create')

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
    it('should resolve and save the practiceId when integrationId is present', async () => {
      const createSpy = jest.spyOn(providerExternalRequestsV3Model, 'create')
      const findOneSpy = jest.spyOn(integrationsService, 'findOne').mockResolvedValue({
        id: 'integration-1',
        practiceId: 'practice-1'
      } as unknown as Integration)

      const data = {
        headers: { 'Content-Type': 'application/json' },
        body: { some: 'data' },
        url: 'http://example.com',
        method: 'GET',
        provider: 'test-provider',
        status: 200,
        integrationId: 'integration-1',
        payload: undefined
      }

      await service.saveProviderRawData(data)

      expect(findOneSpy).toHaveBeenCalledWith({
        id: 'integration-1',
        options: { withDeleted: true }
      })
      expect(createSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          integrationId: 'integration-1',
          practiceId: 'practice-1',
          partitionKey: expect.stringMatching(/^test-provider:practice-1:\d{8}$/)
        }),
        expect.any(Function)
      )

      createSpy.mockRestore()
      findOneSpy.mockRestore()
    })
    it('should cache the integration → practice lookup', async () => {
      const findOneSpy = jest.spyOn(integrationsService, 'findOne').mockResolvedValue({
        id: 'integration-1',
        practiceId: 'practice-1'
      } as unknown as Integration)

      const data = {
        headers: {},
        body: {},
        url: 'http://example.com',
        method: 'GET',
        provider: 'test-provider',
        status: 200,
        integrationId: 'integration-1',
        payload: undefined
      }

      await service.saveProviderRawData(data)
      await service.saveProviderRawData(data)

      expect(findOneSpy).toHaveBeenCalledTimes(1)

      findOneSpy.mockRestore()
    })
    it('should save the integrationId without practiceId when the integration cannot be resolved', async () => {
      const createSpy = jest.spyOn(providerExternalRequestsV3Model, 'create')
      const findOneSpy = jest.spyOn(integrationsService, 'findOne')
        .mockRejectedValue(new Error('The integration was not found'))

      const data = {
        headers: {},
        body: {},
        url: 'http://example.com',
        method: 'GET',
        provider: 'test-provider',
        status: 200,
        integrationId: 'missing-integration',
        payload: undefined
      }

      await service.saveProviderRawData(data)

      expect(createSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          integrationId: 'missing-integration',
          partitionKey: expect.stringMatching(/^test-provider:missing-integration:\d{8}$/)
        }),
        expect.any(Function)
      )
      const saved = createSpy.mock.calls[0][0] as any
      expect(saved.practiceId).toBeUndefined()

      createSpy.mockRestore()
      findOneSpy.mockRestore()
    })
    it('should log and retry without the body when a write error is reported (regression: MongoServerError)', async () => {
      // mongoose 6 / driver 4 renamed server errors from MongoError to MongoServerError,
      // which the old error.name check silently ignored, dropping the write with no trace.
      const error = Object.assign(new Error('Request rate is large'), { name: 'MongoServerError', code: 16500 })
      const bodies: any[] = []
      const createSpy = jest.spyOn(providerExternalRequestsV3Model, 'create')
        .mockImplementationOnce((data: any, cb: any) => { bodies.push(data.body); cb(error); return undefined as any })
        .mockImplementationOnce((data: any, cb: any) => { bodies.push(data.body); cb(null); return undefined as any })
      const loggerSpy = jest.spyOn((service as any).logger, 'error').mockImplementation(() => {})

      const data = {
        headers: { 'Content-Type': 'application/json' },
        body: { some: 'data' },
        url: 'http://example.com',
        method: 'POST',
        provider: 'test-provider',
        status: 200,
        payload: undefined
      }

      await service.saveProviderRawData(data)

      expect(createSpy).toHaveBeenCalledTimes(2)
      expect(bodies[0]).toBeDefined() // first attempt keeps the body
      expect(bodies[1]).toBeUndefined() // fallback drops the body
      expect(loggerSpy).toHaveBeenCalledTimes(1)

      createSpy.mockRestore()
      loggerSpy.mockRestore()
    })
    it('should log again when the body-less fallback write also fails', async () => {
      const error = Object.assign(new Error('boom'), { name: 'MongoServerError' })
      const createSpy = jest.spyOn(providerExternalRequestsV3Model, 'create')
        .mockImplementation((_data: any, cb: any) => { cb(error); return undefined as any })
      const loggerSpy = jest.spyOn((service as any).logger, 'error').mockImplementation(() => {})

      const data = {
        headers: {},
        body: { some: 'data' },
        url: 'http://example.com',
        method: 'POST',
        provider: 'test-provider',
        status: 200,
        payload: undefined
      }

      await service.saveProviderRawData(data)

      expect(createSpy).toHaveBeenCalledTimes(2)
      expect(loggerSpy).toHaveBeenCalledTimes(2)

      createSpy.mockRestore()
      loggerSpy.mockRestore()
    })
  })
  describe('buildExternalRequestPartitionKey', () => {
    it('should scope the key to provider, practice and UTC day', () => {
      const createdAt = new Date('2026-07-05T23:59:59.999Z')
      expect(buildExternalRequestPartitionKey('idexx', 'practice-42', createdAt))
        .toEqual('idexx:practice-42:20260705')
    })
    it('should fall back to na when no practice or integration is available', () => {
      const createdAt = new Date('2026-01-02T00:00:00.000Z')
      expect(buildExternalRequestPartitionKey('zoetis', undefined, createdAt))
        .toEqual('zoetis:na:20260102')
    })
  })
  describe('countExternalRequests', () => {
    it('should sum counts from v3 and the draining v2 collection', async () => {
      jest.spyOn(providerExternalRequestsV3Model, 'countDocuments').mockResolvedValue(7 as never)
      jest.spyOn(providerExternalRequestsModel, 'countDocuments').mockResolvedValue(5 as never)

      expect(await service.countExternalRequests({ provider: 'idexx' })).toEqual(12)
    })
  })
  describe('getDevices()', () => {
    // An engine's error reply arrives as parsed JSON, not as the class it was thrown as.
    const overTheWire = (error: unknown): any => JSON.parse(JSON.stringify(error))
    const failure = async (): Promise<HttpException> => await service.getDevices('idexx', 'integration-1').then(
      () => { throw new Error('expected getDevices to fail') },
      (error) => error
    )

    beforeEach(() => {
      jest.spyOn(integrationsService, 'findOne').mockResolvedValue({
        providerConfiguration: { configurationOptions: {} },
        integrationOptions: {}
      } as unknown as Integration)
    })

    it('should return the devices the engine lists', async () => {
      clientProxyMock.send.mockReturnValue(of([{ serialNumber: 'SN-1' }]))

      expect(await service.getDevices('idexx', 'integration-1')).toEqual([{ serialNumber: 'SN-1' }])
    })

    it('should answer 404 for an unknown integration, without asking the engine', async () => {
      jest.spyOn(integrationsService, 'findOne').mockRejectedValue(new NotFoundException('The integration was not found'))

      const error = await failure()

      expect(error.getStatus()).toEqual(404)
      expect(error.message).toEqual('The integration was not found')
      expect(clientProxyMock.send).not.toHaveBeenCalled()
    })

    it('should answer 504 when the engine does not respond in time', async () => {
      clientProxyMock.send.mockReturnValue(throwError(() => new GatewayTimeoutException('The engine did not respond in time')))

      const error = await failure()

      expect(error.getStatus()).toEqual(504)
      expect(error.message).toEqual('The engine did not respond in time')
    })

    it('should answer 502 naming the provider and its errors when the provider fails', async () => {
      clientProxyMock.send.mockReturnValue(throwError(() => overTheWire(new ProviderError({
        provider: 'idexx',
        code: 500,
        message: 'Internal Server Error',
        error: ['A request to /api/v1/ivls/devices failed with 500 status code.']
      }))))

      const error = await failure()

      expect(error.getStatus()).toEqual(502)
      expect(error.message).toEqual(
        'The provider idexx failed to list devices with status 500: A request to /api/v1/ivls/devices failed with 500 status code.'
      )
    })

    it('should answer 504 when the provider timed out on the engine', async () => {
      clientProxyMock.send.mockReturnValue(throwError(() => overTheWire(new ProviderError({
        provider: 'idexx',
        code: 504,
        message: 'idexx did not respond within 30000 ms: GET /api/v1/ivls/devices.',
        error: ['idexx did not respond within 30000 ms: GET /api/v1/ivls/devices.']
      }))))

      const error = await failure()

      expect(error.getStatus()).toEqual(504)
      expect(error.message).toEqual(
        'The provider idexx failed to list devices with status 504: idexx did not respond within 30000 ms: GET /api/v1/ivls/devices.'
      )
    })

    it('should fall back to the provider\'s message when it lists no errors', async () => {
      clientProxyMock.send.mockReturnValue(throwError(() => overTheWire(new ProviderError({
        provider: 'antech-v6',
        code: 401,
        message: 'Unauthorized'
      }))))

      const error = await failure()

      expect(error.getStatus()).toEqual(502)
      expect(error.message).toEqual('The provider antech-v6 failed to list devices with status 401: Unauthorized')
    })

    it('should keep the status of an HTTP error the engine sent', async () => {
      clientProxyMock.send.mockReturnValue(throwError(() => overTheWire(new BadRequestException('The integration has no username'))))

      const error = await failure()

      expect(error.getStatus()).toEqual(400)
      expect(error.message).toEqual('The integration has no username')
    })

    it('should answer 502 when the engine fails without a provider error', async () => {
      clientProxyMock.send.mockReturnValue(throwError(() => ({ status: 'error', message: 'Internal server error' })))

      const error = await failure()

      expect(error.getStatus()).toEqual(502)
      expect(error.message).toEqual('The engine failed to list devices: Internal server error')
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
