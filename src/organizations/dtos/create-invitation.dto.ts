import { IsNotEmpty } from 'class-validator'

export class CreateInvitationDTO {
  @IsNotEmpty()
  inviteesEmail: string

  @IsNotEmpty()
  organizationId: string
}
