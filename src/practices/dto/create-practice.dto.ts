import { ArrayMaxSize, IsArray, IsNotEmpty, MinLength } from 'class-validator'

export class CreatePracticeDto {
  @IsNotEmpty()
  @MinLength(4)
  name: string

  @IsArray()
  @ArrayMaxSize(0)
  integrations? = []
}
