import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

import { SnakeNamingStrategy } from '@/common/utils/snake-naming-strategy.util';

dotenv.config({ path: path.join(__dirname, `../../.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`) });

const options: DataSourceOptions = {
  type: 'postgres',
  ssl: process.env.AP_DB_SSL === 'true',
  host: process.env.AP_DB_HOST,
  port: Number(process.env.AP_DB_PORT),
  username: process.env.AP_DB_USERNAME,
  password: process.env.AP_DB_PASSWORD,
  database: process.env.AP_DB_NAME,
  schema: process.env.AP_DB_SCHEMA,
  entities: [path.join(__dirname, '../modules/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../database/seeds/*{.ts,.js}')],
  migrationsTableName: 'seeds_lock',
  namingStrategy: new SnakeNamingStrategy()
};

export const dataSource = new DataSource(options);
