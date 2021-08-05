import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1628096862864 implements MigrationInterface {
    name = 'InitialMigration1628096862864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `diagnostic-modality-integration`.`provider_configuration` (`id` char(36) NOT NULL, `diagnosticProviderId` varchar(255) NOT NULL, `providerConfigurationOptions` json NOT NULL, `organizationId` char(36) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `diagnostic-modality-integration`.`invitation` (`id` char(36) NOT NULL, `inviteesId` char(36) NOT NULL, `organizationId` char(36) NOT NULL, `status` enum ('pending', 'accepted') NOT NULL DEFAULT 'pending', `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `diagnostic-modality-integration`.`user` (`id` char(36) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `organizationId` char(36) NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `diagnostic-modality-integration`.`organization` (`id` char(36) NOT NULL, `name` varchar(255) NOT NULL, `testKey` varchar(255) NOT NULL, `prodKey` varchar(255) NOT NULL, `ownerId` char(36) NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_5440f62ba0d7f641510d5441fc` (`testKey`), UNIQUE INDEX `IDX_b0bb8ad506308a11084bbd5eb2` (`prodKey`), UNIQUE INDEX `REL_67c515257c7a4bc221bb1857a3` (`ownerId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `diagnostic-modality-integration`.`practice` (`id` char(36) NOT NULL, `name` varchar(255) NOT NULL, `organizationId` char(36) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `diagnostic-modality-integration`.`integration` (`id` char(36) NOT NULL, `practiceId` char(36) NOT NULL, `providerConfigurationId` char(36) NOT NULL, `integrationOptions` json NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `diagnostic-modality-integration`.`client` (`id` char(36) NOT NULL, `lastName` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `diagnostic-modality-integration`.`patient` (`id` char(36) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `species` varchar(255) NOT NULL, `sex` varchar(255) NOT NULL, `birthdate` varchar(255) NOT NULL, `breed` varchar(255) NOT NULL, `weight` int NOT NULL, `weightUnits` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `diagnostic-modality-integration`.`test` (`code` varchar(255) NOT NULL, PRIMARY KEY (`code`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `diagnostic-modality-integration`.`veterinarian` (`id` char(36) NOT NULL, `lastName` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `diagnostic-modality-integration`.`order` (`id` char(36) NOT NULL, `externalId` varchar(255) NULL, `integrationId` char(36) NOT NULL, `notes` varchar(255) NULL, `technician` varchar(255) NULL, `editable` tinyint NOT NULL DEFAULT 0, `manifestUri` varchar(255) NULL, `submissionUri` varchar(255) NULL, `status` varchar(255) NULL, `devices` json NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `patientId` char(36) NULL, `clientId` char(36) NULL, `veterinarianId` char(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `diagnostic-modality-integration`.`order_tests_test` (`orderId` char(36) NOT NULL, `testCode` varchar(255) NOT NULL, INDEX `IDX_73df8c37f4a4c6dd5705f88727` (`orderId`), INDEX `IDX_09c10f16b9970e23164fa201b9` (`testCode`), PRIMARY KEY (`orderId`, `testCode`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`provider_configuration` ADD CONSTRAINT `FK_db6ee5c00fda6995bc9bb7f8992` FOREIGN KEY (`organizationId`) REFERENCES `diagnostic-modality-integration`.`organization`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`invitation` ADD CONSTRAINT `FK_5c00d7d515395f91bd1fee19f32` FOREIGN KEY (`organizationId`) REFERENCES `diagnostic-modality-integration`.`organization`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`invitation` ADD CONSTRAINT `FK_52be39dc735faf622b6da54f6d8` FOREIGN KEY (`inviteesId`) REFERENCES `diagnostic-modality-integration`.`user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`user` ADD CONSTRAINT `FK_dfda472c0af7812401e592b6a61` FOREIGN KEY (`organizationId`) REFERENCES `diagnostic-modality-integration`.`organization`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`organization` ADD CONSTRAINT `FK_67c515257c7a4bc221bb1857a39` FOREIGN KEY (`ownerId`) REFERENCES `diagnostic-modality-integration`.`user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`practice` ADD CONSTRAINT `FK_339eb137c260f5af891453e4312` FOREIGN KEY (`organizationId`) REFERENCES `diagnostic-modality-integration`.`organization`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`integration` ADD CONSTRAINT `FK_accfc68dc6ff9bb247dbbac2eb5` FOREIGN KEY (`practiceId`) REFERENCES `diagnostic-modality-integration`.`practice`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`integration` ADD CONSTRAINT `FK_cacfc777ec2e3b2c1f76d35ed3c` FOREIGN KEY (`providerConfigurationId`) REFERENCES `diagnostic-modality-integration`.`provider_configuration`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`order` ADD CONSTRAINT `FK_d2609990a0960f90affa1784096` FOREIGN KEY (`integrationId`) REFERENCES `diagnostic-modality-integration`.`integration`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`order` ADD CONSTRAINT `FK_3a95130e274a02ac967c766a8d7` FOREIGN KEY (`patientId`) REFERENCES `diagnostic-modality-integration`.`patient`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`order` ADD CONSTRAINT `FK_9b27855a9c2ade186e5c55d1ec3` FOREIGN KEY (`clientId`) REFERENCES `diagnostic-modality-integration`.`client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`order` ADD CONSTRAINT `FK_390909aee7a097d91671c4c4ec3` FOREIGN KEY (`veterinarianId`) REFERENCES `diagnostic-modality-integration`.`veterinarian`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`order_tests_test` ADD CONSTRAINT `FK_73df8c37f4a4c6dd5705f887272` FOREIGN KEY (`orderId`) REFERENCES `diagnostic-modality-integration`.`order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`order_tests_test` ADD CONSTRAINT `FK_09c10f16b9970e23164fa201b9d` FOREIGN KEY (`testCode`) REFERENCES `diagnostic-modality-integration`.`test`(`code`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`order_tests_test` DROP FOREIGN KEY `FK_09c10f16b9970e23164fa201b9d`");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`order_tests_test` DROP FOREIGN KEY `FK_73df8c37f4a4c6dd5705f887272`");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`order` DROP FOREIGN KEY `FK_390909aee7a097d91671c4c4ec3`");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`order` DROP FOREIGN KEY `FK_9b27855a9c2ade186e5c55d1ec3`");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`order` DROP FOREIGN KEY `FK_3a95130e274a02ac967c766a8d7`");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`order` DROP FOREIGN KEY `FK_d2609990a0960f90affa1784096`");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`integration` DROP FOREIGN KEY `FK_cacfc777ec2e3b2c1f76d35ed3c`");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`integration` DROP FOREIGN KEY `FK_accfc68dc6ff9bb247dbbac2eb5`");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`practice` DROP FOREIGN KEY `FK_339eb137c260f5af891453e4312`");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`organization` DROP FOREIGN KEY `FK_67c515257c7a4bc221bb1857a39`");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`user` DROP FOREIGN KEY `FK_dfda472c0af7812401e592b6a61`");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`invitation` DROP FOREIGN KEY `FK_52be39dc735faf622b6da54f6d8`");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`invitation` DROP FOREIGN KEY `FK_5c00d7d515395f91bd1fee19f32`");
        await queryRunner.query("ALTER TABLE `diagnostic-modality-integration`.`provider_configuration` DROP FOREIGN KEY `FK_db6ee5c00fda6995bc9bb7f8992`");
        await queryRunner.query("DROP INDEX `IDX_09c10f16b9970e23164fa201b9` ON `diagnostic-modality-integration`.`order_tests_test`");
        await queryRunner.query("DROP INDEX `IDX_73df8c37f4a4c6dd5705f88727` ON `diagnostic-modality-integration`.`order_tests_test`");
        await queryRunner.query("DROP TABLE `diagnostic-modality-integration`.`order_tests_test`");
        await queryRunner.query("DROP TABLE `diagnostic-modality-integration`.`order`");
        await queryRunner.query("DROP TABLE `diagnostic-modality-integration`.`veterinarian`");
        await queryRunner.query("DROP TABLE `diagnostic-modality-integration`.`test`");
        await queryRunner.query("DROP TABLE `diagnostic-modality-integration`.`patient`");
        await queryRunner.query("DROP TABLE `diagnostic-modality-integration`.`client`");
        await queryRunner.query("DROP TABLE `diagnostic-modality-integration`.`integration`");
        await queryRunner.query("DROP TABLE `diagnostic-modality-integration`.`practice`");
        await queryRunner.query("DROP INDEX `REL_67c515257c7a4bc221bb1857a3` ON `diagnostic-modality-integration`.`organization`");
        await queryRunner.query("DROP INDEX `IDX_b0bb8ad506308a11084bbd5eb2` ON `diagnostic-modality-integration`.`organization`");
        await queryRunner.query("DROP INDEX `IDX_5440f62ba0d7f641510d5441fc` ON `diagnostic-modality-integration`.`organization`");
        await queryRunner.query("DROP TABLE `diagnostic-modality-integration`.`organization`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `diagnostic-modality-integration`.`user`");
        await queryRunner.query("DROP TABLE `diagnostic-modality-integration`.`user`");
        await queryRunner.query("DROP TABLE `diagnostic-modality-integration`.`invitation`");
        await queryRunner.query("DROP TABLE `diagnostic-modality-integration`.`provider_configuration`");
    }

}
