import { ReferenceDataItem } from './reference-data-item.interface'

export interface Breeds {
  items: BreedsItem[]
  hash: string
}

export interface BreedsItem extends ReferenceDataItem {
  speciesId: string
}
