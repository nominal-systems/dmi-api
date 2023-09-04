import { MigrationInterface, QueryRunner } from "typeorm"

export class ProviderRefsAndProviderOptions1693861926215 implements MigrationInterface {
    name = 'ProviderRefsAndProviderOptions1693861926215'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`provider\` (\`id\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`hashes\` json NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
        await queryRunner.query(`CREATE TABLE \`ref\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`species\` varchar(255) NULL, \`type\` enum ('species', 'breed', 'sex') NOT NULL, INDEX \`idx_species_code\` (\`code\`), UNIQUE INDEX \`IDX_94a696999937bc2f0f638932b4\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
        await queryRunner.query(`CREATE TABLE \`ref_map\` (\`id\` int NOT NULL AUTO_INCREMENT, \`refId\` int NULL, \`providerRefId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
        await queryRunner.query(`CREATE TABLE \`provider_ref\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`species\` varchar(255) NULL, \`type\` enum ('species', 'breed', 'sex') NOT NULL, \`provider\` varchar(255) NULL, INDEX \`idx_species_code\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
        await queryRunner.query(`CREATE TABLE \`provider_option\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`required\` tinyint NOT NULL, \`providerOptionType\` ENUM ('configuration', 'integration') NOT NULL, \`providerId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_6309ffe95af9503285bdb8480f\` ON \`ref\` (\`code\`)`)
        await queryRunner.query(`ALTER TABLE \`ref\` ADD CONSTRAINT \`FK_ca9238220017a98b4b1cd2a9db6\` FOREIGN KEY (\`species\`) REFERENCES \`ref\`(\`code\`) ON DELETE SET NULL ON UPDATE NO ACTION`)
        await queryRunner.query(`ALTER TABLE \`ref_map\` ADD CONSTRAINT \`FK_0cb4be82d220e630217840dbf1c\` FOREIGN KEY (\`refId\`) REFERENCES \`ref\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await queryRunner.query(`ALTER TABLE \`ref_map\` ADD CONSTRAINT \`FK_c7b1e67c10e98a0ffd36f8c8d03\` FOREIGN KEY (\`providerRefId\`) REFERENCES \`provider_ref\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await queryRunner.query(`ALTER TABLE \`provider_ref\` ADD CONSTRAINT \`FK_022f2d17270384d99ff4f22965b\` FOREIGN KEY (\`provider\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await queryRunner.query(`ALTER TABLE \`provider_ref\` ADD CONSTRAINT \`FK_b14a9642dc1d408d09f56e34f49\` FOREIGN KEY (\`species\`) REFERENCES \`provider_ref\`(\`code\`) ON DELETE SET NULL ON UPDATE NO ACTION`)
        await queryRunner.query(`ALTER TABLE \`provider_option\` ADD CONSTRAINT \`FK_964474fdde11ef40ed5f77a15a3\` FOREIGN KEY (\`providerId\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`provider_ref\` DROP FOREIGN KEY \`FK_b14a9642dc1d408d09f56e34f49\``)
        await queryRunner.query(`ALTER TABLE \`provider_ref\` DROP FOREIGN KEY \`FK_022f2d17270384d99ff4f22965b\``)
        await queryRunner.query(`ALTER TABLE \`ref_map\` DROP FOREIGN KEY \`FK_c7b1e67c10e98a0ffd36f8c8d03\``)
        await queryRunner.query(`ALTER TABLE \`ref_map\` DROP FOREIGN KEY \`FK_0cb4be82d220e630217840dbf1c\``)
        await queryRunner.query(`ALTER TABLE \`ref\` DROP FOREIGN KEY \`FK_ca9238220017a98b4b1cd2a9db6\``)
        await queryRunner.query(`ALTER TABLE \`provider_option\` DROP FOREIGN KEY \`FK_964474fdde11ef40ed5f77a15a3\``)
        await queryRunner.query(`DROP INDEX \`IDX_6309ffe95af9503285bdb8480f\` ON \`ref\``)
        await queryRunner.query(`DROP TABLE \`provider_option\``)
        await queryRunner.query(`DROP TABLE \`provider_ref\``)
        await queryRunner.query(`DROP TABLE \`ref_map\``)
        await queryRunner.query(`DROP TABLE \`ref\``)
        await queryRunner.query(`DROP TABLE \`provider\``)
    }

}
