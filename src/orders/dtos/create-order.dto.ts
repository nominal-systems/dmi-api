import { Type } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

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
  firstName: string
  species: string
  gender: string
  birthdate: string
  breed: string
  weight: number
  weightUnits: string
}

export class CreateOrderDto {
  @IsNotEmpty()
  integrationId: string

  @IsNotEmpty()
  technician: string

  @IsNotEmpty()
  editable: boolean

  notes: string
  externalId?: string
  status?: string

  @Type(() => CreateOrderDtoPatient)
  patient: CreateOrderDtoPatient

  @Type(() => CreateOrderDtoClient)
  client: CreateOrderDtoClient

  @Type(() => CreateOrderDtoTest)
  tests: CreateOrderDtoTest[]

  @Type(() => CreateOrderDtoClient)
  veterinarian: CreateOrderDtoClient
}
