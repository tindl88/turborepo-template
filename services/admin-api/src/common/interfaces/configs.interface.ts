export interface IConfigs {
  app: {
    host: string;
    port: number;
    isDocumentationEnabled: boolean;
  };
  http: {
    timeout: number;
  };
  database: {
    ssl: boolean;
    host: string;
    port: number;
    name: string;
    username: string;
    password: string;
    schema: string;
    isLoggingEnable: boolean;
  };
  auth: {
    jwtSecretKey: string;
    jwtExpiresIn: string;
    jwtRefreshSecretKey: string;
    jwtRefreshExpiresIn: string;
    facebookClientId: string;
    facebookClientSecret: string;
    googleClientId: string;
    googleClientSecret: string;
  };
  cache: {
    timeToLive: number;
  };
  middlewares: {
    cors: {
      allowOrigin: string | string[];
      allowMethods: string[];
      allowHeaders: string[];
    };
    rateLimit: {
      timeToLive: number;
      limit: number;
    };
  };
  email: {
    host: string;
    port: number;
    secure: boolean;
    username: string;
    password: string;
  };
  redis: {
    host: string;
    port: number;
  };
  firebase: {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
    universe_domain: string;
  };
}
