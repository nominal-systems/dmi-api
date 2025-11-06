import {MigrationInterface, QueryRunner} from "typeorm";

export class AntechV6AutoSubmitOption1762425735176 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `INSERT INTO \`provider_option\` (\`providerOptionType\`, \`providerId\`, \`name\`, \`type\`, \`required\`, \`description\`) VALUES ('integration', 'antech-v6', 'autoSubmitEnabled', 'boolean', false, 'Enable order auto-submission for this integration') `,
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `DELETE FROM \`provider_option\` WHERE \`providerId\` = 'antech-v6' AND \`providerOptionType\` = 'integration' AND \`name\` = 'autoSubmitEnabled'`,
      )
    }
}
