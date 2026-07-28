import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientProxy } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, In, Repository } from 'typeorm'
import { FindOneOfTypeOptions, toFindOneOptions } from '../common/typings/find-one-of-type-options.interface'
import { encrypt } from '../common/utils/crypto.utils'
import ieMessageBuilder from '../common/utils/ieMessageBuilder'
import { Organization } from '../organizations/entities/organization.entity'
import { CreateIntegrationDto } from './dtos/create-integration.dto'
import { Integration } from './entities/integration.entity'
import { ProviderConfiguration } from '../providers/entities/provider-configuration.entity'
import * as createValidator from 'is-my-json-valid'
import { IntegrationTestResponse, Operation, Resource } from '@nominal-systems/dmi-engine-common'
import { IntegrationStatus } from './constants/integration-status.enum'
import { Provider } from '../providers/entities/provider.entity'

const DEFAULT_RESTART_CONCURRENCY = 5
const DEFAULT_RESTART_ATTEMPTS = 3
const DEFAULT_RESTART_BACKOFF_MS = 1000

export interface EnsureStatusOptions {
  /** Statuses to restart. Defaults to RUNNING only. */
  statuses?: IntegrationStatus[]
  /** Restrict to these providers (e.g. `idexx`), by provider id. */
  providerIds?: string[]
  /** Restrict to these integration ids. */
  integrationIds?: string[]
  concurrency?: number
  attempts?: number
  backoffMs?: number
  /** Log what would be restarted without touching the engines or the database. */
  dryRun?: boolean
}

export interface EnsureStatusFailure {
  integrationId: string
  providerId: string
  error: string
}

export interface EnsureStatusSummary {
  total: number
  restarted: number
  failures: EnsureStatusFailure[]
  dryRun: boolean
}

