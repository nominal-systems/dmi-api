export enum WeightUnits {
  KG = 'kg',
  LB = 'lb'
}

export interface PatientWeight {
  measurement: number
  units: WeightUnits
}
