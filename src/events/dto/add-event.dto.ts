import { EventData } from '../entities/event-type.interface'

export class AddEventDto {
  namespace: string
  type: string
  integrationId: string
  data: EventData
  context?: any
}
