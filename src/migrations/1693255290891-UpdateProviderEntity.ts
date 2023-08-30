import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateProviderEntity1693255290891 implements MigrationInterface {
    name = 'UpdateProviderEntity1693255290891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ref\` DROP FOREIGN KEY \`FK_ca9238220017a98b4b1cd2a9db6\``);
        await queryRunner.query(`ALTER TABLE \`ref_map\` DROP FOREIGN KEY \`FK_0cb4be82d220e630217840dbf1c\``);
        await queryRunner.query(`ALTER TABLE \`ref_map\` DROP FOREIGN KEY \`FK_c7b1e67c10e98a0ffd36f8c8d03\``);
        await queryRunner.query(`ALTER TABLE \`provider_ref\` DROP FOREIGN KEY \`FK_022f2d17270384d99ff4f22965b\``);
        await queryRunner.query(`ALTER TABLE \`provider_ref\` DROP FOREIGN KEY \`FK_b14a9642dc1d408d09f56e34f49\``);
        await queryRunner.query(`DROP INDEX \`IDX_94a696999937bc2f0f638932b4\` ON \`ref\``);
        await queryRunner.query(`CREATE TABLE \`integration_option\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`required\` tinyint NOT NULL, \`providerId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`configuration_option\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`required\` tinyint NOT NULL, \`providerId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`provider\` DROP COLUMN \`configurationOptions\``);
        await queryRunner.query(`ALTER TABLE \`provider\` DROP COLUMN \`integrationOptions\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_6309ffe95af9503285bdb8480f\` ON \`ref\` (\`code\`)`);
        await queryRunner.query(`ALTER TABLE \`integration_option\` ADD CONSTRAINT \`FK_a6394c2f480f4e4d2a5b06d7bb6\` FOREIGN KEY (\`providerId\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`configuration_option\` ADD CONSTRAINT \`FK_5efd778e5d73315101cf134af7f\` FOREIGN KEY (\`providerId\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ref\` ADD CONSTRAINT \`FK_cfbd036367517dbff67d98d55e5\` FOREIGN KEY (\`species\`) REFERENCES \`ref\`(\`code\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ref_map\` ADD CONSTRAINT \`FK_d02c62971088133d72488dc7938\` FOREIGN KEY (\`refId\`) REFERENCES \`ref\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ref_map\` ADD CONSTRAINT \`FK_cfed92083b03ff8788346fcabf9\` FOREIGN KEY (\`providerRefId\`) REFERENCES \`provider_ref\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`provider_ref\` ADD CONSTRAINT \`FK_0d11edecc9934abe342fab8a1d4\` FOREIGN KEY (\`provider\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`provider_ref\` ADD CONSTRAINT \`FK_39f35ae0ad7d98da7164f61e2ff\` FOREIGN KEY (\`species\`) REFERENCES \`provider_ref\`(\`code\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`provider_ref\` DROP FOREIGN KEY \`FK_39f35ae0ad7d98da7164f61e2ff\``);
        await queryRunner.query(`ALTER TABLE \`provider_ref\` DROP FOREIGN KEY \`FK_0d11edecc9934abe342fab8a1d4\``);
        await queryRunner.query(`ALTER TABLE \`ref_map\` DROP FOREIGN KEY \`FK_cfed92083b03ff8788346fcabf9\``);
        await queryRunner.query(`ALTER TABLE \`ref_map\` DROP FOREIGN KEY \`FK_d02c62971088133d72488dc7938\``);
        await queryRunner.query(`ALTER TABLE \`ref\` DROP FOREIGN KEY \`FK_cfbd036367517dbff67d98d55e5\``);
        await queryRunner.query(`ALTER TABLE \`configuration_option\` DROP FOREIGN KEY \`FK_5efd778e5d73315101cf134af7f\``);
        await queryRunner.query(`ALTER TABLE \`integration_option\` DROP FOREIGN KEY \`FK_a6394c2f480f4e4d2a5b06d7bb6\``);
        await queryRunner.query(`DROP INDEX \`IDX_6309ffe95af9503285bdb8480f\` ON \`ref\``);
        await queryRunner.query(`ALTER TABLE \`provider\` ADD \`integrationOptions\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`provider\` ADD \`configurationOptions\` json NOT NULL`);
        await queryRunner.query(`DROP TABLE \`configuration_option\``);
        await queryRunner.query(`DROP TABLE \`integration_option\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_94a696999937bc2f0f638932b4\` ON \`ref\` (\`code\`)`);
        await queryRunner.query(`ALTER TABLE \`provider_ref\` ADD CONSTRAINT \`FK_b14a9642dc1d408d09f56e34f49\` FOREIGN KEY (\`species\`) REFERENCES \`provider_ref\`(\`code\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`provider_ref\` ADD CONSTRAINT \`FK_022f2d17270384d99ff4f22965b\` FOREIGN KEY (\`provider\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ref_map\` ADD CONSTRAINT \`FK_c7b1e67c10e98a0ffd36f8c8d03\` FOREIGN KEY (\`providerRefId\`) REFERENCES \`provider_ref\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ref_map\` ADD CONSTRAINT \`FK_0cb4be82d220e630217840dbf1c\` FOREIGN KEY (\`refId\`) REFERENCES \`ref\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ref\` ADD CONSTRAINT \`FK_ca9238220017a98b4b1cd2a9db6\` FOREIGN KEY (\`species\`) REFERENCES \`ref\`(\`code\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
