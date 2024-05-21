import { MigrationInterface, QueryRunner } from 'typeorm'

export class AntechV6PimsIdentifier1715944242587 implements MigrationInterface {

  public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`INSERT INTO \`provider_option\` (\`providerOptionType\`, \`providerId\`, \`name\`, \`type\`, \`required\`, \`description\`) VALUES ('configuration', 'antech-v6', 'PimsIdentifier', 'string', true, 'PIMS 3-4 letter identifier') `)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DELETE FROM \`provider_option\` WHERE \`providerId\` = 'antech-v6' AND \`name\` = 'PimsIdentifier'`)
  }
}
