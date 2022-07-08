import { IsEmail, IsNotEmpty } from 'class-validator'
import { UserPasswordDto } from './user-password.dto'

export class UserCredentialsDto extends UserPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string
}
