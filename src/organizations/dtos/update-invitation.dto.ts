import { IsEnum, IsNotEmpty } from 'class-validator'
import { InvitationStatus } from '../entities/invitation.entity'

export class UpdateInvitationDTO {
  @IsNotEmpty()
  @IsEnum(InvitationStatus, {
    message: () => {
      const statusesInSingleString = Object.values(InvitationStatus)
        .map(status => `'${status}'`)
        .join(', ')

      return `Value should be one of: [${statusesInSingleString}].`
    }
  })
  status: string
}
