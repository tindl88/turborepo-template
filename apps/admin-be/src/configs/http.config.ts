import { registerAs } from '@nestjs/config';

import { IConfigs } from '@/common/interfaces/configs.interface';

export default registerAs('http', (): IConfigs['http'] => ({
  timeout: process.env.AP_REQUEST_TIMEOUT || 120000
}));
