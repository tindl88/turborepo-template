import { Injectable } from '@nestjs/common';

import { OAuthAppleResponse } from './interfaces/auth.interface';

import { JwkService } from '../shared/jwk.service';

@Injectable()
export class AppleService {
  private client: JwkService;

  constructor() {
    this.client = new JwkService('https://appleid.apple.com/auth/keys');
  }

  async verifyIdToken(token: string) {
    const payload = (await this.client.verifyIdToken(token)) as OAuthAppleResponse;

    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.is_private_email ? payload.email.split('@')[0] : '',
      picture: ''
    };
  }
}
