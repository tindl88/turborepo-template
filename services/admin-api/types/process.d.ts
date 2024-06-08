declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    // APP
    AP_HOST: string;
    AP_PORT: number;
    // HTTP
    AP_REQUEST_TIMEOUT: number;
    // RATE LIMIT
    AP_THROTTLE_TTL: number;
    AP_THROTTLE_LIMIT: number;
    // CACHE
    AP_CACHE_TIME_TO_LIVE: number;
    // AUTH
    AP_JWT_SECRET_KEY: string;
    AP_JWT_EXPIRES_IN: string;
    AP_JWT_REFRESH_SECRET_KEY: string;
    AP_JWT_REFRESH_EXPIRES_IN: string;
    AP_OAUTH_FACEBOOK_CLIENT_ID: string;
    AP_OAUTH_FACEBOOK_CLIENT_SECRET: string;
    AP_OAUTH_GOOGLE_CLIENT_ID: string;
    AP_OAUTH_GOOGLE_CLIENT_SECRET: string;
    // DOCUMENTATION
    AP_DOCUMENTATION_ENABLED: string;
    // DEFAULT USER
    AP_USER_EMAIL: string;
    AP_USER_PASSWORD: string;
    // EMAIL
    AP_EMAIL_HOST: string;
    AP_EMAIL_PORT: number;
    AP_EMAIL_SECURE: string;
    AP_EMAIL_USERNAME: string;
    AP_EMAIL_PASSWORD: string;
    // DATABASE
    AP_DB_SSL: string;
    AP_DB_HOST: string;
    AP_DB_PORT: number;
    AP_DB_NAME: string;
    AP_DB_USERNAME: string;
    AP_DB_PASSWORD: string;
    AP_DB_SCHEMA: string;
    AP_DB_LOGS: string;
    // REDIS
    AP_REDIS_HOST: string;
    AP_REDIS_PORT: number;
  }
}
