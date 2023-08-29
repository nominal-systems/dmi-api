import { IsArray, IsInt, IsOptional } from 'class-validator'

export class UpdateRefsDTO {
    @IsOptional()
    name?: string

    @IsOptional()
    code?: string

    @IsOptional()
    species?: string | null

    @IsArray()
    @IsInt({ each: true })
    providerRefIds?: number[]
  }