@Injectable()
export class IntegrationsService {
  private readonly logger = new Logger(IntegrationsService.name)
  private readonly secretKey: string

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Integration)
    private readonly integrationsRepository: Repository<Integration>,
    @InjectRepository(ProviderConfiguration)
    private readonly providerConfigurationRepository: Repository<ProviderConfiguration>,
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
    @Inject('ACTIVEMQ') private readonly client: ClientProxy,
  ) {
    this.secretKey = this.configService.get('secretKey') ?? ''
  }

  async findAll(options?: FindManyOptions<Integration>): Promise<Integration[]> {
    return await this.integrationsRepository.find(options)
  }

  async findOne(args: FindOneOfTypeOptions<Integration>): Promise<Integration> {
    const integration = await this.integrationsRepository.findOne(toFindOneOptions(args))

    if (integration == null) {
      throw new NotFoundException('The integration was not found')
    }

    return integration
  }

  async findById(integrationId: string): Promise<Integration> {
    return await this.findOne({
      id: integrationId,
      options: {
        relations: ['practice', 'practice.identifier', 'providerConfiguration'],
      },
    })
  }

  async create(createIntegrationDto: CreateIntegrationDto): Promise<Integration> {
    try {
      await this.validateIntegrationOptions(createIntegrationDto)

      createIntegrationDto.integrationOptions = encrypt(
        createIntegrationDto.integrationOptions,
        this.secretKey,
      )

      const newIntegration = this.integrationsRepository.create({
        ...createIntegrationDto,
      })

      const integration = await this.integrationsRepository.save(newIntegration)
      this.logger.log(`Created Integration: [${integration.id}]`)

      return newIntegration
    } catch (error) {
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new NotFoundException('The practice or providerConfiguration was not found')
      }

      throw error
    }
  }

  async update(
    integrationId: string,
    integrationUpdate: Pick<CreateIntegrationDto, 'integrationOptions'>,
  ): Promise<any> {
    const integration = await this.findOne({
      id: integrationId,
      options: { relations: ['providerConfiguration', 'practice'] },
    })

    if (integration == null) {
      throw new NotFoundException("The integration doesn't exist")
    }

    const newIntegrationOptions = integrationUpdate.integrationOptions
    const updatedIntegration = {
      practiceId: integration.practiceId,
      integrationOptions: newIntegrationOptions,
      providerConfigurationId: integration.providerConfigurationId,
    }
    await this.validateIntegrationOptions(updatedIntegration)

    integrationUpdate.integrationOptions = encrypt(
      integrationUpdate.integrationOptions,
      this.secretKey,
    )

    await this.integrationsRepository.update({ id: integrationId }, { ...integrationUpdate })

    this.logger.log(`Updated Integration: [${integration.id}]`)
    if (integration.status === IntegrationStatus.RUNNING) {
      await this.updateJobs(integrationId, integration.providerConfiguration, newIntegrationOptions)
    } else {
      this.logger.log(
        `Skipping jobs update for integration ${integration.id} because status is ${integration.status}`,
      )
    }

    return await this.findOne({ id: integrationId })
  }

  async restart(integration: Integration): Promise<Error | undefined> {
    const previousStatus = integration.status
    const responseStop = await this.doStop(integration)
    if (responseStop?.message !== undefined) {
      return responseStop
    }

    if (previousStatus !== IntegrationStatus.RUNNING) {
      return
    }

    const responseStart = await this.doStart(
      integration.id,
      integration.providerConfiguration,
      integration.integrationOptions,
    )

    if (responseStart?.message !== undefined) {
      // doStop() already persisted STOPPED. Restore the previous status so a re-run picks the
      // integration up again: a RUNNING row whose jobs are missing is exactly what a restart pass
      // is meant to repair, whereas a STOPPED row would be skipped from here on.
      await this.integrationsRepository.update(integration.id, { status: previousStatus })
      this.logger.warn(
        `Failed to start integration ${integration.id}, restored status to ${previousStatus}`,
      )
      return responseStart
    }
  }

  async delete(organization: Organization, integrationId: string): Promise<void> {
    // Find the integration
    const integration = await this.findOne({
      options: {
        where: {
          id: integrationId as any,
          providerConfiguration: { organizationId: organization.id },
        },
        relations: ['providerConfiguration'],
      },
    })

    if (integration.deletedAt != null) {
      this.logger.log(`Integration ${integration.id} is already deleted`)
      return
    }

    await this.doDelete(integration)
  }

  /**
   * Restarts integrations so the engines re-register their repeatable polling jobs.
   *
   * Repeatable jobs live only in Redis and nothing re-creates them, so any Redis data loss (a
   * cutover to a new instance, an eviction, a flush) leaves the integrations RUNNING in the
   * database with no polling happening. This is the reconciliation pass for that state: it is
   * idempotent and safe to re-run, since restarting an integration whose jobs already exist just
   * replaces them.
   */
  async ensureStatusAll(options: EnsureStatusOptions = {}): Promise<EnsureStatusSummary> {
    const statuses = options.statuses ?? [IntegrationStatus.RUNNING]
    const concurrency = Math.max(1, options.concurrency ?? DEFAULT_RESTART_CONCURRENCY)
    const attempts = Math.max(1, options.attempts ?? DEFAULT_RESTART_ATTEMPTS)
    const backoffMs = Math.max(0, options.backoffMs ?? DEFAULT_RESTART_BACKOFF_MS)

    const integrations = this.filterIntegrations(
      await this.findAll({
        where: { status: In(statuses) },
        relations: ['providerConfiguration'],
      }),
      options,
    )

    const statusCounts = integrations.reduce<Record<string, number>>((counts, integration) => {
      counts[integration.status] = (counts[integration.status] ?? 0) + 1
      return counts
    }, {})

    this.logger.log(
      `Found ${integrations.length} integration(s) to restart: ${
        Object.entries(statusCounts)
          .map(([status, count]) => `${count} ${status}`)
          .join(', ') || 'none'
      }`,
    )

    if (options.dryRun === true) {
      for (const integration of integrations) {
        this.logger.log(
          `[dry-run] Would restart integration ${integration.id} (provider ${integration.providerConfiguration.providerId}, status ${integration.status})`,
        )
      }
      return { total: integrations.length, restarted: 0, failures: [], dryRun: true }
    }

    const failures: EnsureStatusFailure[] = []
    let restarted = 0
    let cursor = 0

    const worker = async (): Promise<void> => {
      while (cursor < integrations.length) {
        const integration = integrations[cursor++]
        const error = await this.restartWithRetry(integration, attempts, backoffMs)
        if (error === undefined) {
          restarted++
          this.logger.log(
            `Successfully restarted integration ${integration.id} (${
              restarted + failures.length
            }/${integrations.length})`,
          )
        } else {
          failures.push({
            integrationId: integration.id,
            providerId: integration.providerConfiguration.providerId,
            error: error.message,
          })
          this.logger.error(
            `Error restarting integration ${integration.id}: ${error.message} (${
              restarted + failures.length
            }/${integrations.length})`,
          )
        }
      }
    }

    await Promise.all(
      Array.from({ length: Math.min(concurrency, integrations.length) }, async () => await worker()),
    )

    this.logger.log(
      `Finished restarting integrations: ${restarted} succeeded, ${failures.length} failed`,
    )

    return { total: integrations.length, restarted, failures, dryRun: false }
  }

  private filterIntegrations(
    integrations: Integration[],
    options: EnsureStatusOptions,
  ): Integration[] {
    const { providerIds, integrationIds } = options
    return integrations.filter((integration) => {
      if (
        providerIds !== undefined &&
        providerIds.length > 0 &&
        !providerIds.includes(integration.providerConfiguration.providerId)
      ) {
        return false
      }
      if (
        integrationIds !== undefined &&
        integrationIds.length > 0 &&
        !integrationIds.includes(integration.id)
      ) {
        return false
      }
      return true
    })
  }

  private async restartWithRetry(
    integration: Integration,
    attempts: number,
    backoffMs: number,
  ): Promise<Error | undefined> {
    let lastError: Error | undefined

    for (let attempt = 1; attempt <= attempts; attempt++) {
      try {
        lastError = await this.restart(integration)
      } catch (e) {
        lastError = e instanceof Error ? e : new Error(String(e))
      }

      if (lastError === undefined) {
        return undefined
      }

      if (attempt < attempts) {
        const delay = backoffMs * Math.pow(2, attempt - 1)
        this.logger.warn(
          `Attempt ${attempt}/${attempts} to restart integration ${integration.id} failed (${lastError.message}), retrying in ${delay}ms`,
        )
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }

    return lastError
  }

  async doDelete(integration: Integration): Promise<void> {
    // Soft-delete the integration
    await this.doStop(integration)
    await this.integrationsRepository.softDelete(integration.id)
    this.logger.log(`Deleted Integration: ${integration.id}`)
  }

  async doStop(integration: Integration): Promise<Error | undefined> {
    try {
      // Notify engine to remove jobs
      const { message, messagePattern } = ieMessageBuilder(
        integration.providerConfiguration.providerId,
        {
          resource: Resource.Integration,
          operation: Operation.Remove,
          data: {
            integrationId: integration.id,
            payload: {
              integrationId: integration.id,
            },
          },
        },
      )

      await this.client.send(messagePattern, message).toPromise()
      await this.integrationsRepository.update(integration.id, {
        status: IntegrationStatus.STOPPED,
      })
    } catch (e) {
      return new Error(`Error stopping integration ${integration.id}`)
    }
  }

  async doStart(
    integrationId: string,
    providerConfiguration,
    integrationOptions,
  ): Promise<Error | undefined> {
    try {
      // Notify engine to add jobs
      const { message, messagePattern } = ieMessageBuilder(providerConfiguration.providerId, {
        resource: Resource.Integration,
        operation: Operation.Create,
        data: {
          integrationId,
          integrationOptions: integrationOptions,
          providerConfiguration: providerConfiguration.configurationOptions,
          payload: {
            integrationId,
          },
        },
      })
      await this.client.send(messagePattern, message).toPromise()
      await this.integrationsRepository.update(integrationId, { status: IntegrationStatus.RUNNING })
    } catch (e) {
      return new Error(`Error starting integration ${integrationId}`)
    }
  }

  async updateJobs(
    integrationId: string,
    providerConfiguration: any,
    integrationOptions: any,
  ): Promise<void> {
    // Notify engine to update jobs
    const { message, messagePattern } = ieMessageBuilder(providerConfiguration.providerId, {
      resource: Resource.Integration,
      operation: Operation.Update,
      data: {
        integrationId,
        integrationOptions: integrationOptions,
        providerConfiguration: providerConfiguration.configurationOptions,
        payload: {
          integrationId,
        },
      },
    })
    this.client.emit(messagePattern, message)
    this.logger.log(`Updated integration ${integrationId}`)
  }

  async test(integration: Integration): Promise<IntegrationTestResponse> {
    const { message, messagePattern } = ieMessageBuilder(
      integration.providerConfiguration.providerId,
      {
        resource: Resource.Integration,
        operation: Operation.Test,
        data: {
          integrationId: integration.id,
          integrationOptions: integration.integrationOptions,
          providerConfiguration: integration.providerConfiguration.configurationOptions,
          payload: null,
        },
      },
    )
    return await this.client.send(messagePattern, message).toPromise()
  }

  private async validateIntegrationOptions(
    createIntegrationDto: CreateIntegrationDto,
  ): Promise<void> {
    const providerConfiguration = await this.providerConfigurationRepository.findOne({
      where: { id: createIntegrationDto.providerConfigurationId },
    })
    const provider = await this.providerRepository.findOne({
      where: { id: providerConfiguration?.providerId },
      relations: ['options'],
    })
    if (provider == null) {
      throw new BadRequestException("The provider doesn't exist")
    }
    provider.integrationOptions = provider.options.filter(
      (option) => option.providerOptionType === 'integration',
    )
    provider.configurationOptions = provider.options.filter(
      (option) => option.providerOptionType === 'configuration',
    )

    const validatorOptions = {
      required: true,
      type: 'object',
      properties: {},
    }

    for (const option of provider.integrationOptions) {
      validatorOptions.properties[option.name] = {
        type: option.type,
        required: option.required,
      }
    }

    const providerValidator = createValidator(validatorOptions as any)

    if (!providerValidator(createIntegrationDto.integrationOptions)) {
      throw new BadRequestException('Invalid integration options')
    }

    for (const option of provider.integrationOptions) {
      if (option.type === 'string') {
        const value = (createIntegrationDto.integrationOptions as any)[option.name]
        if (typeof value === 'string' && value.trim() !== value) {
          throw new BadRequestException('Invalid integration options')
        }
      }
    }
  }
}
