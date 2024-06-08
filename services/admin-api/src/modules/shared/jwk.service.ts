import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

@Injectable()
export class JwkService {
  private client: jwksClient.JwksClient;

  constructor(uri: string) {
    this.client = jwksClient({ jwksUri: uri });
  }

  async getPublicKey(kid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.getSigningKey(kid, (err, key) => {
        if (err) {
          reject(err);
        } else {
          const publicKey = key.getPublicKey();

          resolve(publicKey);
        }
      });
    });
  }

  async verifyIdToken(token: string) {
    const decoded = jwt.decode(token, { complete: true });

    if (!decoded) {
      throw new Error('Token decoding failed');
    }

    const publicKey = await this.getPublicKey(decoded.header.kid);
    const verifiedPayload = jwt.verify(token, publicKey, { algorithms: ['RS256'] });

    return verifiedPayload;
  }
}
