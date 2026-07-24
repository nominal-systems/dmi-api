import { IntegrationsService } from './integrations.service'
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
import { Integration } from './entities/integration.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Organization } from '../organizations/entities/organization.entity'
import { ProviderConfiguration } from '../providers/entities/provider-configuration.entity'
import { Provider } from '../providers/entities/provider.entity'
import { IntegrationStatus } from './constants/integration-status.enum'
import { BadRequestException } from '@nestjs/common'

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
    find: jest.fn(),
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
    emit: jest.fn(),
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

    it('should reject integration options with leading or trailing whitespace', async () => {
      integrationRepositoryMock.findOne.mockResolvedValue({
        id: 'providerConfigurationId',
        providerId: 'providerId',
        provider: { id: 'providerId' },
      })
      ;(providersRepositoryMock.findOne as jest.Mock).mockResolvedValueOnce({
        id: 'providerId',
        options: [
          {
            name: 'apiKey',
            type: 'string',
            required: true,
            providerOptionType: 'integration',
          },
        ],
      })

      await expect(
        integrationsService.create({
          practiceId: 'practiceId',
          providerConfigurationId: 'providerConfigurationId',
          integrationOptions: { apiKey: ' secret ' },
        }),
      ).rejects.toThrow(BadRequestException)
    })
  })

  describe('update()', () => {
    const baseIntegration = {
      id: 'integration-id',
      practiceId: 'practice-id',
      providerConfigurationId: 'provider-configuration-id',
      providerConfiguration: {
        id: 'provider-configuration-id',
        providerId: 'idexx',
        configurationOptions: {},
      },
      integrationOptions: {},
    }

    beforeEach(() => {
      integrationRepositoryMock.update.mockClear()
      clientProxyMock.emit.mockClear()
    })

    it('should not update jobs when integration is NEW', async () => {
      integrationRepositoryMock.findOne.mockResolvedValue({
        ...baseIntegration,
        status: IntegrationStatus.NEW,
      })

      await integrationsService.update(baseIntegration.id, {
        integrationOptions: { username: 'user', password: 'pass' },
      })

      expect(clientProxyMock.emit).not.toHaveBeenCalled()
    })

    it('should not update jobs when integration is STOPPED', async () => {
      integrationRepositoryMock.findOne.mockResolvedValue({
        ...baseIntegration,
        status: IntegrationStatus.STOPPED,
      })

      await integrationsService.update(baseIntegration.id, {
        integrationOptions: { username: 'user', password: 'pass' },
      })

      expect(clientProxyMock.emit).not.toHaveBeenCalled()
    })

    it('should update jobs when integration is RUNNING', async () => {
      integrationRepositoryMock.findOne.mockResolvedValue({
        ...baseIntegration,
        status: IntegrationStatus.RUNNING,
      })

      await integrationsService.update(baseIntegration.id, {
        integrationOptions: { username: 'user', password: 'pass' },
      })

      expect(clientProxyMock.emit).toHaveBeenCalledTimes(1)
    })
  })

  describe('restart()', () => {
    const runningIntegration = {
      id: 'integration-id',
      status: IntegrationStatus.RUNNING,
      providerConfiguration: {
        id: 'provider-configuration-id',
        providerId: 'idexx',
        configurationOptions: {},
      },
      integrationOptions: {},
    } as any

    const resolves = (): any => ({ toPromise: async () => ({}) })
    const rejects = (): any => ({
      toPromise: async () => {
        throw new Error('engine unreachable')
      },
    })

    beforeEach(() => {
      integrationRepositoryMock.update.mockClear()
      clientProxyMock.send.mockReset()
    })

    it('should stop and start a RUNNING integration', async () => {
      clientProxyMock.send.mockImplementation(resolves)

      const response = await integrationsService.restart({ ...runningIntegration })

      expect(response).toBeUndefined()
      expect(clientProxyMock.send).toHaveBeenCalledTimes(2)
      expect(integrationRepositoryMock.update).toHaveBeenLastCalledWith('integration-id', {
        status: IntegrationStatus.RUNNING,
      })
    })

    it('should not start an integration that was not RUNNING', async () => {
      clientProxyMock.send.mockImplementation(resolves)

      const response = await integrationsService.restart({
        ...runningIntegration,
        status: IntegrationStatus.STOPPED,
      })

      expect(response).toBeUndefined()
      expect(clientProxyMock.send).toHaveBeenCalledTimes(1)
    })

    it('should restore the previous status when starting fails, so a re-run retries it', async () => {
      clientProxyMock.send.mockImplementationOnce(resolves).mockImplementationOnce(rejects)

      const response = await integrationsService.restart({ ...runningIntegration })

      expect(response?.message).toContain('Error starting integration')
      // doStop() persisted STOPPED, the failed start must not leave it there
      expect(integrationRepositoryMock.update).toHaveBeenNthCalledWith(1, 'integration-id', {
        status: IntegrationStatus.STOPPED,
      })
      expect(integrationRepositoryMock.update).toHaveBeenLastCalledWith('integration-id', {
        status: IntegrationStatus.RUNNING,
      })
    })

    it('should return the stop error without starting', async () => {
      clientProxyMock.send.mockImplementation(rejects)

      const response = await integrationsService.restart({ ...runningIntegration })

      expect(response?.message).toContain('Error stopping integration')
      expect(clientProxyMock.send).toHaveBeenCalledTimes(1)
    })
  })

  describe('ensureStatusAll()', () => {
    const integrationOf = (id: string, providerId: string, status = IntegrationStatus.RUNNING): any => ({
      id,
      status,
      providerConfiguration: { id: `${id}-config`, providerId, configurationOptions: {} },
      integrationOptions: {},
    })

    beforeEach(() => {
      integrationRepositoryMock.find.mockReset()
      integrationRepositoryMock.update.mockClear()
      clientProxyMock.send.mockReset()
      clientProxyMock.send.mockImplementation(() => ({ toPromise: async () => ({}) }))
    })

    it('should only restart RUNNING integrations by default', async () => {
      integrationRepositoryMock.find.mockResolvedValue([integrationOf('a', 'idexx')])

      const summary = await integrationsService.ensureStatusAll()

      expect(integrationRepositoryMock.find).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { status: expect.objectContaining({ _value: [IntegrationStatus.RUNNING] }) },
        }),
      )
      expect(summary).toEqual({ total: 1, restarted: 1, failures: [], dryRun: false })
    })

    it('should restrict to the requested providers and integrations', async () => {
      integrationRepositoryMock.find.mockResolvedValue([
        integrationOf('a', 'idexx'),
        integrationOf('b', 'zoetis'),
        integrationOf('c', 'idexx'),
      ])

      const summary = await integrationsService.ensureStatusAll({
        providerIds: ['idexx'],
        integrationIds: ['c'],
      })

      expect(summary.total).toBe(1)
      expect(summary.restarted).toBe(1)
      expect(clientProxyMock.send).toHaveBeenCalledTimes(2)
    })

    it('should change nothing on a dry run', async () => {
      integrationRepositoryMock.find.mockResolvedValue([
        integrationOf('a', 'idexx'),
        integrationOf('b', 'zoetis'),
      ])

      const summary = await integrationsService.ensureStatusAll({ dryRun: true })

      expect(summary).toEqual({ total: 2, restarted: 0, failures: [], dryRun: true })
      expect(clientProxyMock.send).not.toHaveBeenCalled()
      expect(integrationRepositoryMock.update).not.toHaveBeenCalled()
    })

    it('should retry a failing integration and report it without stopping the run', async () => {
      integrationRepositoryMock.find.mockResolvedValue([
        integrationOf('a', 'idexx'),
        integrationOf('b', 'zoetis'),
      ])
      clientProxyMock.send.mockImplementation((pattern: string) => ({
        toPromise: async () => {
          if (pattern.startsWith('zoetis')) {
            throw new Error('engine unreachable')
          }
          return {}
        },
      }))

      const summary = await integrationsService.ensureStatusAll({
        concurrency: 1,
        attempts: 2,
        backoffMs: 0,
      })

      expect(summary.total).toBe(2)
      expect(summary.restarted).toBe(1)
      expect(summary.failures).toEqual([
        { integrationId: 'b', providerId: 'zoetis', error: 'Error stopping integration b' },
      ])
      // 2 sends for the integration that worked, 1 per attempt for the one that did not
      expect(clientProxyMock.send).toHaveBeenCalledTimes(4)
    })
  })
})
