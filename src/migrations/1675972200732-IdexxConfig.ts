import { MigrationInterface, QueryRunner } from 'typeorm'
import { decrypt, encrypt } from '../common/utils/crypto.utils'

export class IdexxConfig1675972200732 implements MigrationInterface {
  private readonly secretKey

  constructor () {
    this.secretKey = process.env.SECRET_KEY
  }

  public async up (queryRunner: QueryRunner): Promise<void> {

    // Read ProviderConfigurations
    const providerConfigs = await queryRunner.query(`SELECT \`id\`, \`configurationOptions\`
                                                     FROM \`dmi\`.\`provider_configuration\`
                                                     WHERE \`providerId\` = 'idexx'`)
    const providerConfigurationUpdates = <any>[]
    const integrationUpdates = <any>[]
    for (const providerConfig of providerConfigs) {
      const providerConfigurationId = providerConfig['id']
      const configurationOptions = decrypt(providerConfig['configurationOptions'], this.secretKey)
      const providerConfigUpdate = {
        id: providerConfigurationId,
        configurationOptions: {
          orderingBaseUrl: configurationOptions['orderingBaseUrl'],
          resultBaseUrl: configurationOptions['resultBaseUrl']
        }
      }

      // Read Integrations
      const integrations = await queryRunner.query(`SELECT \`id\`, \`integrationOptions\`
                                                    FROM \`dmi\`.\`integration\`
                                                    WHERE \`providerConfigurationId\` = '${providerConfigurationId}'`)
      if (integrations.length == 0) {
        break
      } else {
        const integrationOptions = decrypt(integrations[0]['integrationOptions'], this.secretKey)
        providerConfigUpdate.configurationOptions['X-Pims-Id'] = integrationOptions['X-Pims-Id']
        providerConfigUpdate.configurationOptions['X-Pims-Version'] = integrationOptions['X-Pims-Version']
        providerConfigurationUpdates.push(providerConfigUpdate)
      }

      for (const integration of integrations) {
        const integrationUpdate = {
          id: integration['id'],
          integrationOptions: {
            username: configurationOptions['username'],
            password: configurationOptions['password']
          }
        }
        integrationUpdates.push(integrationUpdate)
      }
    }

    // Perform ProviderConfiguration updates
    for (const pcUpdate of providerConfigurationUpdates) {
      const id = pcUpdate['id']
      const configurationOptions = JSON.stringify(encrypt(pcUpdate['configurationOptions'], this.secretKey))
      await queryRunner.query(`UPDATE \`dmi\`.\`provider_configuration\`
                               SET \`configurationOptions\` = '${configurationOptions}'
                               WHERE \`id\` = '${id}'`)
    }

    // Perform Integration updates
    for (const iUpdate of integrationUpdates) {
      const id = iUpdate['id']
      const integrationOptions = JSON.stringify(encrypt(iUpdate['integrationOptions'], this.secretKey))
      await queryRunner.query(`UPDATE \`dmi\`.\`integration\`
                               SET \`integrationOptions\` = '${integrationOptions}'
                               WHERE \`id\` = '${id}'`)
    }
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    
  }

}
