import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class ProviderRawDataDto {
  @IsNotEmpty()
  @IsString()
  provider: string

  @IsNotEmpty()
  @IsNumber()
  status: number

  @IsNotEmpty()
  @IsString()
  url: string

  @IsNotEmpty()
  @IsString()
  @IsIn(['GET', 'POST', 'PUT', 'DELETE'])
  method: string

  @IsNotEmpty()
  headers: any

  @IsNotEmpty()
  @IsString()
  body: any

  @IsOptional()
  @IsString()
  payload: any
}
