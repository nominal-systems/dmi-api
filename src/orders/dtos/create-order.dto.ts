import { Type } from 'class-transformer'

export class CreateOrderDtoClient {
  id: string
  lastName: string
  firstName: string
}

export class CreateOrderDtoTest {
  code: string
}

export class CreateOrderDtoPatient {
  id: string
  lastName: string
  firstname: string
  species: string
  gender: string
  birthdate: string
  breed: string
  weight: number
  weightUnits: string
}

export class CreateOrderDto {
  integrationId: string
  notes: string
  technician: string
  editable: boolean

  @Type(() => CreateOrderDtoPatient)
  patient: CreateOrderDtoPatient

  @Type(() => CreateOrderDtoClient)
  client: CreateOrderDtoClient

  @Type(() => CreateOrderDtoTest)
  tests: CreateOrderDtoTest[]

  @Type(() => CreateOrderDtoClient)
  veterinarian: CreateOrderDtoClient
}
