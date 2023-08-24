import { IsArray, IsInt, IsOptional } from 'class-validator'

export class UpdateRefsDTO {
    @IsOptional()
    name?: string

    @IsOptional()
    code?: string

    species?: string | null

    @IsOptional()
    type?: 'species' | 'breed' | 'sex'

    @IsArray()
    @IsInt({ each: true })
    providerRefIds?: number[]
  }
