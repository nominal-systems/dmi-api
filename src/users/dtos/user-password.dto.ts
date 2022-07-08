import { IsNotEmpty, MinLength } from 'class-validator'

export class UserPasswordDto {
  @IsNotEmpty()
  @MinLength(4)
  password: string
}
