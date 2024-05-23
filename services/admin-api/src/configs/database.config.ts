import { registerAs } from '@nestjs/config';

import { IConfigs } from '@/common/interfaces/configs.interface';

export default registerAs('database', (): IConfigs['database'] => ({
  ssl: process.env.AP_DB_SSL === 'true',
  host: process.env.AP_DB_HOST || 'localhost',
  port: process.env.AP_DB_PORT || 5432,
  name: process.env.AP_DB_NAME || 'postgres',
  username: process.env.AP_DB_USERNAME || 'postgres',
  password: process.env.AP_DB_PASSWORD || 'postgres',
  schema: process.env.AP_DB_SCHEMA || 'public',
  isLoggingEnable: process.env.AP_DB_LOGS === 'true'
}));
