import { MigrationInterface, QueryRunner } from "typeorm"

export class PracticeSoftDelete1676988851611 implements MigrationInterface {
  name = 'PracticeSoftDelete1676988851611'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`practice\` ADD \`deletedAt\` datetime(6) NULL`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`practice\` DROP COLUMN \`deletedAt\``)
  }

}
