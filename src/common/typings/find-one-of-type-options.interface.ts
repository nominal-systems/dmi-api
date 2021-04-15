import { FindOneOptions } from 'typeorm'

export interface FindOneOfTypeOptions<T> {
  id?: string
  options?: FindOneOptions<T>
}
