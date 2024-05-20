import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import { AxiosResponse } from 'axios';

import { LoginResponse } from '../interfaces/auth.interface';

import AuthApi from '@/modules/auth/api/auth.api';

export enum AUTH_TYPE {
  CREDENTIALS = 'credentials',
  OAUTH = 'oauth'
}

export enum AUTH_PROVIDER {
  CREDENTIALS = 'credentials',
  FACEBOOK = 'facebook',
  GOOGLE = 'google'
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    maxAge: 365 * 24 * 60 * 60
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET
    }),
    FacebookProvider({
      clientId: process.env.NEXT_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.NEXT_FACEBOOK_CLIENT_SECRET
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
          const refreshToken = getRefreshToken(signInRes);

          if (!refreshToken) return null;

          const userData = signInRes.data.data.user;

          if (userData) {
            return {
              id: userData.id,
              name: userData.name,
              email: userData.email,
              image: userData.avatar,
              preference: userData.preference,
              accessToken: userData.accessToken,
              refreshToken
            };
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

          const gRes = await AuthApi.googleSignIn(account.id_token);
          const gRefreshToken = getRefreshToken(gRes);

          if (!gRefreshToken) return false;

          const gUser = gRes.data.data.user;

          if (gUser) {
            user.id = gUser.id;
            user.preference = gUser.preference;
            user.accessToken = gUser.accessToken;
            user.refreshToken = gRefreshToken;

            return true;
          }
          break;
        case AUTH_PROVIDER.FACEBOOK:
          if (!account) return false;

          const fRes = await AuthApi.facebookSignIn(account.access_token);
          const fRefreshToken = getRefreshToken(fRes);

          if (!fRefreshToken) return false;

          const fUser = fRes.data.data.user;

          if (fUser) {
            user.id = fUser.id;
            user.preference = fUser.preference;
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
        token.accessToken = session.user.accessToken;
        token.refreshToken = session.user.refreshToken;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub;
        session.user.preference = token.preference;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
      }

      return session;
    }
  }
};

function getRefreshToken(response: AxiosResponse<LoginResponse>) {
  const refreshTokenNode = response.headers['set-cookie']?.filter(x => x.includes('refreshToken='));
  const refreshToken = refreshTokenNode?.[0]?.split('=')[1]?.split(';')[0];

  return refreshToken;
}
