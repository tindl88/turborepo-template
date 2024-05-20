import { getSecondBetweenTwoDates } from '../datetime.util';

it('should return the correct number of seconds between two dates', () => {
  const recoveryCodeAt = new Date('2022-01-01T00:00:00');
  const currentDate = new Date('2022-01-01T00:10:00');

  const result = getSecondBetweenTwoDates(recoveryCodeAt, currentDate);

  expect(result).toBe(600);
});
