import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';

@Injectable()
export class FirebaseService {
  async verifyIdToken(token: string) {
    const auth = admin.auth();

    const res = (await auth.verifyIdToken(token, true)) as DecodedIdToken;
    const user = await auth.getUser(res.uid);

    return {
      // sub: res.sub,
      sub: user.providerData[0].uid,
      email: res.email,
      name: res.name,
      picture: res.picture
    };
  }
}
