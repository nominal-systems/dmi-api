import { MigrationInterface, QueryRunner } from 'typeorm'

export class PatientSexDefualt1690965660518 implements MigrationInterface {
  name = 'PatientSexDefualt1690965660518'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`dmi\`.\`patient\` CHANGE \`sex\` \`sex\` varchar (255) NOT NULL DEFAULT 'UNKNOWN'`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`dmi\`.\`patient\` CHANGE \`sex\` \`sex\` varchar (255) NOT NULL`)
  }

}
