import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { OAuthFacebookLimitedResponse, OAuthFacebookResponse } from './interfaces/auth.interface';

import { JwkService } from '../shared/jwk.service';

@Injectable()
export class FacebookService {
  private client: JwkService;

  constructor() {
    this.client = new JwkService('https://limited.facebook.com/.well-known/oauth/openid/jwks/');
  }

  async verifyAuthenticationToken(token: string) {
    const payload = (await this.client.verifyIdToken(token)) as OAuthFacebookLimitedResponse;

    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    };
  }

  private async getAppAccessToken(): Promise<string> {
    const url = `https://graph.facebook.com/oauth/access_token?client_id=${process.env.AP_OAUTH_FACEBOOK_CLIENT_ID}&client_secret=${process.env.AP_OAUTH_FACEBOOK_CLIENT_SECRET}&grant_type=client_credentials`;
    const response = await axios.get(url);

    return response.data.access_token;
  }

  async verifyAccessToken(token: string) {
    try {
      const appAccessToken = await this.getAppAccessToken();
      const response = await axios.get(
        `https://graph.facebook.com/debug_token?input_token=${appAccessToken}&access_token=${token}`
      );
      const data = response.data.data;

      if (!data.is_valid) {
        throw new Error('Access token is not valid');
      }

      const profileResponse = await axios.get(
        `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`
      );
      const profileData = profileResponse.data as OAuthFacebookResponse;

      return {
        sub: profileData.id,
        email: profileData.email,
        name: profileData.name,
        picture: profileData.picture.data.url
      };
    } catch (error) {
      return null;
    }
  }
}
