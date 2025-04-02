import { MigrationInterface, QueryRunner } from 'typeorm'

export class ObservationRelationship1743585344401 implements MigrationInterface {
  name = 'ObservationRelationship1743585344401'

  public async up (queryRunner: QueryRunner): Promise<void> {
  await queryRunner.query(`CREATE TABLE \`observation_relationship\` (\`id\` char(36) NOT NULL, \`type\` enum ('has-member', 'sequel-to', 'replaces', 'qualified-by', 'interfered-by', 'is-interpretation-of') NOT NULL, \`target\` varchar(255) NOT NULL, \`sourceId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
  await queryRunner.query(`ALTER TABLE \`observation_relationship\` ADD CONSTRAINT \`FK_eb0ff8c39e267313aa25397c8c7\` FOREIGN KEY (\`sourceId\`) REFERENCES \`observation\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`observation_relationship\` DROP FOREIGN KEY \`FK_eb0ff8c39e267313aa25397c8c7\``)
    await queryRunner.query(`DROP TABLE \`observation_relationship\``)
  }

}
