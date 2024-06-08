import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

import { OAuthGoogleResponse } from './interfaces/auth.interface';

@Injectable()
export class GoogleService {
  private client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client();
  }

  async verifyIdToken(token: string) {
    const ticket = await this.client.verifyIdToken({ idToken: token, audience: process.env.AP_OAUTH_GOOGLE_CLIENT_ID });

    const payload = ticket.getPayload() as OAuthGoogleResponse;

    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    };
  }
}
