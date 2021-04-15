import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class UserCredentialsDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @MinLength(4)
  password: string
}
