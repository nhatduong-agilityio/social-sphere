import { convertSecondsToMinutes, formatNumber } from '../number';

describe('formatNumber', () => {
  it('should format numbers greater than or equal to 1 million with "M"', () => {
    expect(formatNumber(1000000)).toBe('1M');
    expect(formatNumber(1500000)).toBe('1.5M');
    expect(formatNumber(1000001)).toBe('1M');
  });

  it('should format numbers greater than or equal to 1 thousand with "K"', () => {
    expect(formatNumber(1000)).toBe('1K');
    expect(formatNumber(1500)).toBe('1.5K');
    expect(formatNumber(9999)).toBe('10K');
  });

  it('should return the number as a string if less than 1000', () => {
    expect(formatNumber(500)).toBe('500');
    expect(formatNumber(99)).toBe('99');
  });

  it('should remove ".0" if the number is an integer after conversion', () => {
    expect(formatNumber(1000)).toBe('1K');
    expect(formatNumber(1000000)).toBe('1M');
  });

  it('should return undefined if the number is negative or zero', () => {
    expect(formatNumber(-1)).toBeUndefined();
  });
});

describe('convertSecondsToMinutes', () => {
  it('should convert seconds to minutes and seconds', () => {
    expect(convertSecondsToMinutes(65)).toBe('1:05');
    expect(convertSecondsToMinutes(120)).toBe('2:00');
    expect(convertSecondsToMinutes(59)).toBe('0:59');
    expect(convertSecondsToMinutes(3600)).toBe('60:00');
  });

  it('should add leading zero for single-digit seconds', () => {
    expect(convertSecondsToMinutes(10)).toBe('0:10');
    expect(convertSecondsToMinutes(5)).toBe('0:05');
  });

  it('should handle zero seconds correctly', () => {
    expect(convertSecondsToMinutes(0)).toBe('0:00');
  });

  it('should handle large numbers correctly', () => {
    expect(convertSecondsToMinutes(3661)).toBe('61:01');
    expect(convertSecondsToMinutes(12345)).toBe('205:45');
  });
});
