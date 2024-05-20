import { MigrationInterface, QueryRunner } from 'typeorm';

const schema = process.env.AP_DB_SCHEMA;

export class AddAuditLogs1715748358811 implements MigrationInterface {
  name = 'AddAuditLogs1715748358811';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "${schema}"."audit_logs_table_name_enum" AS ENUM('users', 'files', 'posts', 'product', 'categories')`
    );
    await queryRunner.query(`CREATE TYPE "${schema}"."audit_logs_action_enum" AS ENUM('create', 'update', 'delete')`);
    await queryRunner.query(
      `CREATE TABLE "audit_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "table_name" "${schema}"."audit_logs_table_name_enum" NOT NULL, "user_id" character varying NOT NULL, "record_id" character varying NOT NULL, "action" "${schema}"."audit_logs_action_enum" NOT NULL, "old_value" jsonb NOT NULL, "new_value" jsonb NOT NULL, CONSTRAINT "PK_1bb179d048bbc581caa3b013439" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "audit_logs"`);
    await queryRunner.query(`DROP TYPE "${schema}"."audit_logs_action_enum"`);
    await queryRunner.query(`DROP TYPE "${schema}"."audit_logs_table_name_enum"`);
  }
}
