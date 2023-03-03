import { MigrationInterface, QueryRunner } from "typeorm"

export class IntegrationDeletedAt1673632075255 implements MigrationInterface {
  name = 'IntegrationDeletedAt1673632075255'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`integration\`
        ADD \`deletedAt\` datetime(6) NULL`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`integration\` DROP COLUMN \`deletedAt\``)
  }

}
