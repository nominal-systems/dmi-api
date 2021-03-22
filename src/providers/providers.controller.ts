import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards
} from '@nestjs/common'
import { Organization } from '../common/decorators/organization.decorator'
import { ApiGuard } from '../common/guards/api.guard'
import { ProviderService } from '../common/typings/provider-services.interface'
import { Provider } from '../common/typings/provider.interface'
import { Organization as OrganizationEntity } from '../organizations/entities/organization.entity'
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
    @Param('id') providerId: string
  ): Promise<ProviderService[]> {
    return await this.providersService.getProviderServices(providerId)
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
}
