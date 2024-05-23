import { registerAs } from '@nestjs/config';

import { IConfigs } from '@/common/interfaces/configs.interface';

export default registerAs('redis', (): IConfigs['redis'] => ({
  host: process.env.AP_REDIS_HOST || 'localhost',
  port: process.env.AP_REDIS_PORT || 6379
}));
