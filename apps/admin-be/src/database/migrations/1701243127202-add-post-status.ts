import { MigrationInterface, QueryRunner } from 'typeorm';

const schema = process.env.AP_DB_SCHEMA;

export class AddPostStatus1701243127202 implements MigrationInterface {
  name = 'AddPostStatus1701243127202';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "${schema}"."posts_status_enum" AS ENUM('published', 'draft', 'deleted')`);
    await queryRunner.query(
      `ALTER TABLE "posts" ADD "status" "${schema}"."posts_status_enum" NOT NULL DEFAULT 'draft'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "${schema}"."posts_status_enum"`);
  }
}
