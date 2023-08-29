import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class IntegrationOptionDto {
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
}
