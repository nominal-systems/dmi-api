import { MigrationInterface, QueryRunner } from 'typeorm'

export class AttachmentDataColumnSize1710380181632 implements MigrationInterface {
  name = 'AttachmentDataColumnSize1710380181632'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`attachment\` MODIFY COLUMN \`data\` LONGTEXT`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`attachment\` MODIFY COLUMN \`data\` TEXT`)
  }

}
