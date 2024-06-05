import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

import { IConfigs } from '@/common/interfaces/configs.interface';

@Injectable()
export class FirebaseService {
  constructor(private configService: ConfigService<IConfigs>) {}

  async verifyIdToken(token: string) {
    const verifyTokenRes = await admin.auth().verifyIdToken(token, true);

    return verifyTokenRes;
  }
}
