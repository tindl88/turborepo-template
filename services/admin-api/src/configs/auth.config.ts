import { registerAs } from '@nestjs/config';

import { IConfigs } from '@/common/interfaces/configs.interface';

export default registerAs('auth', (): IConfigs['auth'] => {
  return {
    jwtSecretKey: process.env.AP_JWT_SECRET_KEY,
    jwtExpiresIn: process.env.AP_JWT_EXPIRES_IN,
    jwtRefreshSecretKey: process.env.AP_JWT_REFRESH_SECRET_KEY,
    jwtRefreshExpiresIn: process.env.AP_JWT_REFRESH_EXPIRES_IN,
    facebookClientId: process.env.AP_OAUTH_FACEBOOK_CLIENT_ID,
    facebookClientSecret: process.env.AP_OAUTH_FACEBOOK_CLIENT_SECRET,
    googleClientId: process.env.AP_OAUTH_GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.AP_OAUTH_GOOGLE_CLIENT_SECRET
  };
});
