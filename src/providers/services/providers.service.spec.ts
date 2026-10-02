import { ClientProxy } from '@nestjs/microservices'
import { IntegrationsService } from '../../integrations/integrations.service'
import { ProvidersService } from './providers.service'
import { Model, Types } from 'mongoose'
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
        { provide: getModelToken('ProviderExternalRequests'), useValue: { create: jest.fn(), countDocuments: jest.fn(), find: jest.fn(), findById: jest.fn() } },
        { provide: getModelToken('ProviderExternalRequestsV3'), useValue: { create: jest.fn(), countDocuments: jest.fn(), find: jest.fn(), findById: jest.fn() } },
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
        url: data.url.replace(/accessToken=[^&]+/, 'accessToken=***'), // the fixture's URL carries a token
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
        url: data.url.replace(/accessToken=[^&]+/, 'accessToken=***'),
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
        payload: { ...data.payload, Password: '***' },
        partitionKey: expect.stringMatching(new RegExp(`^${String(data.provider)}:na:\\d{8}$`))
      }, expect.any(Function))

      createSpy.mockRestore()
    })
    it('should mask the Authorization header and the access_token in the body, and store everything else unchanged', async () => {
      const createSpy = jest.spyOn(providerExternalRequestsV3Model, 'create')
      const data = {
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer dummy-bearer' },
        body: { access_token: 'dummy-access', expires_in: 3600, scope: 'read' },
        url: 'https://vendor.example.test/api/orders',
        method: 'GET',
        provider: 'test-provider',
        status: 200,
        payload: undefined
      }

      await service.saveProviderRawData(data)

      expect(createSpy).toHaveBeenCalledWith({
        createdAt: expect.any(Date),
        headers: { 'Content-Type': 'application/json', Authorization: '***' },
        body: { access_token: '***', expires_in: 3600, scope: 'read' },
        url: 'https://vendor.example.test/api/orders',
        method: 'GET',
        provider: 'test-provider',
        status: 200,
        partitionKey: expect.stringMatching(/^test-provider:na:\d{8}$/)
      }, expect.any(Function))

      createSpy.mockRestore()
    })
    it('should mask the password in a form-encoded payload and keep the username', async () => {
      const createSpy = jest.spyOn(providerExternalRequestsV3Model, 'create')
      const data = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: { scope: 'read', expires_in: 3600 },
        url: 'https://vendor.example.test/oauth/token',
        method: 'POST',
        provider: 'test-provider',
        status: 200,
        payload: 'grant_type=password&username=u&password=p'
      }

      await service.saveProviderRawData(data)

      expect(createSpy).toHaveBeenCalledWith({
        createdAt: expect.any(Date),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: { scope: 'read', expires_in: 3600 },
        url: 'https://vendor.example.test/oauth/token',
        method: 'POST',
        provider: 'test-provider',
        status: 200,
        payload: 'grant_type=password&username=u&password=***',
        partitionKey: expect.stringMatching(/^test-provider:na:\d{8}$/)
      }, expect.any(Function))

      createSpy.mockRestore()
    })
    it('should mask a credential in the URL query and keep the rest of the URL', async () => {
      const createSpy = jest.spyOn(providerExternalRequestsV3Model, 'create')
      const data = {
        headers: { Accept: 'application/json' },
        body: { tests: [] },
        url: 'https://vendor.example.test/api/Tests/v6?accesstoken=dummy-url-token&userId=1&pageSize=2500',
        method: 'GET',
        provider: 'test-provider',
        status: 200,
        payload: undefined
      }

      await service.saveProviderRawData(data)

      expect(createSpy).toHaveBeenCalledWith({
        createdAt: expect.any(Date),
        headers: { Accept: 'application/json' },
        body: { tests: [] },
        url: 'https://vendor.example.test/api/Tests/v6?accesstoken=***&userId=1&pageSize=2500',
        method: 'GET',
        provider: 'test-provider',
        status: 200,
        partitionKey: expect.stringMatching(/^test-provider:na:\d{8}$/)
      }, expect.any(Function))

      createSpy.mockRestore()
    })
    it('should not log a credential from the URL when the write fails', async () => {
      const error = Object.assign(new Error('boom'), { name: 'MongoServerError' })
      const createSpy = jest.spyOn(providerExternalRequestsV3Model, 'create')
        .mockImplementation((_data: any, cb: any) => { cb(error); return undefined as any })
      const loggerSpy = jest.spyOn((service as any).logger, 'error').mockImplementation(() => {})

      await service.saveProviderRawData({
        headers: {},
        body: {},
        url: 'https://vendor.example.test/api/Tests/v6?accesstoken=dummy-url-token&userId=1',
        method: 'GET',
        provider: 'test-provider',
        status: 200,
        payload: undefined
      })

      expect(loggerSpy).toHaveBeenCalledTimes(2)
      for (const [message] of loggerSpy.mock.calls) {
        expect(message).toContain('GET https://vendor.example.test/api/Tests/v6?accesstoken=***&userId=1')
        expect(message).not.toContain('dummy-url-token')
      }

      createSpy.mockRestore()
      loggerSpy.mockRestore()
    })
    it('should mask nested credentials in the headers, the body and the payload', async () => {
      const createSpy = jest.spyOn(providerExternalRequestsV3Model, 'create')
      const data = {
        headers: { common: { Authorization: 'Bearer dummy-bearer', Accept: 'application/json' } },
        body: { data: { session: { access_token: 'dummy-access', user: 'u' } }, items: [{ id: 1, password: 'dummy-password' }] },
        url: 'https://vendor.example.test/api/session',
        method: 'POST',
        provider: 'test-provider',
        status: 200,
        payload: { auth: { client_id: 'c', client_secret: 'dummy-secret' } }
      }

      await service.saveProviderRawData(data)

      expect(createSpy).toHaveBeenCalledWith({
        createdAt: expect.any(Date),
        headers: { common: { Authorization: '***', Accept: 'application/json' } },
        body: { data: { session: { access_token: '***', user: 'u' } }, items: [{ id: 1, password: '***' }] },
        url: 'https://vendor.example.test/api/session',
        method: 'POST',
        provider: 'test-provider',
        status: 200,
        payload: { auth: { client_id: 'c', client_secret: '***' } },
        partitionKey: expect.stringMatching(/^test-provider:na:\d{8}$/)
      }, expect.any(Function))

      createSpy.mockRestore()
    })
    it('should mask credentials in a string body, form-encoded or JSON', async () => {
      const createSpy = jest.spyOn(providerExternalRequestsV3Model, 'create')
      const data = {
        headers: {},
        body: 'access_token=dummy-access&expires_in=3600',
        url: 'https://vendor.example.test/oauth/token',
        method: 'POST',
        provider: 'test-provider',
        status: 200,
        payload: undefined
      }

      await service.saveProviderRawData(data)
      await service.saveProviderRawData({ ...data, body: '{"access_token":"dummy-access","expires_in":3600}' })

      expect((createSpy.mock.calls[0][0] as any).body).toEqual('access_token=***&expires_in=3600')
      expect((createSpy.mock.calls[1][0] as any).body).toEqual('{"access_token":"***","expires_in":3600}')

      createSpy.mockRestore()
    })
    it('should keep the url, headers and payload masked in the body-less fallback write', async () => {
      const error = Object.assign(new Error('Request rate is large'), { name: 'MongoServerError', code: 16500 })
      const written: any[] = []
      const createSpy = jest.spyOn(providerExternalRequestsV3Model, 'create')
        .mockImplementationOnce((doc: any, cb: any) => { written.push({ ...doc }); cb(error); return undefined as any })
        .mockImplementationOnce((doc: any, cb: any) => { written.push({ ...doc }); cb(null); return undefined as any })
      const loggerSpy = jest.spyOn((service as any).logger, 'error').mockImplementation(() => {})

      await service.saveProviderRawData({
        headers: { Authorization: 'Bearer dummy-bearer', Accept: 'application/json' },
        body: { access_token: 'dummy-access' },
        url: 'https://vendor.example.test/oauth/token?client_secret=dummy-secret&scope=read',
        method: 'POST',
        provider: 'test-provider',
        status: 200,
        payload: 'grant_type=password&username=u&password=dummy-password'
      })

      expect(written).toHaveLength(2)
      const fallback = written[1]
      expect('body' in fallback).toBe(false)
      expect(fallback.headers).toEqual({ Authorization: '***', Accept: 'application/json' })
      expect(fallback.payload).toEqual('grant_type=password&username=u&password=***')
      expect(fallback.url).toEqual('https://vendor.example.test/oauth/token?client_secret=***&scope=read')

      createSpy.mockRestore()
      loggerSpy.mockRestore()
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
  describe('reading stored external requests', () => {
    // A document written before redaction was added on write, holding credentials verbatim.
    const storedRequest = (id: string, createdAt: string) => ({
      _id: new Types.ObjectId(id),
      createdAt: new Date(createdAt),
      provider: 'test-provider',
      status: 200,
      method: 'POST',
      url: 'https://vendor.example.test/oauth/token',
      headers: { Accept: 'application/json', Authorization: 'Bearer dummy-bearer' },
      body: { access_token: 'dummy-access', expires_in: 3600 },
      payload: 'grant_type=password&username=u&password=dummy-password',
      partitionKey: 'test-provider:na:20260930'
    })
    const listed = ({ body, payload, ...rest }: ReturnType<typeof storedRequest>) => rest
    const ID_V3 = '650000000000000000000001'
    const ID_V2 = '650000000000000000000002'

    it('findExternalRequestById should mask the Authorization header, the access_token and the password', async () => {
      const findByIdSpy = jest.spyOn(providerExternalRequestsV3Model, 'findById')
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(storedRequest(ID_V3, '2026-09-30T10:00:00.000Z')) } as any)

      expect(await service.findExternalRequestById(ID_V3)).toEqual({
        ...storedRequest(ID_V3, '2026-09-30T10:00:00.000Z'),
        _id: ID_V3,
        headers: { Accept: 'application/json', Authorization: '***' },
        body: { access_token: '***', expires_in: 3600 },
        payload: 'grant_type=password&username=u&password=***'
      })
      expect(findByIdSpy).toHaveBeenCalledWith(ID_V3, { __v: 0 }, { lean: true })
    })

    it('findExternalRequestById should mask a credential in a stored string body', async () => {
      jest.spyOn(providerExternalRequestsV3Model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue({ ...storedRequest(ID_V3, '2026-09-30T10:00:00.000Z'), body: 'access_token=dummy-access&expires_in=3600' })
      } as any)

      expect((await service.findExternalRequestById(ID_V3)).body).toEqual('access_token=***&expires_in=3600')
    })

    it('findExternalRequests should mask the Authorization header in every record of both collections', async () => {
      const v3FindSpy = jest.spyOn(providerExternalRequestsV3Model, 'find')
        .mockResolvedValue([listed(storedRequest(ID_V3, '2026-09-30T10:00:00.000Z'))] as never)
      const v2FindSpy = jest.spyOn(providerExternalRequestsModel, 'find')
        .mockResolvedValue([listed(storedRequest(ID_V2, '2026-09-29T10:00:00.000Z'))] as never)

      const records = await service.findExternalRequests({ provider: 'test-provider' }, { page: 1, limit: 10 })

      expect(records).toEqual([
        { ...listed(storedRequest(ID_V3, '2026-09-30T10:00:00.000Z')), _id: ID_V3, headers: { Accept: 'application/json', Authorization: '***' } },
        { ...listed(storedRequest(ID_V2, '2026-09-29T10:00:00.000Z')), _id: ID_V2, headers: { Accept: 'application/json', Authorization: '***' } }
      ])
      for (const findSpy of [v3FindSpy, v2FindSpy]) {
        expect(findSpy).toHaveBeenCalledWith(
          { provider: 'test-provider' },
          { __v: 0, body: 0, payload: 0 },
          { limit: 10, sort: { createdAt: -1 }, lean: true }
        )
      }
    })

    it('findExternalRequests should mask a credential in the URL query of a stored record', async () => {
      const stored = {
        ...listed(storedRequest(ID_V3, '2026-09-30T10:00:00.000Z')),
        url: 'https://vendor.example.test/api/Tests/v6?accesstoken=dummy-url-token&userId=1&pageSize=2500'
      }
      jest.spyOn(providerExternalRequestsV3Model, 'find').mockResolvedValue([stored] as never)
      jest.spyOn(providerExternalRequestsModel, 'find').mockResolvedValue([] as never)

      const [record] = await service.findExternalRequests({ provider: 'test-provider' }, { page: 1, limit: 10 })

      expect(record.url).toEqual('https://vendor.example.test/api/Tests/v6?accesstoken=***&userId=1&pageSize=2500')
    })

    it('findAllExternalRequests should mask credentials in every document of both collections', async () => {
      jest.spyOn(providerExternalRequestsV3Model, 'find')
        .mockResolvedValue([storedRequest(ID_V3, '2026-09-30T10:00:00.000Z')] as never)
      jest.spyOn(providerExternalRequestsModel, 'find')
        .mockResolvedValue([storedRequest(ID_V2, '2026-09-29T10:00:00.000Z')] as never)

      const documents = await service.findAllExternalRequests({ accessionIds: 'ACC123' })

      expect(documents).toHaveLength(2)
      for (const document of documents) {
        expect(document.headers).toEqual({ Accept: 'application/json', Authorization: '***' })
        expect(document.body).toEqual({ access_token: '***', expires_in: 3600 })
        expect(document.payload).toEqual('grant_type=password&username=u&password=***')
      }
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
