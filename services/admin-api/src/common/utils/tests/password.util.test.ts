import * as bcrypt from 'bcrypt';

import { checkValidPassword, comparePassword, hashPassword } from '../password.util';

it('should hash a plain text password successfully with default salt value', () => {
  const plainTextPassword = 'password';
  const hashedPassword = hashPassword(plainTextPassword);

  expect(hashedPassword).toBeDefined();
  expect(typeof hashedPassword).toBe('string');
});

it('should return true when plain text password and hash match', async () => {
  const hash = await bcrypt.hash('password123', 10);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const result = await comparePassword(hash, 'password123');

  expect(result).toBe(true);
});

it('should return false when plain text password and hash do not match', async () => {
  const hash = await bcrypt.hash('password123', 10);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const result = await comparePassword(hash, 'wrongpassword');

  expect(result).toBe(false);
});

it('should return true when plain text password matches the hash', async () => {
  const hash = await bcrypt.hash('password123', 10);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const result = await checkValidPassword(hash, 'password123');

  expect(result).toBe(true);
});

it('should return false when plain text password does not match the hash', async () => {
  const hash = await bcrypt.hash('password123', 10);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const result = await checkValidPassword(hash, 'wrongpassword');

  expect(result).toBe(false);
});
