import { MigrationInterface, QueryRunner } from 'typeorm'

export class WisdomPanel1712690033378 implements MigrationInterface {
  name = 'WisdomPanel1712690033378'

  private readonly configuration = [
    {
      name: 'baseUrl',
      type: 'string',
      required: true,
      description: 'Base URL for Wisdom Panel API'
    },
    {
      name: 'username',
      type: 'string',
      required: true,
      description: 'Username for the Wisdom Panel API'
    },
    {
      name: 'password',
      type: 'string',
      required: true,
      description: 'Password for the Wisdom Panel API'
    },
    {
      name: 'organizationUnitId',
      type: 'string',
      required: true,
      description: 'Organization Unit ID associated to the Wisdom Panel account'
    }
  ]

  private readonly integration = [
    {
      name: 'hospitalName',
      type: 'string',
      required: true,
      description: 'Hospital name'
    },
    {
      name: 'hospitalNumber',
      type: 'string',
      required: true,
      description: 'Hospital number'
    },
    {
      name: 'hospitalPhone',
      type: 'string',
      required: true,
      description: 'Hospital phone number'
    }
  ]

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT IGNORE INTO \`provider\` (\`id\`, \`description\`) VALUES ('wisdom-panel', 'Wisdom Panel')`)
    for (const config of this.configuration) {
      await queryRunner.query(`INSERT INTO \`provider_option\` (\`providerOptionType\`, \`providerId\`, \`name\`, \`type\`, \`required\`, \`description\`) VALUES ('configuration', 'wisdom-panel', '${config.name}', '${config.type}', ${config.required}, '${config.description}') `)
    }
    for (const integration of this.integration) {
      await queryRunner.query(`INSERT INTO \`provider_option\` (\`providerOptionType\`, \`providerId\`, \`name\`, \`type\`, \`required\`, \`description\`) VALUES ('integration', 'wisdom-panel', '${integration.name}', '${integration.type}', ${integration.required}, '${integration.description}') `)
    }
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM \`provider_option\` WHERE \`providerId\` = 'wisdom-panel'`)
    await queryRunner.query(`DELETE FROM \`provider\` WHERE \`id\` = 'wisdom-panel'`)
  }

}
