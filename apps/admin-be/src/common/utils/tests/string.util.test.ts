import { toSlug } from '../string.util';

describe('toSlug function', () => {
  it('should convert a string to a slug with custom character removal', () => {
    const input = 'This is a Test String';
    const result = toSlug(input);

    expect(result).toBe('this-is-a-test-string');
  });

  it('should handle special characters and spaces', () => {
    const input = 'This@is :;.,*+~!@#^?(){}"\'/[] Special! Characters  & ';
    const result = toSlug(input);

    expect(result).toBe('thisis-special-characters-and');
  });

  it('should handle non-ASCII characters', () => {
    const input = 'Café à Paris';
    const result = toSlug(input);

    expect(result).toBe('cafe-a-paris');
  });
});
