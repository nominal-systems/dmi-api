import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards
} from '@nestjs/common'
import { Organization } from '../common/decorators/organization.decorator'
import { ApiGuard } from '../common/guards/api.guard'
import { Breeds } from '../common/typings/breeds.interface'
import { Genders } from '../common/typings/gender.interface'
import { ProviderService } from '../common/typings/provider-services.interface'
import { Provider } from '../common/typings/provider.interface'
import { ReferenceDataStatus } from '../common/typings/reference-data-status.interface'
import { Species } from '../common/typings/species.interface'
import { Organization as OrganizationEntity } from '../organizations/entities/organization.entity'
import { ReferenceDataQueryParams } from './dtos/reference-data-queryparams.dto'
import { ProviderConfiguration } from './entities/provider-configuration.entity'
import { ProviderConfigurationsService } from './services/provider-configurations.service'
import { ProvidersService } from './services/providers.service'

@Controller('providers')
@UseGuards(ApiGuard)
export class ProvidersController {
  constructor (
    private readonly providersService: ProvidersService,
    private readonly providerConfigurationsService: ProviderConfigurationsService
  ) {}

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
    return await this.providersService.getProviderServices(providerId, integrationId)
  }

  @Get(':id/configurations')
  async getConfigurationsForProvider (
    @Organization() organization: OrganizationEntity,
    @Param('id') providerId: string
  ): Promise<ProviderConfiguration[]> {
    return await this.providerConfigurationsService.findAll({
      where: {
        diagnosticProviderId: providerId,
        organizationId: organization.id
      }
    })
  }

  @Post(':id/configurations')
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

  @Get(':id/refs')
  async getDataStatus (
    @Param('id') providerId: string,
    @Query() { integrationId }: ReferenceDataQueryParams
  ): Promise<ReferenceDataStatus> {
    return await this.providersService.getDataStatus(providerId, integrationId)
  }

  @Get(':id/refs/breeds')
  async getBreeds (
    @Param('id') providerId: string,
    @Query() { integrationId }: ReferenceDataQueryParams
  ): Promise<Breeds> {
    return await this.providersService.getBreeds(providerId, integrationId)
  }

  @Get(':id/refs/genders')
  async getGenders (
    @Param('id') providerId: string,
    @Query() { integrationId }: ReferenceDataQueryParams
  ): Promise<Genders> {
    return await this.providersService.getGenders(providerId, integrationId)
  }

  @Get(':id/refs/species')
  async getSpecies (
    @Param('id') providerId: string,
    @Query() { integrationId }: ReferenceDataQueryParams
  ): Promise<Species> {
    return await this.providersService.getSpecies(providerId, integrationId)
  }
}
