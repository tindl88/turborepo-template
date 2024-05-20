import { MigrationInterface, QueryRunner } from 'typeorm';

const schema = process.env.AP_DB_SCHEMA;

export class Init1689769078218 implements MigrationInterface {
  name = 'Init1689769078218';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(255) NOT NULL, "slug" character varying(255) NOT NULL, "description" character varying, "body" character varying, CONSTRAINT "UQ_54ddf9075260407dcfdd7248577" UNIQUE ("slug"), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "refresh_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "token" character varying NOT NULL, "replaced_by_token" character varying, "created_by_ip" character varying NOT NULL, "revoked_by_ip" character varying, "revoked_at" TIMESTAMP, "user_id" uuid, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "${schema}"."users_provider_enum" AS ENUM('credentials', 'facebook', 'google')`
    );
    await queryRunner.query(`CREATE TYPE "${schema}"."users_auth_type_enum" AS ENUM('credentials', 'oauth')`);
    await queryRunner.query(`CREATE TYPE "${schema}"."users_gender_enum" AS ENUM('male', 'female', 'other')`);
    await queryRunner.query(
      `CREATE TYPE "${schema}"."users_status_enum" AS ENUM('active', 'inactive', 'deleted', 'blocked', 'not_verified')`
    );
    await queryRunner.query(`CREATE TYPE "${schema}"."users_role_enum" AS ENUM('super_admin', 'admin', 'user')`);
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(255), "email" character varying(255), "avatar" character varying, "phone_number" character varying, "password" character varying, "email_verified" boolean, "locale" character varying, "last_login" TIMESTAMP, "provider_account_id" character varying, "provider" "${schema}"."users_provider_enum" NOT NULL DEFAULT 'credentials', "auth_type" "${schema}"."users_auth_type_enum" NOT NULL DEFAULT 'credentials', "gender" "${schema}"."users_gender_enum" NOT NULL DEFAULT 'male', "status" "${schema}"."users_status_enum" NOT NULL DEFAULT 'inactive', "role" "${schema}"."users_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "${schema}"."users_role_enum"`);
    await queryRunner.query(`DROP TYPE "${schema}"."users_status_enum"`);
    await queryRunner.query(`DROP TYPE "${schema}"."users_gender_enum"`);
    await queryRunner.query(`DROP TYPE "${schema}"."users_auth_type_enum"`);
    await queryRunner.query(`DROP TYPE "${schema}"."users_provider_enum"`);
    await queryRunner.query(`DROP TABLE "refresh_tokens"`);
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}
