import { toCurrency } from '../currency.util';

describe('Currency Util', () => {
  describe('toCurrency', () => {
    test('should return a formatted price string with default values', () => {
      const price = 1000;

      const result = toCurrency(price);

      expect(result).toBe('1.000');
    });

    test('should return a formatted price string with a negative price value', () => {
      const price = -1000;

      const result = toCurrency(price);

      expect(result).toBe('-1.000');
    });

    test('should return a formatted price string with a zero price value', () => {
      const price = 0;

      const result = toCurrency(price);

      expect(result).toBe('0');
    });

    test('should return a formatted price string with a custom style', () => {
      const price = 1000;

      const result = toCurrency(price, 'vi-VN', 'VND', 'percent');

      expect(result).toBe('100.000%');
    });

    test('should return a formatted price string with a custom locale', () => {
      const price = 1000;

      const result = toCurrency(price, 'en-US', 'USD');

      expect(result).toBe('1,000');
    });
  });
});
