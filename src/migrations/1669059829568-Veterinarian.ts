import { MigrationInterface, QueryRunner } from "typeorm"

export class Veterinarian1669059829568 implements MigrationInterface {
  name = 'Veterinarian1669059829568'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`lastName\` \`lastName\` varchar (255) NULL`)
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`firstName\` \`firstName\` varchar (255) NULL`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`firstName\` \`firstName\` varchar (255) NOT NULL`)
    await queryRunner.query(`ALTER TABLE \`veterinarian\` CHANGE \`lastName\` \`lastName\` varchar (255) NOT NULL`)
  }

}
