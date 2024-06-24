/* eslint-disable @typescript-eslint/naming-convention */
import { DefaultSession } from 'next-auth';

import { PreferenceEntity } from '@/modules/auth/interfaces/auth.interface';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    preference: PreferenceEntity;
    [key: string]: string;
  }

  interface Account {
    id_token: string;
    access_token: string;
  }

  interface Profile {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    email: string;
    email_verified: string;
    at_hash: string;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    locale: string;
    iat: string;
    exp: string;
    alg: string;
    kid: string;
    typ: string;
  }

  interface Session extends DefaultSession {
    user: User;
    accessToken: string;
    refreshToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    sub: string;
    preference: PreferenceEntity;
    accessToken: string;
    refreshToken: string;
  }
}
