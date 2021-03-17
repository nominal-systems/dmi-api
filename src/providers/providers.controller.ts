import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { Organization } from '../common/decorators/organization.decorator'
import { ApiGuard } from '../common/guards/api.guard'
import { Organization as OrganizationEntity } from '../organizations/entities/organization.entity'
import { ProviderConfigurationsService } from '../provider-configurations/provider-configurations.service'
import { ProvidersService } from './providers.service'

@Controller('providers')
@UseGuards(ApiGuard)
export class ProvidersController {
  constructor (
    private readonly providersService: ProvidersService,
    private readonly providerConfigurationsService: ProviderConfigurationsService,
  ) {}

  @Get()
  async listProviders () {
    return this.providersService.findAll()
  }

  @Get(':id')
  async getProvider (@Param('id') providerId: string) {
    const provider = await this.providersService.findOneById(providerId)

    if (!provider) {
      throw new NotFoundException('The provider was not found')
    }

    return provider
  }

  @Get(':id/services')
  async getProviderServices (@Param('id') providerId: string) {
    return await this.providersService.getProviderServices(providerId)
  }

  @Get(':id/configurations')
  async getConfigurationsForProvider (
    @Organization() organization: OrganizationEntity,
    @Param('id') providerId: string,
  ) {
    return await this.providerConfigurationsService.findAll({
      where: {
        diagnosticProviderId: providerId,
        organizationId: organization.id,
      },
    })
  }

  @Post(':id/configurations')
  async configureProvider (
    @Organization() organization: OrganizationEntity,
    @Param('id') providerId: string,
    @Body() providerConfiguration: any,
  ) {
    return await this.providerConfigurationsService.create(
      organization,
      providerId,
      providerConfiguration,
    )
  }
}
