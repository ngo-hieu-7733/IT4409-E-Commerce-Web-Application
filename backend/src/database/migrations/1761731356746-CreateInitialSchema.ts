import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialSchema1761731356746 implements MigrationInterface {
    name = 'CreateInitialSchema1761731356746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, \`address\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`tokenVersion\` int NOT NULL DEFAULT '1', \`role\` enum ('user', 'store', 'admin') NOT NULL DEFAULT 'user', \`mustChangePassword\` tinyint NOT NULL DEFAULT 0, \`quota\` int NOT NULL DEFAULT '0', \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_8e1f623798118e629b46a9e629\` (\`phone\`), UNIQUE INDEX \`IDX_ed00bef8184efd998af767e89b\` (\`email\`, \`role\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ed00bef8184efd998af767e89b\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_8e1f623798118e629b46a9e629\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
