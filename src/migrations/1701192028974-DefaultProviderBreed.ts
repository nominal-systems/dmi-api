import { MigrationInterface, QueryRunner } from "typeorm"

export class DefaultProviderBreed1701192028974 implements MigrationInterface {
    name = 'DefaultProviderBreed1701192028974'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`provider_default_breed\` (\`id\` int NOT NULL AUTO_INCREMENT, \`species\` varchar(255) NOT NULL, \`defaultBreed\` varchar(255) NOT NULL, \`provider\` varchar(255) NULL, UNIQUE INDEX \`IDX_bd713de109824d43d565c5919d\` (\`provider\`, \`species\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
        await queryRunner.query(`ALTER TABLE \`provider_default_breed\` ADD CONSTRAINT \`FK_48aeab3950fb7ee4a8cad765670\` FOREIGN KEY (\`provider\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`provider_default_breed\` DROP FOREIGN KEY \`FK_48aeab3950fb7ee4a8cad765670\``)
        await queryRunner.query(`DROP INDEX \`IDX_bd713de109824d43d565c5919d\` ON \`provider_default_breed\``)
        await queryRunner.query(`DROP TABLE \`provider_default_breed\``)
    }

}
