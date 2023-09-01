import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class ProviderOptionDto {
    @IsString()
    @IsNotEmpty()
    type: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsBoolean()
    required: boolean

    @IsEnum(['configuration', 'integration'])
    providerOptionType: 'configuration' | 'integration'
}
