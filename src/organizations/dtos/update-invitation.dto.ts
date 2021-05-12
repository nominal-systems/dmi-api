import { IsEnum, IsNotEmpty, ValidationArguments } from 'class-validator'
import { InvitationStatus } from '../entities/invitation.entity'

export class UpdateInvitationDTO {
  @IsNotEmpty()
  @IsEnum(InvitationStatus, {
    message: (validationArgs: ValidationArguments) => {
      const statusesInSingleString = Object.values(InvitationStatus)
        .map(status => `'${status}'`)
        .join(', ')

      return `Value should be one of: [${statusesInSingleString}].`
    }
  })
  status: string
}
