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
import { ProvidersService } from './providers.service'

@Controller('providers')
@UseGuards(ApiGuard)
export class ProvidersController {
  constructor (private readonly providersService: ProvidersService) {}

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

  @Get(':id/configurations')
  async getConfigurationsForProvider (
    @Organization() organization: OrganizationEntity,
    @Param('id') providerId: string,
  ) {
    return await this.providersService.getProviderConfigurations(
      organization,
      providerId,
    )
  }

  @Post(':id/configurations')
  async configureProvider (
    @Organization() organization: OrganizationEntity,
    @Param('id') providerId: string,
    @Body() providerConfiguration: any,
  ) {
    return await this.providersService.createProviderConfiguration(
      organization,
      providerId,
      providerConfiguration,
    )
  }
}
