import { Type } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsOptional,
  ValidateNested
} from 'class-validator'

export class CreateOrderDtoClient {
  id: string

  @IsNotEmpty()
  lastName: string

  @IsNotEmpty()
  firstName: string
}

export class CreateOrderDtoTest {
  @IsNotEmpty()
  code: string
}

export class CreateOrderDtoPatient {
  id: string

  @IsNotEmpty()
  lastName: string

  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  species: string

  @IsNotEmpty()
  sex: string

  @IsNotEmpty()
  birthdate: string

  @IsNotEmpty()
  breed: string

  @IsNotEmpty()
  weight: number

  @IsNotEmpty()
  weightUnits: string
}

export class CreateOrderDto {
  @IsNotEmpty()
  integrationId: string

  @IsNotEmpty()
  editable: boolean

  @Type(() => CreateOrderDtoPatient)
  @ValidateNested()
  @IsNotEmpty()
  patient: CreateOrderDtoPatient

  @Type(() => CreateOrderDtoClient)
  @ValidateNested()
  @IsNotEmpty()
  client: CreateOrderDtoClient

  @Type(() => CreateOrderDtoTest)
  @ValidateNested()
  @ArrayNotEmpty()
  tests: CreateOrderDtoTest[]

  @Type(() => CreateOrderDtoClient)
  @ValidateNested()
  @IsNotEmpty()
  veterinarian: CreateOrderDtoClient

  @Type(() => String)
  @IsOptional()
  devices?: string[]

  notes: string
  technician: string
  externalId?: string
  status?: string
}
