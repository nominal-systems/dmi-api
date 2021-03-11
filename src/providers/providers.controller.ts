import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiGuard } from '../common/guards/api.guard'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { ProvidersService } from './providers.service'

@Controller('providers')
@UseGuards(JwtAuthGuard, ApiGuard)
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
  async getConfigurationsForProvider (@Param('id') providerId: string) {
    return await this.providersService.getProviderConfigurations(providerId)
  }

  @Post(':id/configurations')
  async configureProvider (
    @Param('id') providerId: string,
    @Body() providerConfiguration: any,
  ) {
    return await this.providersService.createProviderConfiguration(
      providerId,
      providerConfiguration,
    )
  }
}
