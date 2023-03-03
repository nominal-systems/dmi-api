import { MigrationInterface, QueryRunner } from "typeorm"

export class ClientConstraints1675957119855 implements MigrationInterface {
  name = 'ClientConstraints1675957119855'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`client\` CHANGE \`firstName\` \`firstName\` varchar (255) NULL`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`client\` CHANGE \`firstName\` \`firstName\` varchar (255) NOT NULL`)
  }

}
