/* eslint-disable @typescript-eslint/naming-convention */
declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_SITE_URL: string;
    NEXT_PUBLIC_MESSENGER_PAGE_ID: string;
    NEXT_PUBLIC_GOOGLE_TRACKING: string;
    NEXT_PUBLIC_SEGMENT_TRACKING: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_EXPIRES_IN: string;
    NEXT_FACEBOOK_CLIENT_ID: string;
    NEXT_FACEBOOK_CLIENT_SECRET: string;
    NEXT_GOOGLE_CLIENT_ID: string;
    NEXT_GOOGLE_CLIENT_SECRET: string;
  }
}
