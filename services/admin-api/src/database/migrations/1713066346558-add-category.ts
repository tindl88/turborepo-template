import { MigrationInterface, QueryRunner } from 'typeorm';

const schema = process.env.AP_DB_SCHEMA;

export class AddCategory1713066346558 implements MigrationInterface {
  name = 'AddCategory1713066346558';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "${schema}"."categories_type_enum" AS ENUM('uncategorized')`);
    await queryRunner.query(`CREATE TYPE "${schema}"."categories_status_enum" AS ENUM('visibled', 'deleted')`);
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, "type" "${schema}"."categories_type_enum" NOT NULL DEFAULT 'uncategorized', "status" "${schema}"."categories_status_enum" NOT NULL DEFAULT 'visibled', "parent_id" uuid, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_88cea2dc9c31951d06437879b40" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_88cea2dc9c31951d06437879b40"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TYPE "${schema}"."categories_status_enum"`);
    await queryRunner.query(`DROP TYPE "${schema}"."categories_type_enum"`);
  }
}
