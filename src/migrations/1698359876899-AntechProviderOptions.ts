import { MigrationInterface, QueryRunner } from "typeorm"
import { encrypt, decrypt } from '../common/utils/crypto.utils'

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
const secretKey = process.env.SECRET_KEY || ''

export class AntechProviderOptions1698359876899 implements MigrationInterface {

  name = 'AntechProviderOptions1698359876899'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                    INSERT INTO \`provider_option\` (\`id\`, \`type\`, \`name\`, \`description\`, \`required\`, \`providerOptionType\`, \`providerId\`)
                    VALUES (DEFAULT, ?, ?, ?, ?, 'configuration', ?)`, [configurationOptions.type, configurationOptions.name, configurationOptions.description, configurationOptions.required, 'antech']
    )
    await queryRunner.query(`
                        INSERT INTO \`provider_option\` (\`id\`, \`type\`, \`name\`, \`description\`, \`required\`, \`providerOptionType\`, \`providerId\`)
                        VALUES (DEFAULT, ?, ?, ?, ?, 'integration', ?)`, [integrationOptions.type, integrationOptions.name, integrationOptions.description, integrationOptions.required, 'antech']
    )

    const providerConfigurations = await queryRunner.query(`
      SELECT id, configurationOptions
      FROM provider_configuration
      WHERE providerId = 'antech'
    `)

    for (const config of providerConfigurations) {
      const decryptedConfig = decrypt(config.configurationOptions, secretKey)
      decryptedConfig['PimsIdentifier'] = 'VOY'
      const updatedConfig = encrypt(decryptedConfig, secretKey)

      await queryRunner.query(`
        UPDATE provider_configuration
        SET configurationOptions = ?
        WHERE id = ?
      `, [JSON.stringify(updatedConfig,null,0), config.id])
    }

    // Update LabId in integration
    const integrations = await queryRunner.query(`
      SELECT id, integrationOptions
      FROM integration
      WHERE providerConfigurationId IN (
        SELECT id
        FROM provider_configuration
        WHERE providerId = 'antech'
      )
    `)

    for (const integration of integrations) {
      const decryptedIntegrationOptions = decrypt(integration.integrationOptions, secretKey)
      decryptedIntegrationOptions['LabId'] = 1
      const updatedIntegrationOptions = encrypt(decryptedIntegrationOptions, secretKey)

      await queryRunner.query(`
        UPDATE integration
        SET integrationOptions = ?
        WHERE id = ?
      `, [JSON.stringify(updatedIntegrationOptions, null, 0), integration.id])
    }
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM `provider_option` WHERE `name` = "PimsIdentifier"')
    await queryRunner.query('DELETE FROM `provider_option` WHERE `name` = "LabId"')
  }

}
