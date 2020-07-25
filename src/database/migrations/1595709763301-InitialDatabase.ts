import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialDatabase1595709763301 implements MigrationInterface {
    name = 'InitialDatabase1595709763301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `name` varchar(50) NOT NULL, `age` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `department_id` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `department` (`id` varchar(36) NOT NULL, `name` varchar(200) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_afd2c87bee70dd5557f48911e66` FOREIGN KEY (`department_id`) REFERENCES `department`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_afd2c87bee70dd5557f48911e66`");
        await queryRunner.query("DROP TABLE `department`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
