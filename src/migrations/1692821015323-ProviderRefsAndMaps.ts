import {MigrationInterface, QueryRunner} from "typeorm";

export class ProviderRefsAndMaps1692821015323 implements MigrationInterface {
    name = 'ProviderRefsAndMaps1692821015323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`providers\` (\`id\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`configurationOptions\` json NOT NULL, \`integrationOptions\` json NOT NULL, \`hashes\` json NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`refs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`species\` varchar(255) NULL, \`type\` enum ('species', 'breed', 'sex') NOT NULL, INDEX \`idx_species_code\` (\`code\`), UNIQUE INDEX \`IDX_94a696999937bc2f0f638932b4\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`refs_map\` (\`id\` int NOT NULL AUTO_INCREMENT, \`refId\` int NULL, \`providerRefId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`provider_refs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`species\` varchar(255) NULL, \`type\` enum ('species', 'breed', 'sex') NOT NULL, \`provider\` varchar(255) NULL, INDEX \`idx_species_code\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`refs\` ADD CONSTRAINT \`FK_ca9238220017a98b4b1cd2a9db6\` FOREIGN KEY (\`species\`) REFERENCES \`refs\`(\`code\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`refs_map\` ADD CONSTRAINT \`FK_0cb4be82d220e630217840dbf1c\` FOREIGN KEY (\`refId\`) REFERENCES \`refs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`refs_map\` ADD CONSTRAINT \`FK_c7b1e67c10e98a0ffd36f8c8d03\` FOREIGN KEY (\`providerRefId\`) REFERENCES \`provider_refs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`provider_refs\` ADD CONSTRAINT \`FK_022f2d17270384d99ff4f22965b\` FOREIGN KEY (\`provider\`) REFERENCES \`providers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`provider_refs\` ADD CONSTRAINT \`FK_b14a9642dc1d408d09f56e34f49\` FOREIGN KEY (\`species\`) REFERENCES \`provider_refs\`(\`code\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`provider_refs\` DROP FOREIGN KEY \`FK_b14a9642dc1d408d09f56e34f49\``);
        await queryRunner.query(`ALTER TABLE \`provider_refs\` DROP FOREIGN KEY \`FK_022f2d17270384d99ff4f22965b\``);
        await queryRunner.query(`ALTER TABLE \`refs_map\` DROP FOREIGN KEY \`FK_c7b1e67c10e98a0ffd36f8c8d03\``);
        await queryRunner.query(`ALTER TABLE \`refs_map\` DROP FOREIGN KEY \`FK_0cb4be82d220e630217840dbf1c\``);
        await queryRunner.query(`ALTER TABLE \`refs\` DROP FOREIGN KEY \`FK_ca9238220017a98b4b1cd2a9db6\``);
        await queryRunner.query(`DROP INDEX \`idx_species_code\` ON \`provider_refs\``);
        await queryRunner.query(`DROP TABLE \`provider_refs\``);
        await queryRunner.query(`DROP TABLE \`refs_map\``);
        await queryRunner.query(`DROP INDEX \`IDX_94a696999937bc2f0f638932b4\` ON \`refs\``);
        await queryRunner.query(`DROP INDEX \`idx_species_code\` ON \`refs\``);
        await queryRunner.query(`DROP TABLE \`refs\``);
        await queryRunner.query(`DROP TABLE \`providers\``);
    }
}
