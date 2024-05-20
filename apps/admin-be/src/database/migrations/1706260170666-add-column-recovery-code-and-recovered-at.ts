import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnRecoveryCodeAndRecoveredAt1706260170666 implements MigrationInterface {
  name = 'AddColumnRecoveryCodeAndRecoveredAt1706260170666';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "recovery_code" character varying`);
    await queryRunner.query(`ALTER TABLE "users" ADD "recovered_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "recovered_at"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "recovery_code"`);
  }
}
