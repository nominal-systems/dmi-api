import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateRefsDTO {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  code: string

  @IsNotEmpty()
  @IsOptional()
  species?: string | null

  @IsNotEmpty()
  @IsEnum(['species', 'breed', 'sex'])
  type: 'species' | 'breed' | 'sex'

  @IsArray()
  @IsInt({ each: true })
  providerRefIds: number[]
  }
