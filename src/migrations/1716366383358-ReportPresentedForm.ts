import { MigrationInterface, QueryRunner } from 'typeorm'

export class ReportPresentedForm1716366383358 implements MigrationInterface {
  name = 'ReportPresentedForm1716366383358'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`dmi\`.\`attachment\` ADD \`reportId\` char(36) NULL`)
    await queryRunner.query(`ALTER TABLE \`dmi\`.\`attachment\` ADD CONSTRAINT \`FK_daebbc8b4bd00b3d39cd5894795\` FOREIGN KEY (\`reportId\`) REFERENCES \`dmi\`.\`report\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`dmi\`.\`attachment\` DROP FOREIGN KEY \`FK_daebbc8b4bd00b3d39cd5894795\``)
    await queryRunner.query(`ALTER TABLE \`dmi\`.\`attachment\` DROP COLUMN \`reportId\``)
  }

}
