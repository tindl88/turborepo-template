import { MigrationInterface, QueryRunner } from 'typeorm';

const schema = process.env.AP_DB_SCHEMA;

export class AddUserPreferenceLanguageAndTheme1708410745090 implements MigrationInterface {
  name = 'AddUserPreferenceLanguageAndTheme1708410745090';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "${schema}"."user_preferences_language_enum" AS ENUM('vi-vn', 'en-us')`);
    await queryRunner.query(`CREATE TYPE "${schema}"."user_preferences_theme_enum" AS ENUM('dark', 'light', 'custom')`);
    await queryRunner.query(
      `CREATE TABLE "user_preferences" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "language" "${schema}"."user_preferences_language_enum" NOT NULL DEFAULT 'en-us', "theme" "${schema}"."user_preferences_theme_enum" NOT NULL DEFAULT 'dark', CONSTRAINT "PK_0c6a9e02ece757cb0f4e5e0ea77" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "preference_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_562dd99f25c312c0424128b3f72" UNIQUE ("preference_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_562dd99f25c312c0424128b3f72" FOREIGN KEY ("preference_id") REFERENCES "user_preferences"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_562dd99f25c312c0424128b3f72"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_562dd99f25c312c0424128b3f72"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "preference_id"`);
    await queryRunner.query(`DROP TABLE "user_preferences"`);
    await queryRunner.query(`DROP TYPE "${schema}"."user_preferences_theme_enum"`);
    await queryRunner.query(`DROP TYPE "${schema}"."user_preferences_language_enum"`);
  }
}
