import { registerAs } from '@nestjs/config';

import { IConfigs } from '@/common/interfaces/configs.interface';

export default registerAs('app', (): IConfigs['app'] => ({
  host: process.env.AP_HOST,
  port: process.env.AP_PORT || 3500,
  isDocumentationEnabled: process.env.AP_DOCUMENTATION_ENABLED === 'true'
}));
