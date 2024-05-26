import { objectToQueryString } from '../querystring.util';

describe('objectToQueryString', () => {
  test('should convert a simple object to query string', () => {
    const obj = { name: 'John', age: 30 };
    const result = objectToQueryString(obj);

    expect(result).toBe('name=John&age=30');
  });

  test('should handle arrays correctly', () => {
    const obj = { name: 'John', hobbies: ['reading', 'gaming'] };
    const result = objectToQueryString(obj);

    expect(result).toBe('name=John&hobbies[0]=reading&hobbies[1]=gaming');
  });

  test('should handle empty objects', () => {
    const obj = {};
    const result = objectToQueryString(obj);

    expect(result).toBe('');
  });

  test('should handle special characters in keys and values', () => {
    const obj = { 'user name': 'John Doe', 'age+years': 30 };
    const result = objectToQueryString(obj);

    expect(result).toBe('user%20name=John%20Doe&age%2Byears=30');
  });

  test('should handle nested arrays correctly', () => {
    const obj = { name: 'John', scores: [10, 20, 30] };
    const result = objectToQueryString(obj);

    expect(result).toBe('name=John&scores[0]=10&scores[1]=20&scores[2]=30');
  });

  test('should handle null and undefined values', () => {
    const obj = { name: 'John', age: null, gender: undefined };
    const result = objectToQueryString(obj);

    expect(result).toBe('name=John&age=null&gender=undefined');
  });

  test('should handle boolean values', () => {
    const obj = { active: true, verified: false };
    const result = objectToQueryString(obj);

    expect(result).toBe('active=true&verified=false');
  });

  test('should handle number values correctly', () => {
    const obj = { id: 123, price: 45.67 };
    const result = objectToQueryString(obj);

    expect(result).toBe('id=123&price=45.67');
  });
});
