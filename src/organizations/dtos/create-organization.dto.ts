import { IsNotEmpty, MinLength } from 'class-validator'

export class CreateOrganizationDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly name: string
}
