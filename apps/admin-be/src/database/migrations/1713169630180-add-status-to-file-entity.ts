import { MigrationInterface, QueryRunner } from 'typeorm';

const schema = process.env.AP_DB_SCHEMA;

export class AddStatusToFileEntity1713169630180 implements MigrationInterface {
  name = 'AddStatusToFileEntity1713169630180';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "${schema}"."files_status_enum" AS ENUM('visibled', 'deleted')`);
    await queryRunner.query(
      `ALTER TABLE "files" ADD "status" "${schema}"."files_status_enum" NOT NULL DEFAULT 'visibled'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "${schema}"."files_status_enum"`);
  }
}
