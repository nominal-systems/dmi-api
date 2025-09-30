import {MigrationInterface, QueryRunner} from "typeorm";

export class ProviderRefManyToMany1759151807779 implements MigrationInterface {
    name = 'ProviderRefManyToMany1759151807779'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`CREATE TABLE \`provider_ref_ref\` (\`refId\` int NOT NULL, \`providerRefId\` int NOT NULL, INDEX \`IDX_74652c310235ee8774f52fed59\` (\`refId\`), INDEX \`IDX_a3fbad9c23350eb5108ab310dc\` (\`providerRefId\`), PRIMARY KEY (\`refId\`, \`providerRefId\`)) ENGINE=InnoDB`);
      await queryRunner.query(`ALTER TABLE \`provider_ref_ref\` ADD CONSTRAINT \`FK_a3fbad9c23350eb5108ab310dc8\` FOREIGN KEY (\`refId\`) REFERENCES \`ref\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE \`provider_ref_ref\` ADD CONSTRAINT \`FK_74652c310235ee8774f52fed598\` FOREIGN KEY (\`providerRefId\`) REFERENCES \`provider_ref\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);

      // Migrate existing mappings from provider_ref.refId into the join table
      await queryRunner.query(`INSERT INTO \`provider_ref_ref\` (\`refId\`, \`providerRefId\`) SELECT \`refId\`, \`id\` FROM \`provider_ref\` WHERE \`refId\` IS NOT NULL`)

      await queryRunner.query(`ALTER TABLE \`provider_ref\` DROP FOREIGN KEY \`FK_fb6d1b1664e072f36c952eb73f9\``);
      await queryRunner.query(`ALTER TABLE \`provider_ref\` DROP COLUMN \`refId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`provider_ref\` ADD \`refId\` int NULL`)
        await queryRunner.query(`ALTER TABLE \`provider_ref\` ADD CONSTRAINT \`FK_fb6d1b1664e072f36c952eb73f9\` FOREIGN KEY (\`refId\`) REFERENCES \`ref\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);

        // Move data back: choose one mapping per providerRef (MIN(refId))
        await queryRunner.query(`UPDATE \`provider_ref\` pr LEFT JOIN (SELECT \`providerRefId\`, MIN(\`refId\`) AS refId FROM \`provider_ref_ref\` GROUP BY \`providerRefId\`) x ON x.\`providerRefId\` = pr.\`id\` SET pr.\`refId\` = x.\`refId\``)

        await queryRunner.query(`DROP TABLE \`provider_ref_ref\``);
    }

}
