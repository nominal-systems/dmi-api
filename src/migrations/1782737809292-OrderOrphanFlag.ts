import { MigrationInterface, QueryRunner } from 'typeorm'

export class OrderOrphanFlag1782737809292 implements MigrationInterface {
  name = 'OrderOrphanFlag1782737809292'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `order` ADD `orphan` tinyint NOT NULL DEFAULT 0')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `order` DROP COLUMN `orphan`')
  }
}
