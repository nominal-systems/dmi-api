import { MigrationInterface, QueryRunner } from "typeorm"

export class PatientBreedConstraint1675198181318 implements MigrationInterface {
  name = 'PatientBreedConstraint1675198181318'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`patient\` CHANGE \`breed\` \`breed\` varchar (255) NULL`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`patient\` CHANGE \`breed\` \`breed\` varchar (255) NOT NULL`)
  }

}
