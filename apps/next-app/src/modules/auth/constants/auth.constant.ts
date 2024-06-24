import type { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';

import AuthApi from '@/modules/auth/api/auth.api';

import { getRefreshTokenFromHeader } from '../utils/session.util';

export enum AUTH_TYPE {
  CREDENTIALS = 'credentials',
  OAUTH = 'oauth'
}

export enum AUTH_PROVIDER {
  CREDENTIALS = 'credentials',
  FACEBOOK = 'facebook',
  GOOGLE = 'google'
}

export enum AUTH_AUTHENTICATOR {
  SELF_HOSTED = 'self-hosted',
  FIREBASE = 'firebase'
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 365 * 24 * 60 * 60
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    }),
    FacebookProvider({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
      idToken: true,
      jwks_endpoint: 'https://limited.facebook.com/.well-known/oauth/openid/jwks/',
      issuer: 'https://www.facebook.com'
    }),
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async function (credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const { email, password } = credentials;

        try {
          const signInRes = await AuthApi.signIn({ email, password });
          const refreshToken = getRefreshTokenFromHeader(signInRes);

          if (!refreshToken) return null;

          const userData = signInRes.data.data;

          if (userData) {
            return {
              id: userData.user.id,
              name: userData.user.name,
              email: userData.user.email,
              image: userData.user.avatar,
              preference: userData.user.preference,
              accessToken: userData.accessToken,
              refreshToken
            } as unknown as User;
          }
        } catch (error) {
          throw new Error(new Date().getTime().toString());
        }

        return null;
      }
    })
  ],
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      switch (account?.provider) {
        case AUTH_PROVIDER.CREDENTIALS:
          if (user) return true;
          break;
        case AUTH_PROVIDER.GOOGLE:
          if (!account || !profile?.email_verified) return false;

          const gRes = await AuthApi.googleSignIn(AUTH_AUTHENTICATOR.SELF_HOSTED, account.id_token);
          const gRefreshToken = getRefreshTokenFromHeader(gRes);

          if (!gRefreshToken) return false;

          const gUser = gRes.data.data;

          if (gUser) {
            user.id = gUser.user.id;
            user.preference = gUser.user.preference;
            user.accessToken = gUser.accessToken;
            user.refreshToken = gRefreshToken;

            return true;
          }
          break;
        case AUTH_PROVIDER.FACEBOOK:
          if (!account) return false;

          const fRes = await AuthApi.facebookSignIn(AUTH_AUTHENTICATOR.SELF_HOSTED, account.access_token, false);

          const fRefreshToken = getRefreshTokenFromHeader(fRes);

          if (!fRefreshToken) return false;

          const fUser = fRes.data.data;

          if (fUser) {
            user.id = fUser.user.id;
            user.preference = fUser.user.preference;
            user.accessToken = fUser.accessToken;
            user.refreshToken = fRefreshToken;

            return true;
          }
          break;
      }

      return false;
    },
    jwt: async ({ user, token, trigger, session }) => {
      if (user) {
        token.preference = user.preference;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      if (trigger === 'update' && session) {
        token.preference = session.user.preference;
        token.accessToken = session.accessToken;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.sub;
      session.user.preference = token.preference;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return session;
    }
  }
};
