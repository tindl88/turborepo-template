import { registerAs } from '@nestjs/config';

import { IConfigs } from '@/common/interfaces/configs.interface';

export default registerAs('email', (): IConfigs['email'] => ({
  host: process.env.AP_EMAIL_HOST,
  port: process.env.AP_EMAIL_PORT || 587,
  secure: process.env.AP_EMAIL_SECURE === 'true',
  username: process.env.AP_EMAIL_USERNAME,
  password: process.env.AP_EMAIL_PASSWORD
}));
