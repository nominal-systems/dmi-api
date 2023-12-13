import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsNotEmpty, IsObject, IsOptional, ValidateNested } from 'class-validator'
import { PatientWeight } from '../../common/typings/patient-weight.interface'

export class CreateOrderDtoClient {
  id: string

  @IsNotEmpty()
  lastName: string

  @IsNotEmpty()
  firstName: string

  @IsOptional()
  identifier?: CreateIdentifierDto[]

  // TODO(gb): Add contact
  // TODO(gb): Add address
  // TODO(gb): Add isDoctor
  // TODO(gb): Add isStaff
}

export class CreateOrderDtoTest {
  @IsNotEmpty()
  code: string
}

// TODO(gb): move this to its own class
export class CreateIdentifierDto {
  @IsNotEmpty()
  system: string

  @IsNotEmpty()
  value: string
}

export class CreateOrderDtoPatient {
  id: string

  @IsNotEmpty()
  name: string

  @IsOptional()
  identifier?: CreateIdentifierDto[]

  @IsNotEmpty()
  sex: string

  @IsNotEmpty()
  species: string

  @IsOptional()
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

  @Type(() => CreateOrderDtoTest)
  @ValidateNested()
  @ArrayNotEmpty()
  testCodes: CreateOrderDtoTest[]

  @Type(() => String)
  @IsOptional()
  devices?: string[]

  technician?: string
  editable?: boolean
  notes?: string

  @IsOptional()
  labRequisitionInfo?: any
}
