import { MigrationInterface, QueryRunner } from 'typeorm';

const schema = process.env.AP_DB_SCHEMA;

export class AddAppleSignin1717560705036 implements MigrationInterface {
  name = 'AddAppleSignin1717560705036';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TYPE "${schema}"."users_provider_enum" RENAME TO "users_provider_enum_old"`);
    await queryRunner.query(
      `CREATE TYPE "${schema}"."users_provider_enum" AS ENUM('credentials', 'facebook', 'google', 'apple')`
    );
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "provider" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "provider" TYPE "${schema}"."users_provider_enum" USING "provider"::"text"::"${schema}"."users_provider_enum"`
    );
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "provider" SET DEFAULT 'credentials'`);
    await queryRunner.query(`DROP TYPE "${schema}"."users_provider_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "${schema}"."users_provider_enum_old" AS ENUM('credentials', 'facebook', 'google')`
    );
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "provider" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "provider" TYPE "${schema}"."users_provider_enum_old" USING "provider"::"text"::"${schema}"."users_provider_enum_old"`
    );
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "provider" SET DEFAULT 'credentials'`);
    await queryRunner.query(`DROP TYPE "${schema}"."users_provider_enum"`);
    await queryRunner.query(`ALTER TYPE "${schema}"."users_provider_enum_old" RENAME TO "users_provider_enum"`);
  }
}
