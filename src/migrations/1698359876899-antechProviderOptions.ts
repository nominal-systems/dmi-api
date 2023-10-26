import { MigrationInterface, QueryRunner } from "typeorm"

const configurationOptions = {
    type: 'string',
    name: 'PimsIdentifier',
    description: 'PIMS 3-4 letter identifier',
    required: true
}
const integrationOptions = {
    type: 'integer',
    name: 'LabId',
    description: 'Practice Region/Area',
    required: true
}

export class antechProviderOptions1698359876899 implements MigrationInterface {
    name = 'antechProviderOptions1698359876899'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                    INSERT INTO \`provider_option\` (\`id\`, \`type\`, \`name\`, \`description\`, \`required\`, \`providerOptionType\`, \`providerId\`)
                    VALUES (DEFAULT, ?, ?, ?, ?, 'configuration', ?)`, [configurationOptions.type, configurationOptions.name, configurationOptions.description, configurationOptions.required, 'antech']
        )
        await queryRunner.query(`
                        INSERT INTO \`provider_option\` (\`id\`, \`type\`, \`name\`, \`description\`, \`required\`, \`providerOptionType\`, \`providerId\`)
                        VALUES (DEFAULT, ?, ?, ?, ?, 'integration', ?)`, [integrationOptions.type, integrationOptions.name, integrationOptions.description, integrationOptions.required, 'antech']
        )
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM `provider_option` WHERE `name` = "PimsIdentifier"')
        await queryRunner.query('DELETE FROM `provider_option` WHERE `name` = "LabId"')
    }

}
