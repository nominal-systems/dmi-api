import { MigrationInterface, QueryRunner } from "typeorm"

export class ObservationNotes1669408249906 implements MigrationInterface {
  name = 'ObservationNotes1669408249906'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`observation\` DROP COLUMN \`notes\``)
    await queryRunner.query(`ALTER TABLE \`observation\`
        ADD \`notes\` text NULL`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`observation\` DROP COLUMN \`notes\``)
    await queryRunner.query(`ALTER TABLE \`observation\`
        ADD \`notes\` varchar(255) NULL`)
  }

}
