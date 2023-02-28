import { MigrationInterface, QueryRunner } from "typeorm"

export class PracticeIdentifier1664326770291 implements MigrationInterface {
  name = 'PracticeIdentifier1664326770291'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`identifier\`
        ADD \`practiceId\` char(36) NULL`)
    await queryRunner.query(`ALTER TABLE \`identifier\`
        ADD CONSTRAINT \`FK_1bae6c6465e961d99a3323532b4\` FOREIGN KEY (\`practiceId\`) REFERENCES \`practice\` (\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`identifier\` DROP FOREIGN KEY \`FK_1bae6c6465e961d99a3323532b4\``)
    await queryRunner.query(`ALTER TABLE \`identifier\` DROP COLUMN \`practiceId\``)
  }

}
