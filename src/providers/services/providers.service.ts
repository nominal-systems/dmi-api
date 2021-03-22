import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import providersList from '../constants/provider-list.constant'
import { ProviderService } from '../../common/typings/provider-services.interface'
import { Provider } from '../../common/typings/provider.interface'

@Injectable()
export class ProvidersService {
  private readonly logger = new Logger(ProvidersService.name)

  async findAll (): Promise<Provider[]> {
    return providersList
  }

  async findOneById (providerId: string): Promise<Provider> {
    const provider = providersList.find(provider => provider.id === providerId)

    if (provider == null) {
      throw new NotFoundException("The provider doesn't exist")
    }

    return provider
  }

  async getProviderServices (providerId: string): Promise<ProviderService[]> {
    this.logger.debug(
      `Getting (placeholder) services for provider "${providerId}"...`
    )

    return [
      {
        code: 'HEM',
        name: 'Hematology',
        category: 'Chemistry',
        type: 'IN_HOUSE',
        price: 195.99,
        currency: 'USD'
      }
    ]
  }
}
