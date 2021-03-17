import { Injectable, Logger } from '@nestjs/common'
import providersList from './constants/provider-list.constant'

@Injectable()
export class ProvidersService {
  private readonly logger = new Logger(ProvidersService.name)

  async findAll () {
    return providersList
  }

  async findOneById (providerId: string) {
    return providersList.find(provider => provider.id === providerId)
  }

  async getProviderServices (providerId: string) {
    this.logger.debug(
      `Getting (placeholder) services for provider "${providerId}"...`,
    )

    return [
      {
        code: 'HEM',
        name: 'Hematology',
        category: 'Chemistry',
        type: 'IN_HOUSE',
        price: 195.99,
        currency: 'USD',
      },
    ]
  }
}
