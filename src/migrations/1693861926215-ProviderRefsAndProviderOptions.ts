import { MigrationInterface, QueryRunner } from "typeorm"

export class ProviderRefsAndProviderOptions1693861926215 implements MigrationInterface {
    name = 'ProviderRefsAndProviderOptions1693861926215'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`provider\` (\`id\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`hashes\` json NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`provider_option\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`required\` tinyint NOT NULL, \`providerOptionType\` enum ('configuration', 'integration') NOT NULL, \`providerId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ref\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`species\` varchar(255) NULL, \`type\` enum ('species', 'breed', 'sex') NOT NULL, INDEX \`idx_species_code\` (\`code\`), UNIQUE INDEX \`IDX_6309ffe95af9503285bdb8480f\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`provider_ref\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`species\` varchar(255) NULL, \`type\` enum ('species', 'breed', 'sex') NOT NULL, \`provider\` varchar(255) NULL, \`refId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`provider_option\` ADD CONSTRAINT \`FK_964474fdde11ef40ed5f77a15a3\` FOREIGN KEY (\`providerId\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ref\` ADD CONSTRAINT \`FK_cfbd036367517dbff67d98d55e5\` FOREIGN KEY (\`species\`) REFERENCES \`ref\`(\`code\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`provider_ref\` ADD CONSTRAINT \`FK_0d11edecc9934abe342fab8a1d4\` FOREIGN KEY (\`provider\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`provider_ref\` ADD CONSTRAINT \`FK_fb6d1b1664e072f36c952eb73f9\` FOREIGN KEY (\`refId\`) REFERENCES \`ref\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);

    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`provider_ref\` DROP FOREIGN KEY \`FK_fb6d1b1664e072f36c952eb73f9\``);
        await queryRunner.query(`ALTER TABLE \`provider_ref\` DROP FOREIGN KEY \`FK_0d11edecc9934abe342fab8a1d4\``);
        await queryRunner.query(`ALTER TABLE \`ref\` DROP FOREIGN KEY \`FK_cfbd036367517dbff67d98d55e5\``);
        await queryRunner.query(`ALTER TABLE \`provider_option\` DROP FOREIGN KEY \`FK_964474fdde11ef40ed5f77a15a3\``);
        await queryRunner.query(`DROP INDEX \`idx_species_code\` ON \`provider_ref\``);
        await queryRunner.query(`DROP TABLE \`provider_ref\``);
        await queryRunner.query(`DROP INDEX \`IDX_6309ffe95af9503285bdb8480f\` ON \`ref\``);
        await queryRunner.query(`DROP INDEX \`idx_species_code\` ON \`ref\``);
        await queryRunner.query(`DROP TABLE \`ref\``);
        await queryRunner.query(`DROP TABLE \`provider_option\``);
        await queryRunner.query(`DROP TABLE \`provider\``);
    }

}
