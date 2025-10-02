import { MigrationInterface, QueryRunner } from 'typeorm'

export class ProviderSpeciesMappingDefaultBreed1759321858526 implements MigrationInterface {
  name = 'ProviderSpeciesMappingDefaultBreed1759321858526'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`provider_species_mapping_default_breed\`
                             (
                               \`id\`              int          NOT NULL AUTO_INCREMENT,
                               \`refSpecies\`      int           NOT NULL,
                               \`providerSpecies\` int           NOT NULL,
                               \`defaultBreed\`    int           NULL,
                               \`provider\`        varchar(255) NULL,
                               UNIQUE INDEX \`IDX_c3ff72de529f2dff31c9948a51\` (\`provider\`, \`refSpecies\`, \`providerSpecies\`),
                               PRIMARY KEY (\`id\`)
                             ) ENGINE=InnoDB`)
    await queryRunner.query(`ALTER TABLE \`provider_species_mapping_default_breed\`
      ADD CONSTRAINT \`FK_352a9ed648514cb4743d817744d\` FOREIGN KEY (\`provider\`) REFERENCES \`provider\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE \`provider_species_mapping_default_breed\`
      ADD CONSTRAINT \`FK_11a2b33c44d55e66f77a8899ab0\` FOREIGN KEY (\`refSpecies\`) REFERENCES \`ref\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE \`provider_species_mapping_default_breed\`
      ADD CONSTRAINT \`FK_22bb33cc44dd55ee66ff77aa88b\` FOREIGN KEY (\`providerSpecies\`) REFERENCES \`provider_ref\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE \`provider_species_mapping_default_breed\`
      ADD CONSTRAINT \`FK_33cc44dd55ee66ff77aabb8899c\` FOREIGN KEY (\`defaultBreed\`) REFERENCES \`provider_ref\` (\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`provider_species_mapping_default_breed\` DROP FOREIGN KEY \`FK_33cc44dd55ee66ff77aabb8899c\``)
    await queryRunner.query(`ALTER TABLE \`provider_species_mapping_default_breed\` DROP FOREIGN KEY \`FK_22bb33cc44dd55ee66ff77aa88b\``)
    await queryRunner.query(`ALTER TABLE \`provider_species_mapping_default_breed\` DROP FOREIGN KEY \`FK_11a2b33c44d55e66f77a8899ab0\``)
    await queryRunner.query(`ALTER TABLE \`provider_species_mapping_default_breed\` DROP FOREIGN KEY \`FK_352a9ed648514cb4743d817744d\``)
    await queryRunner.query(`DROP TABLE \`provider_species_mapping_default_breed\``)
  }

}
