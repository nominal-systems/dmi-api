import { ArrayMaxSize, IsArray, IsNotEmpty, IsOptional, MinLength } from 'class-validator'
import { CreateIdentifierDto } from '../../orders/dtos/create-order.dto'

export class CreatePracticeDto {
  @IsNotEmpty()
  @MinLength(4)
  name: string

  @IsOptional()
  identifier?: CreateIdentifierDto[]

  @IsArray()
  @ArrayMaxSize(0)
  integrations? = []
}
