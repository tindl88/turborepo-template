import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomService {
  generateCharacter(character: string, length: number) {
    const chars = character;
    let randomValue = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);

      randomValue += chars.charAt(randomIndex);
    }

    return randomValue;
  }

  generateRandomString(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    return this.generateCharacter(characters, length);
  }

  generateRandomNumber(length = 5) {
    const characters = '0123456789';

    return this.generateCharacter(characters, length);
  }
}
