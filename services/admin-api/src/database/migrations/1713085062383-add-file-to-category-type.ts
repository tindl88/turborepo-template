import { MigrationInterface, QueryRunner } from 'typeorm';

const schema = process.env.AP_DB_SCHEMA;

export class AddFileToCategoryType1713085062383 implements MigrationInterface {
  name = 'AddFileToCategoryType1713085062383';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, "unique_name" character varying NOT NULL, "caption" character varying NOT NULL, "ext" character varying NOT NULL, "size" bigint NOT NULL, "mime" character varying NOT NULL, "is_temp" boolean NOT NULL DEFAULT true, "category_id" uuid, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TYPE "${schema}"."categories_type_enum" RENAME TO "categories_type_enum_old"`);
    await queryRunner.query(`CREATE TYPE "${schema}"."categories_type_enum" AS ENUM('uncategorized', 'file')`);
    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "type" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "type" TYPE "${schema}"."categories_type_enum" USING "type"::"text"::"${schema}"."categories_type_enum"`
    );
    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "type" SET DEFAULT 'uncategorized'`);
    await queryRunner.query(`DROP TYPE "${schema}"."categories_type_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "FK_6ca4ba01b61dc707723663a7b25" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_6ca4ba01b61dc707723663a7b25"`);
    await queryRunner.query(`CREATE TYPE "${schema}"."categories_type_enum_old" AS ENUM('uncategorized')`);
    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "type" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "type" TYPE "${schema}"."categories_type_enum_old" USING "type"::"text"::"${schema}"."categories_type_enum_old"`
    );
    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "type" SET DEFAULT 'uncategorized'`);
    await queryRunner.query(`DROP TYPE "${schema}"."categories_type_enum"`);
    await queryRunner.query(`ALTER TYPE "${schema}"."categories_type_enum_old" RENAME TO "categories_type_enum"`);
    await queryRunner.query(`DROP TABLE "files"`);
  }
}
