export type OAuthGoogleResponse = {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  nonce: string;
  name: string;
  picture: string;
  given_name: string;
  iat: number;
  exp: number;
};

export type OAuthFacebookLimitedResponse = {
  iss: string;
  aud: string;
  sub: string;
  iat: number;
  exp: number;
  jti?: string;
  nonce: string;
  email: string;
  given_name: string;
  middle_name?: string;
  family_name?: string;
  name: string;
  picture: string;
};

export type OAuthFacebookResponse = {
  id: string;
  name: string;
  email: string;
  picture: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
};

export type OAuthAppleResponse = {
  iss: string;
  aud: string;
  exp: number;
  iat: number;
  sub: string;
  nonce: string;
  c_hash: string;
  email: string;
  email_verified: boolean;
  is_private_email: boolean;
  auth_time: number;
  nonce_supported: boolean;
  real_user_status?: number;
};

export type OAuthProfile = {
  sub: string;
  email: string;
  name: string;
  picture: string;
};
