import { IsNotEmpty } from 'class-validator'

export class ReferenceDataQueryParams {
  @IsNotEmpty({ message: 'The "integrationId" query parameter is required' })
  integrationId: string
}
