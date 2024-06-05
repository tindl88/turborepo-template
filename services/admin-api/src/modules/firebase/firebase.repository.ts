import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';

@Injectable()
export class FirebaseRepository {
  db: FirebaseFirestore.Firestore;

  constructor(@Inject('FIREBASE_APP') private readonly firebaseApp: app.App) {
    this.db = firebaseApp.firestore();
  }
}
