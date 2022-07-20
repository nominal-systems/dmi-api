import { Type } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsNotEmpty, IsObject,
  IsOptional,
  ValidateNested
} from 'class-validator'
import { PatientWeight } from '../../common/typings/patient-weight.interface'

export class CreateOrderDtoClient {
  id: string

  @IsNotEmpty()
  lastName: string

  @IsNotEmpty()
  firstName: string

  // TODO(gb): Add contact
  // TODO(gb): Add address
  // TODO(gb): Add isDoctor
  // TODO(gb): Add isStaff
}

export class CreateOrderDtoTest {
  @IsNotEmpty()
  code: string
}

export class CreateOrderDtoPatient {
  id: string

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  sex: string

  @IsNotEmpty()
  species: string

  @IsNotEmpty()
  breed: string

  @IsNotEmpty()
  @IsOptional()
  birthdate?: string

  @IsNotEmpty()
  @IsOptional()
  @IsObject()
  weight?: PatientWeight
}

export class CreateOrderDto {
  @IsOptional()
  requisitionId?: string

  @IsNotEmpty()
  integrationId: string

  @Type(() => CreateOrderDtoPatient)
  @ValidateNested()
  @IsNotEmpty()
  patient: CreateOrderDtoPatient

  @Type(() => CreateOrderDtoClient)
  @ValidateNested()
  @IsNotEmpty()
  client: CreateOrderDtoClient

  @Type(() => CreateOrderDtoClient)
  @ValidateNested()
  @IsNotEmpty()
  veterinarian: CreateOrderDtoClient

  @ArrayNotEmpty()
  testCodes: string[]

  @Type(() => String)
  @IsOptional()
  devices?: string[]

  technician?: string
  editable?: boolean
  notes?: string

  // TODO(gb): Add lab requisition info
}
