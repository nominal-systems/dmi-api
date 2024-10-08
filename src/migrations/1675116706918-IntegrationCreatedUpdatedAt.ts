import { MigrationInterface, QueryRunner } from "typeorm"

export class IntegrationCreatedUpdatedAt1675116706918 implements MigrationInterface {
  name = 'IntegrationCreatedUpdatedAt1675116706918'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`integration\`
        ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`)
    await queryRunner.query(`ALTER TABLE \`integration\`
        ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`integration\` DROP COLUMN \`updatedAt\``)
    await queryRunner.query(`ALTER TABLE \`integration\` DROP COLUMN \`createdAt\``)
  }

}
