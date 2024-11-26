import { isNotFound } from '../api';

describe('isNotFound', () => {
  it('should return true if the data is a string and equals "Not found"', () => {
    const result = isNotFound('Not found');
    expect(result).toBe(true);
  });

  it('should return false if the data is a string but does not equal "Not found"', () => {
    const result = isNotFound('Some other string');
    expect(result).toBe(false);
  });

  it('should return false if the data is not a string', () => {
    const result = isNotFound(123);
    expect(result).toBe(false);
  });

  it('should return false if the data is an empty string', () => {
    const result = isNotFound('');
    expect(result).toBe(false);
  });

  it('should return false if the data is undefined', () => {
    const result = isNotFound(undefined);
    expect(result).toBe(false);
  });

  it('should return false if the data is null', () => {
    const result = isNotFound(null);
    expect(result).toBe(false);
  });

  it('should return false if the data is an object', () => {
    const result = isNotFound({});
    expect(result).toBe(false);
  });

  it('should return false if the data is an array', () => {
    const result = isNotFound(['Not found']);
    expect(result).toBe(false);
  });
});
