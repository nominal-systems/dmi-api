import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsEnum, IsNotEmpty, IsObject, IsOptional, ValidateNested } from 'class-validator'
import { PatientWeight, WeightUnits } from '../../common/typings/patient-weight.interface'
import { ContactDto } from '../../common/dtos/contact.dto'

export class CreateOrderDtoClient {
  id: string

  @IsNotEmpty()
  lastName: string

  @IsNotEmpty()
  firstName: string

  @IsOptional()
  identifier?: CreateIdentifierDto[]

  @IsObject()
  @IsOptional()
  contact?: ContactDto

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

export class CreateOrderDtoPatientWeight implements PatientWeight {
  @IsNotEmpty()
  measurement: number

  @IsEnum(WeightUnits, { message: 'units must be one of: kg, lb' })
  units: WeightUnits
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

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateOrderDtoPatientWeight)
  weight?: CreateOrderDtoPatientWeight
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
