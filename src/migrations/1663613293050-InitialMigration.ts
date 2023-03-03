import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1663613293050 implements MigrationInterface {
    name = 'InitialMigration1663613293050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`event_subscription\` (\`id\` char(36) NOT NULL, \`event_type\` enum ('order:created', 'order:updated', 'order:results', 'report:created', 'report:updated') NOT NULL, \`subscription_type\` enum ('azure-event-hubs') NOT NULL DEFAULT 'azure-event-hubs', \`subscription_options\` json NOT NULL, \`organizationId\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_59a7fac47adbdb902003abdf8f\` (\`event_type\`, \`subscription_type\`, \`organizationId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`provider_configuration\` (\`id\` char(36) NOT NULL, \`providerId\` varchar(255) NOT NULL, \`configurationOptions\` json NOT NULL, \`organizationId\` char(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`invitation\` (\`id\` char(36) NOT NULL, \`inviteesId\` char(36) NOT NULL, \`organizationId\` char(36) NOT NULL, \`status\` enum ('pending', 'accepted') NOT NULL DEFAULT 'pending', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` char(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`organizationId\` char(36) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`organization\` (\`id\` char(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`testKey\` varchar(255) NOT NULL, \`prodKey\` varchar(255) NOT NULL, \`ownerId\` char(36) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_5440f62ba0d7f641510d5441fc\` (\`testKey\`), UNIQUE INDEX \`IDX_b0bb8ad506308a11084bbd5eb2\` (\`prodKey\`), UNIQUE INDEX \`REL_67c515257c7a4bc221bb1857a3\` (\`ownerId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`practice\` (\`id\` char(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`organizationId\` char(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`integration\` (\`id\` char(36) NOT NULL, \`practiceId\` char(36) NOT NULL, \`providerConfigurationId\` char(36) NOT NULL, \`integrationOptions\` json NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`client\` (\`id\` char(36) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`patient\` (\`id\` char(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`sex\` varchar(255) NOT NULL, \`species\` varchar(255) NOT NULL, \`breed\` varchar(255) NOT NULL, \`birthdate\` varchar(255) NULL, \`weightMeasurement\` int NULL, \`weightUnits\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`identifier\` (\`id\` int NOT NULL AUTO_INCREMENT, \`system\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, \`patientId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`test\` (\`code\` varchar(255) NOT NULL, PRIMARY KEY (\`code\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`veterinarian\` (\`id\` char(36) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` char(36) NOT NULL, \`requisitionId\` varchar(255) NULL, \`externalId\` varchar(255) NULL, \`integrationId\` char(36) NOT NULL, \`manifestUri\` varchar(255) NULL, \`submissionUri\` varchar(255) NULL, \`status\` varchar(255) NULL, \`devices\` json NULL, \`technician\` varchar(255) NULL, \`notes\` varchar(255) NULL, \`editable\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`patientId\` char(36) NULL, \`clientId\` char(36) NULL, \`veterinarianId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`report\` (\`id\` char(36) NOT NULL, \`orderId\` char(36) NOT NULL, \`status\` enum ('REGISTERED', 'PARTIAL', 'FINAL', 'CANCELLED') NOT NULL DEFAULT 'REGISTERED', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`patientId\` char(36) NULL, UNIQUE INDEX \`REL_b7ab480d27c4e7f614b956f492\` (\`orderId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`test_result\` (\`id\` char(36) NOT NULL, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`status\` enum ('PENDING', 'PARTIAL', 'COMPLETED', 'REVISED', 'CANCELLED') NOT NULL DEFAULT 'PENDING', \`deviceId\` varchar(255) NULL, \`notes\` varchar(255) NULL, \`reportId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`observation\` (\`id\` char(36) NOT NULL, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`status\` enum ('PENDING', 'DONE', 'CANCELLED') NOT NULL DEFAULT 'DONE', \`valueString\` varchar(255) NULL, \`valueQuantity\` text NULL, \`interpretation\` varchar(255) NULL, \`referenceRange\` text NULL, \`notes\` varchar(255) NULL, \`testResultId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_tests_test\` (\`orderId\` char(36) NOT NULL, \`testCode\` varchar(255) NOT NULL, INDEX \`IDX_73df8c37f4a4c6dd5705f88727\` (\`orderId\`), INDEX \`IDX_09c10f16b9970e23164fa201b9\` (\`testCode\`), PRIMARY KEY (\`orderId\`, \`testCode\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`provider_configuration\` ADD CONSTRAINT \`FK_db6ee5c00fda6995bc9bb7f8992\` FOREIGN KEY (\`organizationId\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invitation\` ADD CONSTRAINT \`FK_5c00d7d515395f91bd1fee19f32\` FOREIGN KEY (\`organizationId\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invitation\` ADD CONSTRAINT \`FK_52be39dc735faf622b6da54f6d8\` FOREIGN KEY (\`inviteesId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_dfda472c0af7812401e592b6a61\` FOREIGN KEY (\`organizationId\`) REFERENCES \`organization\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`organization\` ADD CONSTRAINT \`FK_67c515257c7a4bc221bb1857a39\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`practice\` ADD CONSTRAINT \`FK_339eb137c260f5af891453e4312\` FOREIGN KEY (\`organizationId\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`integration\` ADD CONSTRAINT \`FK_accfc68dc6ff9bb247dbbac2eb5\` FOREIGN KEY (\`practiceId\`) REFERENCES \`practice\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`integration\` ADD CONSTRAINT \`FK_cacfc777ec2e3b2c1f76d35ed3c\` FOREIGN KEY (\`providerConfigurationId\`) REFERENCES \`provider_configuration\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`identifier\` ADD CONSTRAINT \`FK_44fc6f44c74db086682e47d0162\` FOREIGN KEY (\`patientId\`) REFERENCES \`patient\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_3a95130e274a02ac967c766a8d7\` FOREIGN KEY (\`patientId\`) REFERENCES \`patient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_9b27855a9c2ade186e5c55d1ec3\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_390909aee7a097d91671c4c4ec3\` FOREIGN KEY (\`veterinarianId\`) REFERENCES \`veterinarian\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_d2609990a0960f90affa1784096\` FOREIGN KEY (\`integrationId\`) REFERENCES \`integration\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`report\` ADD CONSTRAINT \`FK_d4bbe7d58680583199be1d4fbf6\` FOREIGN KEY (\`patientId\`) REFERENCES \`patient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`report\` ADD CONSTRAINT \`FK_b7ab480d27c4e7f614b956f4926\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`test_result\` ADD CONSTRAINT \`FK_3118d0493be18819bdc3508a92c\` FOREIGN KEY (\`reportId\`) REFERENCES \`report\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`observation\` ADD CONSTRAINT \`FK_bfcc57ce48520c15b942113e6f9\` FOREIGN KEY (\`testResultId\`) REFERENCES \`test_result\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_tests_test\` ADD CONSTRAINT \`FK_73df8c37f4a4c6dd5705f887272\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`order_tests_test\` ADD CONSTRAINT \`FK_09c10f16b9970e23164fa201b9d\` FOREIGN KEY (\`testCode\`) REFERENCES \`test\`(\`code\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_tests_test\` DROP FOREIGN KEY \`FK_09c10f16b9970e23164fa201b9d\``);
        await queryRunner.query(`ALTER TABLE \`order_tests_test\` DROP FOREIGN KEY \`FK_73df8c37f4a4c6dd5705f887272\``);
        await queryRunner.query(`ALTER TABLE \`observation\` DROP FOREIGN KEY \`FK_bfcc57ce48520c15b942113e6f9\``);
        await queryRunner.query(`ALTER TABLE \`test_result\` DROP FOREIGN KEY \`FK_3118d0493be18819bdc3508a92c\``);
        await queryRunner.query(`ALTER TABLE \`report\` DROP FOREIGN KEY \`FK_b7ab480d27c4e7f614b956f4926\``);
        await queryRunner.query(`ALTER TABLE \`report\` DROP FOREIGN KEY \`FK_d4bbe7d58680583199be1d4fbf6\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_d2609990a0960f90affa1784096\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_390909aee7a097d91671c4c4ec3\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_9b27855a9c2ade186e5c55d1ec3\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_3a95130e274a02ac967c766a8d7\``);
        await queryRunner.query(`ALTER TABLE \`identifier\` DROP FOREIGN KEY \`FK_44fc6f44c74db086682e47d0162\``);
        await queryRunner.query(`ALTER TABLE \`integration\` DROP FOREIGN KEY \`FK_cacfc777ec2e3b2c1f76d35ed3c\``);
        await queryRunner.query(`ALTER TABLE \`integration\` DROP FOREIGN KEY \`FK_accfc68dc6ff9bb247dbbac2eb5\``);
        await queryRunner.query(`ALTER TABLE \`practice\` DROP FOREIGN KEY \`FK_339eb137c260f5af891453e4312\``);
        await queryRunner.query(`ALTER TABLE \`organization\` DROP FOREIGN KEY \`FK_67c515257c7a4bc221bb1857a39\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_dfda472c0af7812401e592b6a61\``);
        await queryRunner.query(`ALTER TABLE \`invitation\` DROP FOREIGN KEY \`FK_52be39dc735faf622b6da54f6d8\``);
        await queryRunner.query(`ALTER TABLE \`invitation\` DROP FOREIGN KEY \`FK_5c00d7d515395f91bd1fee19f32\``);
        await queryRunner.query(`ALTER TABLE \`provider_configuration\` DROP FOREIGN KEY \`FK_db6ee5c00fda6995bc9bb7f8992\``);
        await queryRunner.query(`DROP INDEX \`IDX_09c10f16b9970e23164fa201b9\` ON \`order_tests_test\``);
        await queryRunner.query(`DROP INDEX \`IDX_73df8c37f4a4c6dd5705f88727\` ON \`order_tests_test\``);
        await queryRunner.query(`DROP TABLE \`order_tests_test\``);
        await queryRunner.query(`DROP TABLE \`observation\``);
        await queryRunner.query(`DROP TABLE \`test_result\``);
        await queryRunner.query(`DROP INDEX \`REL_b7ab480d27c4e7f614b956f492\` ON \`report\``);
        await queryRunner.query(`DROP TABLE \`report\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`veterinarian\``);
        await queryRunner.query(`DROP TABLE \`test\``);
        await queryRunner.query(`DROP TABLE \`identifier\``);
        await queryRunner.query(`DROP TABLE \`patient\``);
        await queryRunner.query(`DROP TABLE \`client\``);
        await queryRunner.query(`DROP TABLE \`integration\``);
        await queryRunner.query(`DROP TABLE \`practice\``);
        await queryRunner.query(`DROP INDEX \`REL_67c515257c7a4bc221bb1857a3\` ON \`organization\``);
        await queryRunner.query(`DROP INDEX \`IDX_b0bb8ad506308a11084bbd5eb2\` ON \`organization\``);
        await queryRunner.query(`DROP INDEX \`IDX_5440f62ba0d7f641510d5441fc\` ON \`organization\``);
        await queryRunner.query(`DROP TABLE \`organization\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`invitation\``);
        await queryRunner.query(`DROP TABLE \`provider_configuration\``);
        await queryRunner.query(`DROP INDEX \`IDX_59a7fac47adbdb902003abdf8f\` ON \`event_subscription\``);
        await queryRunner.query(`DROP TABLE \`event_subscription\``);
    }

}
