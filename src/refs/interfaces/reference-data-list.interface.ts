import { Breed, Sex, Species } from '@nominal-systems/dmi-engine-common'

export interface ReferenceDataList {
  items: Sex[] | Species[] | Breed[]
  hash?: string
}
