import { MigrationInterface, QueryRunner } from 'typeorm'

export class IntegrationsStatusDefault1728480991896 implements MigrationInterface {
  name = 'IntegrationsStatusDefault1728480991896'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`integration\` CHANGE \`status\` \`status\` enum ('NEW', 'READY', 'RUNNING', 'STOPPED', 'ERROR') NOT NULL DEFAULT 'NEW'`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`integration\` CHANGE \`status\` \`status\` enum ('RUNNING', 'STOPPED') NOT NULL DEFAULT 'RUNNING'`)
  }

}
