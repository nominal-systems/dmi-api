import { UserPasswordDto } from './user-password.dto'
import { IsNotEmpty } from 'class-validator'

export class AdminUserCredentialsDto extends UserPasswordDto {
  @IsNotEmpty()
  username: string
}
