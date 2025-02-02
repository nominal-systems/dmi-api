import { EventData } from '../interfaces/event-data.interface'

export class AddEventDto {
  namespace: string
  type: string
  providerId: string
  practiceId: string
  integrationId: string
  accessionId: string
  data: EventData
  context?: any
}
