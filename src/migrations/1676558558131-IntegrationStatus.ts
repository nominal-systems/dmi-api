import { MigrationInterface, QueryRunner } from "typeorm"

export class IntegrationStatus1676558558131 implements MigrationInterface {
  name = 'IntegrationStatus1676558558131'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`integration\`
        ADD \`status\` enum ('RUNNING', 'STOPPED') NOT NULL DEFAULT 'RUNNING'`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`integration\` DROP COLUMN \`status\``)
  }

}
