import { EventValue } from '../entities/event.entity'

export class AddEventDto {
  namespace: string
  type: string
  value: EventValue
  context?: any
}
