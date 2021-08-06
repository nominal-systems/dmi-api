import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

const baseMessage = 'The "integrationId" query parameter'

export class ReferenceDataQueryParams {
  @IsNotEmpty({ message: `${baseMessage} is required` })
  @IsString({ message: `${baseMessage} must be a string` })
  @IsUUID()
  integrationId: string
}
