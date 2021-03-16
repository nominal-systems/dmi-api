import { Injectable } from '@nestjs/common'
import providersList from './constants/provider-list.constant'

@Injectable()
export class ProvidersService {
  async findAll () {
    return providersList
  }

  async findOneById (providerId: string) {
    return providersList.find(provider => provider.id === providerId)
  }
}
