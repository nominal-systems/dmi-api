import { IsNotEmpty, MinLength } from 'class-validator'

export class CreatePracticeDto {
  @IsNotEmpty()
  @MinLength(4)
  name: string
}
