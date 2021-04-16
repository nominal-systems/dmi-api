import { ClientsProviderAsyncOptions } from '@nestjs/microservices'
import { ActiveMQClientOptions } from './activemq-client-options.provider'

const activeMQClientProvider: ClientsProviderAsyncOptions = {
  name: 'ACTIVEMQ',
  useClass: ActiveMQClientOptions
}

export default activeMQClientProvider
