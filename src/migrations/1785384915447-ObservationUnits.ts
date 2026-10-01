import { MigrationInterface, QueryRunner } from 'typeorm'

export class ObservationUnits1785384915447 implements MigrationInterface {
  name = 'ObservationUnits1785384915447'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `observation` ADD `units` varchar(255) NULL')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `observation` DROP COLUMN `units`')
  }
}
