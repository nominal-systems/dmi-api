import { MigrationInterface, QueryRunner } from 'typeorm'

export class AntechV61709672079430 implements MigrationInterface {
  name = 'AntechV61709672079430'
  private readonly configuration = [
    {
      name: 'baseUrl',
      type: 'string',
      required: true,
      description: 'Base URL for Antech V6 API',
      value: 'https://margaapi-pims.marsvh.com'
    },
    {
      name: 'uiBaseUrl',
      type: 'string',
      required: true,
      description: 'Base URL for Antech V6 Immersive UI'
    }
  ]
  private readonly integration = [
    {
      name: 'username',
      type: 'string',
      required: true,
      description: 'Username for Antech V6 API'
    },
    {
      name: 'password',
      type: 'string',
      required: true,
      description: 'Password for Antech V6 API'
    },
    {
      name: 'clinicId',
      type: 'string',
      required: true,
      description: 'Clinic ID for Antech V6 API'
    },
    {
      name: 'labId',
      type: 'string',
      required: true,
      description: 'Lab ID for Antech V6 API'
    }
  ]

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT IGNORE INTO \`provider\` (\`id\`, \`description\`) VALUES ('antech-v6', 'Antech V6')`)
    for (const config of this.configuration) {
      await queryRunner.query(`INSERT INTO \`provider_option\` (\`providerOptionType\`, \`providerId\`, \`name\`, \`type\`, \`required\`, \`description\`) VALUES ('configuration', 'antech-v6', '${config.name}', '${config.type}', ${config.required}, '${config.description}') `)
    }
    for (const integration of this.integration) {
      await queryRunner.query(`INSERT INTO \`provider_option\` (\`providerOptionType\`, \`providerId\`, \`name\`, \`type\`, \`required\`, \`description\`) VALUES ('integration', 'antech-v6', '${integration.name}', '${integration.type}', ${integration.required}, '${integration.description}') `)
    }
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM \`provider_option\` WHERE \`providerId\` = 'antech-v6'`)
    await queryRunner.query(`DELETE FROM \`provider\` WHERE \`id\` = 'antech-v6'`)
  }

}
