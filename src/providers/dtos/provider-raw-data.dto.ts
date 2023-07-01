import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator'

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
  @IsString()
  body: any
}
