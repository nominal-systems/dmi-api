import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common'
import { Organization } from '../common/decorators/organization.decorator'
import { ApiGuard } from '../common/guards/api.guard'
import { ReferenceDataStatus } from '../common/typings/reference-data-status.interface'
import { Organization as OrganizationEntity } from '../organizations/entities/organization.entity'
import { ReferenceDataQueryParams } from './dtos/reference-data-queryparams.dto'
import { ProviderConfiguration } from './entities/provider-configuration.entity'
import { ProviderConfigurationsService } from './services/provider-configurations.service'
import { ProvidersService } from './services/providers.service'
import { Device, Service } from '@nominal-systems/dmi-engine-common'
import { EventPattern } from '@nestjs/microservices'
import { DisableGuards } from '../common/decorators/disable-guards.decorator'
import { ProviderRawDataDto } from './dtos/provider-raw-data.dto'
import { Provider } from './entities/provider.entity'

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
    return await this.providersService.findAll({ relations: ['options'] })
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
  ): Promise<Service[]> {
    return await this.providersService.getProviderServices(
      providerId,
      integrationId
    )
  }

  @Get(':id/services/:serviceCode')
  async getProviderServiceByCode (
    @Param('id') providerId: string,
    @Param('serviceCode') serviceCode: string,
    @Query() { integrationId }: ReferenceDataQueryParams
  ): Promise<Service[]> {
    return await this.providersService.getProviderServiceByCode(
      providerId,
      integrationId,
      serviceCode
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
    const where = {
      id: configId,
      organizationId: organization.id,
      providerId: providerId
    }
    return await this.providerConfigurationsService.findOne({
      options: {
        where: where
      }
    })
  }

  @Put(':providerId/configurations/:configId')
  @HttpCode(HttpStatus.OK)
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
