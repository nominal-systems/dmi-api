import { MigrationInterface, QueryRunner } from "typeorm"

export class UnifyProviderOptions1693444089743 implements MigrationInterface {
    name = 'UnifyProviderOptions1693444089743'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`configuration_option\` DROP FOREIGN KEY \`FK_5efd778e5d73315101cf134af7f\``)
        await queryRunner.query(`ALTER TABLE \`integration_option\` DROP FOREIGN KEY \`FK_a6394c2f480f4e4d2a5b06d7bb6\``)
        await queryRunner.query(`DROP TABLE \`configuration_option\``)
        await queryRunner.query(`DROP TABLE \`integration_option\``)
        await queryRunner.query(`CREATE TABLE \`provider_option\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`required\` tinyint NOT NULL, \`providerOptionType\` ENUM ('configuration', 'integration') NOT NULL, \`providerId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
        await queryRunner.query(`ALTER TABLE \`provider_option\` ADD CONSTRAINT \`FK_964474fdde11ef40ed5f77a15a3\` FOREIGN KEY (\`providerId\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`integration_option\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`required\` tinyint NOT NULL, \`providerId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
        await queryRunner.query(`CREATE TABLE \`configuration_option\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`required\` tinyint NOT NULL, \`providerId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
        await queryRunner.query(`ALTER TABLE \`integration_option\` ADD CONSTRAINT \`FK_a6394c2f480f4e4d2a5b06d7bb6\` FOREIGN KEY (\`providerId\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await queryRunner.query(`ALTER TABLE \`configuration_option\` ADD CONSTRAINT \`FK_5efd778e5d73315101cf134af7f\` FOREIGN KEY (\`providerId\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await queryRunner.query(`ALTER TABLE \`provider_option\` DROP FOREIGN KEY \`FK_964474fdde11ef40ed5f77a15a3\``)
        await queryRunner.query(`DROP TABLE \`provider_option\``)
    }

}
