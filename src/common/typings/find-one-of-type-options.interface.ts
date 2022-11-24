import { FindOneOptions } from 'typeorm'

export interface FindOneOfTypeOptions<T> {
  id?: string
  externalId?: string
  options?: FindOneOptions<T>
}
