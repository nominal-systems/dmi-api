import { Logger } from '@nestjs/common'
import { MigrationInterface, QueryRunner } from 'typeorm'
import { decrypt, encrypt } from '../common/utils/crypto.utils'

export class AnicuraIntegrationOptions1690968415895 implements MigrationInterface {
  private readonly logger = new Logger(AnicuraIntegrationOptions1690968415895.name)
  private readonly INTEGRATION_ID = 'e6547902-6e57-4cee-8b01-86d11dd9282c'

  public async up (queryRunner: QueryRunner): Promise<void> {
    const encryptedOptions = await queryRunner.query(`SELECT \`integrationOptions\` FROM \`integration\` WHERE id = '${this.INTEGRATION_ID}'`)
    if (encryptedOptions.length == 1) {
      const integrationOptions = decrypt(encryptedOptions[0]['integrationOptions'], process.env.SECRET_KEY || '')
      this.logger.log(`Found integration options for ${this.INTEGRATION_ID}: ${JSON.stringify(integrationOptions, null, 0)}`)
      integrationOptions['locale'] = 'es'
      const newIntegrationOptions = encrypt(integrationOptions, process.env.SECRET_KEY || '')
      this.logger.log(`New integrationOptions: ${JSON.stringify(integrationOptions, null, 0)}`)
      await queryRunner.query(`UPDATE \`integration\` SET \`integrationOptions\` = '${JSON.stringify(newIntegrationOptions, null, 0)}' WHERE id = '${this.INTEGRATION_ID}'`)
    } else {
      this.logger.warn(`Found no integration with id ${this.INTEGRATION_ID}`)
    }
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const encryptedOptions = await queryRunner.query(`SELECT \`integrationOptions\` FROM \`integration\` WHERE id = '${this.INTEGRATION_ID}'`)
    if (encryptedOptions.length == 1) {
      const integrationOptions = decrypt(encryptedOptions[0]['integrationOptions'], process.env.SECRET_KEY || '')
      this.logger.log(`Found  integration options for ${this.INTEGRATION_ID}: ${JSON.stringify(integrationOptions, null, 0)}`)
      delete integrationOptions['locale']
      const newIntegrationOptions = encrypt(integrationOptions, process.env.SECRET_KEY || '')
      this.logger.log(`New integrationOptions: ${JSON.stringify(newIntegrationOptions, null, 0)}`)
      await queryRunner.query(`UPDATE \`integration\` SET \`integrationOptions\` = '${JSON.stringify(newIntegrationOptions, null, 0)}' WHERE id = '${this.INTEGRATION_ID}'`)
    } else {
      this.logger.warn(`Found no integration with id ${this.INTEGRATION_ID}`)
    }
  }

}
