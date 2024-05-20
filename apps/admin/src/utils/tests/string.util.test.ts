import { getShortName, toSlug } from '../string.util';

describe('getShortName function', () => {
  it('should return the initials of a name with one word', () => {
    const name = 'John';

    const result = getShortName(name);

    expect(result).toBe('J');
  });

  it('should return the initials of a name with multiple words', () => {
    const name = 'John Doe';

    const result = getShortName(name);

    expect(result).toBe('JD');
  });

  it('should return first 2 world if a name more than 2 words', () => {
    const name = 'John Doe Smith';

    const result = getShortName(name);

    expect(result).toBe('JD');
  });

  it("should return 'A' when no name is provided", () => {
    const result = getShortName();

    expect(result).toBe('A');
  });
});

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
