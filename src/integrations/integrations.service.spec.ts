import { IntegrationsService, ORGANIZATION_STARTABLE_STATUSES } from './integrations.service'
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
import { Integration } from './entities/integration.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Organization } from '../organizations/entities/organization.entity'
import { ProviderConfiguration } from '../providers/entities/provider-configuration.entity'
import { Provider } from '../providers/entities/provider.entity'
import { IntegrationStatus } from './constants/integration-status.enum'
import { BadGatewayException, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common'
import { Practice } from '../practices/entities/practice.entity'
import { IntegrationLogEntry } from './entities/integration-log-entry.entity'
import {
  IntegrationActorType,
  IntegrationLogAction,
  SYSTEM_ACTOR,
  adminActor,
  organizationActor,
} from './constants/integration-log.constants'

const organization = { id: 'org-1', name: 'Org One' } as Organization
const admin = adminActor('jane.doe')

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
  const practiceRepositoryMock = {
    findOne: jest.fn(() => ({ id: 'practiceId', organizationId: 'org-1' })),
  }
  const integrationLogRepositoryMock = {
    insert: jest.fn(),
    findAndCount: jest.fn(),
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
          provide: getRepositoryToken(Practice),
          useValue: practiceRepositoryMock,
        },
        {
          provide: getRepositoryToken(IntegrationLogEntry),
          useValue: integrationLogRepositoryMock,
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
      const integration = await integrationsService.create(organization, {
        practiceId: 'practiceId',
        providerConfigurationId: 'providerConfigurationId',
        integrationOptions: {},
      })
      expect(integration.status).toBe(IntegrationStatus.NEW)
    })

    it('rejects a practice or provider configuration owned by another organization', async () => {
      ;(practiceRepositoryMock.findOne as jest.Mock).mockResolvedValueOnce(null)
      integrationRepositoryMock.save.mockClear()

      await expect(
        integrationsService.create(organization, {
          practiceId: 'someone-elses-practice',
          providerConfigurationId: 'providerConfigurationId',
          integrationOptions: {},
        }),
      ).rejects.toThrow(NotFoundException)
      expect(integrationRepositoryMock.save).not.toHaveBeenCalled()
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
        integrationsService.create(organization, {
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

    it('rejects an integration owned by another organization', async () => {
      integrationRepositoryMock.findOne.mockResolvedValue(undefined)

      await expect(
        integrationsService.update(organization, baseIntegration.id, {
          integrationOptions: { username: 'user', password: 'pass' },
        }),
      ).rejects.toThrow(NotFoundException)
      expect(integrationRepositoryMock.update).not.toHaveBeenCalled()
    })

    it('should not update jobs when integration is NEW', async () => {
      integrationRepositoryMock.findOne.mockResolvedValue({
        ...baseIntegration,
        status: IntegrationStatus.NEW,
      })

      await integrationsService.update(organization, baseIntegration.id, {
        integrationOptions: { username: 'user', password: 'pass' },
      })

      expect(clientProxyMock.emit).not.toHaveBeenCalled()
    })

    it('should not update jobs when integration is STOPPED', async () => {
      integrationRepositoryMock.findOne.mockResolvedValue({
        ...baseIntegration,
        status: IntegrationStatus.STOPPED,
      })

      await integrationsService.update(organization, baseIntegration.id, {
        integrationOptions: { username: 'user', password: 'pass' },
      })

      expect(clientProxyMock.emit).not.toHaveBeenCalled()
    })

    it('should update jobs when integration is RUNNING', async () => {
      integrationRepositoryMock.findOne.mockResolvedValue({
        ...baseIntegration,
        status: IntegrationStatus.RUNNING,
      })

      await integrationsService.update(organization, baseIntegration.id, {
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

      const response = await integrationsService.restart({ ...runningIntegration }, admin)

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
      }, admin)

      expect(response).toBeUndefined()
      expect(clientProxyMock.send).toHaveBeenCalledTimes(1)
    })

    it('should restore the previous status when starting fails, so a re-run retries it', async () => {
      clientProxyMock.send.mockImplementationOnce(resolves).mockImplementationOnce(rejects)

      const response = await integrationsService.restart({ ...runningIntegration }, admin)

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

      const response = await integrationsService.restart({ ...runningIntegration }, admin)

      expect(response?.message).toContain('Error stopping integration')
      expect(clientProxyMock.send).toHaveBeenCalledTimes(1)
    })
  })

  describe('restartById()', () => {
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

    beforeEach(() => {
      clientProxyMock.send.mockReset()
    })

    it('rejects an integration owned by another organization', async () => {
      integrationRepositoryMock.findOne.mockResolvedValue(undefined)

      await expect(integrationsService.restartById(organization, 'integration-id')).rejects.toThrow(
        NotFoundException,
      )
      expect(clientProxyMock.send).not.toHaveBeenCalled()
    })

    it('restarts an integration owned by the organization', async () => {
      integrationRepositoryMock.findOne.mockResolvedValue({ ...runningIntegration })
      clientProxyMock.send.mockImplementation(() => ({ toPromise: async () => ({}) }))

      const response = await integrationsService.restartById(organization, 'integration-id')

      expect(response).toBeUndefined()
      expect(clientProxyMock.send).toHaveBeenCalledTimes(2)
    })
  })

  describe('startById() and stopById()', () => {
    const integrationIn = (status: IntegrationStatus): any => ({
      id: 'integration-id',
      status,
      providerConfiguration: {
        id: 'provider-configuration-id',
        providerId: 'idexx',
        configurationOptions: { url: 'https://idexx.example' },
      },
      integrationOptions: { username: 'clinic' },
    })
    const resolves = (): any => ({ toPromise: async () => ({}) })
    const rejects = (): any => ({
      toPromise: async () => {
        throw new Error('engine unreachable')
      },
    })
    const ownedLookup = {
      where: {
        id: 'integration-id',
        providerConfiguration: { organizationId: 'org-1' },
      },
      relations: ['practice', 'providerConfiguration'],
    }

    beforeEach(() => {
      integrationRepositoryMock.findOne.mockReset()
      integrationRepositoryMock.update.mockClear()
      clientProxyMock.send.mockReset()
      clientProxyMock.send.mockImplementation(resolves)
    })

    describe('startById()', () => {
      it.each([IntegrationStatus.NEW, IntegrationStatus.STOPPED])(
        'starts a %s integration: the engine gets the create message, and the status becomes RUNNING',
        async (status) => {
          integrationRepositoryMock.findOne.mockResolvedValue(integrationIn(status))

          const answer = await integrationsService.startById(organization, 'integration-id')

          expect(answer).toEqual({ ok: 'Integration started' })
          expect(clientProxyMock.send).toHaveBeenCalledTimes(1)
          expect(clientProxyMock.send).toHaveBeenCalledWith(
            'idexx/integration/create',
            expect.objectContaining({
              data: expect.objectContaining({
                integrationId: 'integration-id',
                integrationOptions: { username: 'clinic' },
                providerConfiguration: { url: 'https://idexx.example' },
              }),
            }),
          )
          expect(integrationRepositoryMock.update).toHaveBeenCalledWith('integration-id', {
            status: IntegrationStatus.RUNNING,
          })
        },
      )

      it("looks the integration up within the caller's organization", async () => {
        integrationRepositoryMock.findOne.mockResolvedValue(integrationIn(IntegrationStatus.STOPPED))

        await integrationsService.startById(organization, 'integration-id')

        expect(integrationRepositoryMock.findOne).toHaveBeenCalledWith(ownedLookup)
      })

      it('refuses an integration owned by another organization, and changes nothing', async () => {
        integrationRepositoryMock.findOne.mockResolvedValue(undefined)

        await expect(integrationsService.startById(organization, 'integration-id')).rejects.toThrow(
          NotFoundException,
        )
        expect(clientProxyMock.send).not.toHaveBeenCalled()
        expect(integrationRepositoryMock.update).not.toHaveBeenCalled()
      })

      it('answers a RUNNING integration without asking the engine', async () => {
        integrationRepositoryMock.findOne.mockResolvedValue(integrationIn(IntegrationStatus.RUNNING))

        const answer = await integrationsService.startById(organization, 'integration-id')

        expect(answer).toEqual({ ok: 'Integration is already running' })
        expect(clientProxyMock.send).not.toHaveBeenCalled()
        expect(integrationRepositoryMock.update).not.toHaveBeenCalled()
      })

      it.each([IntegrationStatus.READY, IntegrationStatus.ERROR])(
        'refuses a %s integration with a 409, outside the statuses an organization may start from',
        async (status) => {
          integrationRepositoryMock.findOne.mockResolvedValue(integrationIn(status))

          await expect(integrationsService.startById(organization, 'integration-id')).rejects.toThrow(
            new ConflictException(
              `Integration integration-id is ${status} and cannot be started with an organization key`,
            ),
          )
          expect(clientProxyMock.send).not.toHaveBeenCalled()
          expect(integrationRepositoryMock.update).not.toHaveBeenCalled()
        },
      )

      it('answers an engine failure with a 502 and leaves the status as it was', async () => {
        integrationRepositoryMock.findOne.mockResolvedValue(integrationIn(IntegrationStatus.STOPPED))
        clientProxyMock.send.mockImplementation(rejects)

        await expect(integrationsService.startById(organization, 'integration-id')).rejects.toThrow(
          new BadGatewayException('Error starting integration integration-id'),
        )
        expect(integrationRepositoryMock.update).not.toHaveBeenCalled()
      })
    })

    describe('stopById()', () => {
      it('stops a RUNNING integration: the engine gets the remove message, and the status becomes STOPPED', async () => {
        integrationRepositoryMock.findOne.mockResolvedValue(integrationIn(IntegrationStatus.RUNNING))

        const answer = await integrationsService.stopById(organization, 'integration-id')

        expect(answer).toEqual({ ok: 'Integration stopped' })
        expect(clientProxyMock.send).toHaveBeenCalledTimes(1)
        expect(clientProxyMock.send).toHaveBeenCalledWith(
          'idexx/integration/remove',
          expect.objectContaining({
            data: expect.objectContaining({ integrationId: 'integration-id' }),
          }),
        )
        expect(integrationRepositoryMock.update).toHaveBeenCalledWith('integration-id', {
          status: IntegrationStatus.STOPPED,
        })
      })

      it("looks the integration up within the caller's organization", async () => {
        integrationRepositoryMock.findOne.mockResolvedValue(integrationIn(IntegrationStatus.RUNNING))

        await integrationsService.stopById(organization, 'integration-id')

        expect(integrationRepositoryMock.findOne).toHaveBeenCalledWith(ownedLookup)
      })

      it('refuses an integration owned by another organization, and changes nothing', async () => {
        integrationRepositoryMock.findOne.mockResolvedValue(undefined)

        await expect(integrationsService.stopById(organization, 'integration-id')).rejects.toThrow(
          NotFoundException,
        )
        expect(clientProxyMock.send).not.toHaveBeenCalled()
        expect(integrationRepositoryMock.update).not.toHaveBeenCalled()
      })

      it('answers a STOPPED integration without asking the engine', async () => {
        integrationRepositoryMock.findOne.mockResolvedValue(integrationIn(IntegrationStatus.STOPPED))

        const answer = await integrationsService.stopById(organization, 'integration-id')

        expect(answer).toEqual({ ok: 'Integration is already stopped' })
        expect(clientProxyMock.send).not.toHaveBeenCalled()
        expect(integrationRepositoryMock.update).not.toHaveBeenCalled()
      })

      it('leaves a NEW integration NEW, without asking the engine', async () => {
        integrationRepositoryMock.findOne.mockResolvedValue(integrationIn(IntegrationStatus.NEW))

        const answer = await integrationsService.stopById(organization, 'integration-id')

        expect(answer).toEqual({ ok: 'Integration has not been started' })
        expect(clientProxyMock.send).not.toHaveBeenCalled()
        expect(integrationRepositoryMock.update).not.toHaveBeenCalled()
      })

      it('answers an engine failure with a 502 and leaves the status as it was', async () => {
        integrationRepositoryMock.findOne.mockResolvedValue(integrationIn(IntegrationStatus.RUNNING))
        clientProxyMock.send.mockImplementation(rejects)

        await expect(integrationsService.stopById(organization, 'integration-id')).rejects.toThrow(
          new BadGatewayException('Error stopping integration integration-id'),
        )
        expect(integrationRepositoryMock.update).not.toHaveBeenCalled()
      })

      it.each([IntegrationStatus.READY, IntegrationStatus.ERROR])(
        'stops a %s integration, as the admin stop does',
        async (status) => {
          integrationRepositoryMock.findOne.mockResolvedValue(integrationIn(status))

          const answer = await integrationsService.stopById(organization, 'integration-id')

          expect(answer).toEqual({ ok: 'Integration stopped' })
          expect(clientProxyMock.send).toHaveBeenCalledWith('idexx/integration/remove', expect.anything())
          expect(integrationRepositoryMock.update).toHaveBeenCalledWith('integration-id', {
            status: IntegrationStatus.STOPPED,
          })
        },
      )
    })

    /* An organization may start a NEW integration. Limiting start to integrations that have run before stays one
     * change: taking NEW out of ORGANIZATION_STARTABLE_STATUSES. Restart has to follow it, or a restart would stop
     * the NEW integration, leave it STOPPED, and let start take it. */
    describe('the NEW rule is one list', () => {
      it('while NEW is in it, a restart of a NEW integration stops it, as it always has', async () => {
        integrationRepositoryMock.findOne.mockResolvedValue(integrationIn(IntegrationStatus.NEW))

        await expect(integrationsService.restartById(organization, 'integration-id')).resolves.toBeUndefined()
        expect(clientProxyMock.send).toHaveBeenCalledWith('idexx/integration/remove', expect.anything())
        expect(integrationRepositoryMock.update).toHaveBeenCalledWith('integration-id', {
          status: IntegrationStatus.STOPPED,
        })
      })

      it('taken out of it, NEW can neither be started nor restarted, and nothing is sent', async () => {
        const list = ORGANIZATION_STARTABLE_STATUSES as string[]
        list.splice(list.indexOf(IntegrationStatus.NEW), 1)
        try {
          integrationRepositoryMock.findOne.mockResolvedValue(integrationIn(IntegrationStatus.NEW))

          await expect(integrationsService.startById(organization, 'integration-id')).rejects.toThrow(
            new ConflictException(
              'Integration integration-id is NEW and cannot be started with an organization key',
            ),
          )
          await expect(integrationsService.restartById(organization, 'integration-id')).rejects.toThrow(
            new ConflictException(
              'Integration integration-id is NEW and cannot be restarted with an organization key',
            ),
          )
          expect(clientProxyMock.send).not.toHaveBeenCalled()
          expect(integrationRepositoryMock.update).not.toHaveBeenCalled()

          integrationRepositoryMock.findOne.mockResolvedValue(integrationIn(IntegrationStatus.STOPPED))
          await expect(integrationsService.startById(organization, 'integration-id')).resolves.toEqual({
            ok: 'Integration started',
          })
        } finally {
          list.unshift(IntegrationStatus.NEW)
        }
      })
    })
  })

  describe('the integration log (#306)', () => {
    const integrationIn = (status: IntegrationStatus): any => ({
      id: 'integration-id',
      status,
      providerConfiguration: {
        id: 'provider-configuration-id',
        providerId: 'idexx',
        configurationOptions: {},
      },
      integrationOptions: {},
    })
    const resolves = (): any => ({ toPromise: async () => ({}) })
    const rejects = (message: string) => (): any => ({
      toPromise: async () => {
        throw new Error(message)
      },
    })
    const entry = (action: IntegrationLogAction, actorType: IntegrationActorType, actor: string, error: string | null = null): any => ({
      integrationId: 'integration-id',
      action,
      actorType,
      actor,
      error,
    })
    const entries = (): any[] => integrationLogRepositoryMock.insert.mock.calls.map(([row]) => row)

    beforeEach(() => {
      integrationRepositoryMock.findOne.mockReset()
      integrationRepositoryMock.update.mockClear()
      integrationRepositoryMock.find.mockReset()
      integrationLogRepositoryMock.insert.mockReset()
      integrationLogRepositoryMock.findAndCount.mockReset()
      clientProxyMock.send.mockReset()
      clientProxyMock.send.mockImplementation(resolves)
    })

    it('records a start and a stop with their actor', async () => {
      await integrationsService.start(integrationIn(IntegrationStatus.STOPPED), admin)
      await integrationsService.stop(integrationIn(IntegrationStatus.RUNNING), admin)

      expect(entries()).toEqual([
        entry(IntegrationLogAction.START, IntegrationActorType.ADMIN, 'jane.doe'),
        entry(IntegrationLogAction.STOP, IntegrationActorType.ADMIN, 'jane.doe'),
      ])
    })

    it("records a failed start with the engine's reason, and answers with the message it always had", async () => {
      clientProxyMock.send.mockImplementation(rejects('The engine did not respond in time'))

      const error = await integrationsService.start(integrationIn(IntegrationStatus.STOPPED), admin)

      expect(error?.message).toBe('Error starting integration integration-id')
      expect(entries()).toEqual([
        entry(
          IntegrationLogAction.START,
          IntegrationActorType.ADMIN,
          'jane.doe',
          'Error starting integration integration-id: The engine did not respond in time',
        ),
      ])
    })

    it('records a restart as one entry, with the error of the half that failed', async () => {
      clientProxyMock.send.mockImplementationOnce(resolves).mockImplementationOnce(rejects('engine unreachable'))

      await integrationsService.restart(integrationIn(IntegrationStatus.RUNNING), admin)

      expect(entries()).toEqual([
        entry(
          IntegrationLogAction.RESTART,
          IntegrationActorType.ADMIN,
          'jane.doe',
          'Error starting integration integration-id: engine unreachable',
        ),
      ])
    })

    it('records a delete, with the error of a stop that failed, and deletes all the same', async () => {
      clientProxyMock.send.mockImplementation(rejects('engine unreachable'))

      await integrationsService.doDelete(integrationIn(IntegrationStatus.RUNNING), admin)

      expect(integrationRepositoryMock.softDelete).toHaveBeenCalledWith('integration-id')
      expect(entries()).toEqual([
        entry(
          IntegrationLogAction.DELETE,
          IntegrationActorType.ADMIN,
          'jane.doe',
          'Error stopping integration integration-id: engine unreachable',
        ),
      ])
    })

    it('records an action that throws, and throws on', async () => {
      integrationRepositoryMock.softDelete.mockRejectedValueOnce(new Error('connection lost'))

      await expect(integrationsService.doDelete(integrationIn(IntegrationStatus.RUNNING), admin)).rejects.toThrow(
        'connection lost',
      )
      expect(entries()).toEqual([
        entry(IntegrationLogAction.DELETE, IntegrationActorType.ADMIN, 'jane.doe', 'connection lost'),
      ])
    })

    it('does not fail an action whose entry cannot be written', async () => {
      integrationLogRepositoryMock.insert.mockRejectedValueOnce(new Error('table missing'))

      const error = await integrationsService.start(integrationIn(IntegrationStatus.STOPPED), admin)

      expect(error).toBeUndefined()
      expect(integrationRepositoryMock.update).toHaveBeenCalledWith('integration-id', {
        status: IntegrationStatus.RUNNING,
      })
    })

    it("records the organization as the actor of the organization's start, stop, restart and delete", async () => {
      integrationRepositoryMock.findOne.mockResolvedValueOnce(integrationIn(IntegrationStatus.NEW))
      await integrationsService.startById(organization, 'integration-id')
      integrationRepositoryMock.findOne.mockResolvedValueOnce(integrationIn(IntegrationStatus.RUNNING))
      await integrationsService.stopById(organization, 'integration-id')
      integrationRepositoryMock.findOne.mockResolvedValueOnce(integrationIn(IntegrationStatus.RUNNING))
      await integrationsService.restartById(organization, 'integration-id')
      integrationRepositoryMock.findOne.mockResolvedValueOnce(integrationIn(IntegrationStatus.RUNNING))
      await integrationsService.delete(organization, 'integration-id')

      expect(entries()).toEqual([
        entry(IntegrationLogAction.START, IntegrationActorType.ORGANIZATION, 'Org One'),
        entry(IntegrationLogAction.STOP, IntegrationActorType.ORGANIZATION, 'Org One'),
        entry(IntegrationLogAction.RESTART, IntegrationActorType.ORGANIZATION, 'Org One'),
        entry(IntegrationLogAction.DELETE, IntegrationActorType.ORGANIZATION, 'Org One'),
      ])
    })

    it('records nothing when nothing is asked of the engine', async () => {
      integrationRepositoryMock.findOne.mockResolvedValueOnce(integrationIn(IntegrationStatus.RUNNING))
      await integrationsService.startById(organization, 'integration-id')
      integrationRepositoryMock.findOne.mockResolvedValueOnce(integrationIn(IntegrationStatus.STOPPED))
      await integrationsService.stopById(organization, 'integration-id')
      integrationRepositoryMock.findOne.mockResolvedValueOnce(integrationIn(IntegrationStatus.NEW))
      await integrationsService.stopById(organization, 'integration-id')
      integrationRepositoryMock.findOne.mockResolvedValueOnce(integrationIn(IntegrationStatus.READY))
      await expect(integrationsService.startById(organization, 'integration-id')).rejects.toThrow(ConflictException)

      expect(integrationLogRepositoryMock.insert).not.toHaveBeenCalled()
    })

    it("records the status job's restarts as the system's, one entry per attempt", async () => {
      integrationRepositoryMock.find.mockResolvedValue([integrationIn(IntegrationStatus.RUNNING)])
      clientProxyMock.send.mockImplementationOnce(rejects('engine unreachable')).mockImplementation(resolves)

      await integrationsService.ensureStatusAll({ attempts: 2, backoffMs: 0 })

      expect(SYSTEM_ACTOR).toEqual({ type: IntegrationActorType.SYSTEM, name: 'system' })
      expect(entries()).toEqual([
        entry(
          IntegrationLogAction.RESTART,
          IntegrationActorType.SYSTEM,
          'system',
          'Error stopping integration integration-id: engine unreachable',
        ),
        entry(IntegrationLogAction.RESTART, IntegrationActorType.SYSTEM, 'system'),
      ])
    })

    it('records the deletes of integrations deleted with their provider configuration', async () => {
      await integrationsService.recordDeletes(['a', 'b'], organizationActor(organization))

      expect(entries()).toEqual([
        { ...entry(IntegrationLogAction.DELETE, IntegrationActorType.ORGANIZATION, 'Org One'), integrationId: 'a' },
        { ...entry(IntegrationLogAction.DELETE, IntegrationActorType.ORGANIZATION, 'Org One'), integrationId: 'b' },
      ])
    })

    it('reads the log newest first, a page at a time', async () => {
      integrationLogRepositoryMock.findAndCount.mockResolvedValue([[{ id: 3 }, { id: 2 }], 7])

      const page = await integrationsService.findLog('integration-id', 2, 2)

      expect(integrationLogRepositoryMock.findAndCount).toHaveBeenCalledWith({
        where: { integrationId: 'integration-id' },
        order: { createdAt: 'DESC', id: 'DESC' },
        skip: 2,
        take: 2,
      })
      expect(page).toEqual({ total: 7, page: 2, limit: 2, data: [{ id: 3 }, { id: 2 }] })
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
