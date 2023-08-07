import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common'
import { Organization } from '../common/decorators/organization.decorator'
import { ApiGuard } from '../common/guards/api.guard'
import { ProviderService } from '../common/typings/provider-services.interface'
import { Provider } from '../common/typings/provider.interface'
import { ReferenceDataStatus } from '../common/typings/reference-data-status.interface'
import { Organization as OrganizationEntity } from '../organizations/entities/organization.entity'
import { ReferenceDataQueryParams } from './dtos/reference-data-queryparams.dto'
import { ProviderConfiguration } from './entities/provider-configuration.entity'
import { ProviderConfigurationsService } from './services/provider-configurations.service'
import { ProvidersService } from './services/providers.service'
import { Device } from '@nominal-systems/dmi-engine-common'
import { EventPattern } from '@nestjs/microservices'
import { DisableGuards } from '../common/decorators/disable-guards.decorator'
import { ProviderRawDataDto } from './dtos/provider-raw-data.dto'

@Controller('providers')
@UseGuards(ApiGuard)
export class ProvidersController {
  constructor (
    private readonly providersService: ProvidersService,
    private readonly providerConfigurationsService: ProviderConfigurationsService
  ) {
  }

  @Get()
  async listProviders (): Promise<Provider[]> {
    return await this.providersService.findAll()
  }

  @Get(':id')
  async getProvider (@Param('id') providerId: string): Promise<Provider> {
    const provider = await this.providersService.findOneById(providerId)

    if (provider == null) {
      throw new NotFoundException('The provider was not found')
    }

    return provider
  }

  @Get(':id/services')
  async getProviderServices (
    @Param('id') providerId: string,
    @Query() { integrationId }: ReferenceDataQueryParams
  ): Promise<ProviderService[]> {
    return await this.providersService.getProviderServices(
      providerId,
      integrationId
    )
  }

  @Get('configurations')
  async getAllConfigurations (
    @Organization() organization: OrganizationEntity
  ): Promise<ProviderConfiguration[]> {
    return await this.providerConfigurationsService.findAll({
      where: {
        organizationId: organization.id
      }
    })
  }

  @Get(':id/configurations')
  async getConfigurationsForProvider (
    @Organization() organization: OrganizationEntity,
    @Param('id') providerId: string
  ): Promise<ProviderConfiguration[]> {
    return await this.providerConfigurationsService.findAll({
      where: {
        providerId: providerId,
        organizationId: organization.id
      }
    })
  }

  @Post(':id/configurations')
  @HttpCode(HttpStatus.CREATED)
  async configureProvider (
    @Organization() organization: OrganizationEntity,
    @Param('id') providerId: string,
    @Body() providerConfiguration: any
  ): Promise<ProviderConfiguration> {
    return await this.providerConfigurationsService.create(
      organization,
      providerId,
      providerConfiguration
    )
  }

  @Get(':providerId/configurations/:configId')
  async getProviderConfiguration (
    @Organization() organization: OrganizationEntity,
    @Param('providerId') providerId: string,
    @Param('configId') configId: string
  ): Promise<ProviderConfiguration> {
    return await this.providerConfigurationsService.findOne({
      options: {
        where: {
          id: configId,
          organizationId: organization.id,
          providerId: providerId
        }
      }
    })
  }

  @Patch(':providerId/configurations/:configId')
  async updateProviderConfiguration (
    @Organization() organization: OrganizationEntity,
    @Param('providerId') providerId: string,
    @Param('configId') configId: string,
    @Body() providerConfiguration: any
  ): Promise<ProviderConfiguration> {
    return await this.providerConfigurationsService.update(
      organization,
      providerId,
      configId,
      providerConfiguration
    )
  }

  @Delete(':providerId/configurations/:configId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProviderConfiguration (
    @Organization() organization: OrganizationEntity,
    @Param('providerId') providerId: string,
    @Param('configId') configId: string
  ): Promise<void> {
    return await this.providerConfigurationsService.delete({
      options: {
        where: {
          id: configId,
          organizationId: organization.id,
          providerId: providerId
        },
        relations: ['integrations']
      }
    })
  }

  @Get(':id/devices')
  async getDevices (
    @Param('id') providerId: string,
    @Query() { integrationId }: ReferenceDataQueryParams
  ): Promise<Device[]> {
    return await this.providersService.getDevices(providerId, integrationId)
  }

  @Get(':id/refs')
  async getDataStatus (
    @Param('id') providerId: string,
    @Query() { integrationId }: ReferenceDataQueryParams
  ): Promise<ReferenceDataStatus> {
    return await this.providersService.getDataStatus(providerId, integrationId)
  }

  @EventPattern('raw_data')
  @DisableGuards(ApiGuard)
  async saveProviderRawData (data: ProviderRawDataDto): Promise<void> {
    await this.providersService.saveProviderRawData(data)
  }
}
