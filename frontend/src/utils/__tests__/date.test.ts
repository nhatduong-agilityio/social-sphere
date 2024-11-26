import { formatDistanceToNow, format, isValid } from 'date-fns';
import { formatDate } from '../date';

jest.mock('date-fns', () => ({
  format: jest.fn(),
  formatDistanceToNow: jest.fn(),
  isValid: jest.fn(),
}));

describe('formatDate', () => {
  const now = new Date();

  it('should return "Invalid date" for an invalid date', () => {
    const invalidDate = 'invalid-date-string';
    (formatDistanceToNow as jest.Mock).mockReturnValue('invalid');
    (format as jest.Mock).mockReturnValue('Invalid date');
    (isValid as jest.Mock).mockReturnValue(false);

    const result = formatDate(invalidDate);
    expect(result).toBe('Invalid date');
  });

  it('should return "time ago" if the date is within the last 24 hours', () => {
    const recentDate = new Date(now.getTime() - 10000);
    (formatDistanceToNow as jest.Mock).mockReturnValue('10 seconds ago');
    (isValid as jest.Mock).mockReturnValue(true);

    const result = formatDate(recentDate.toISOString());
    expect(result).toBe('10 seconds ago');
    expect(formatDistanceToNow).toHaveBeenCalledWith(recentDate, {
      addSuffix: true,
    });
  });

  it('should return formatted date if the date is older than 24 hours', () => {
    const olderDate = new Date(now.getTime() - 100000000);
    (format as jest.Mock).mockReturnValue('August 10 2023, 5:30 PM');
    (isValid as jest.Mock).mockReturnValue(true);

    const result = formatDate(olderDate.toISOString());
    expect(result).toBe('August 10 2023, 5:30 PM');
    expect(format).toHaveBeenCalledWith(olderDate, 'MMMM d yyyy, h:mm a');
  });

  it('should handle edge case for invalid date format gracefully', () => {
    const invalidDate = 'not-a-valid-date';
    (isValid as jest.Mock).mockReturnValue(false);

    const result = formatDate(invalidDate);
    expect(result).toBe('Invalid date');
  });

  it('should return "time ago" correctly when the date is exactly 24 hours ago', () => {
    const exactly24HoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
    (formatDistanceToNow as jest.Mock).mockReturnValue(
      'August 10 2023, 5:30 PM',
    );
    (isValid as jest.Mock).mockReturnValue(true);

    const result = formatDate(exactly24HoursAgo.toISOString());
    expect(result).toBe('August 10 2023, 5:30 PM');
    expect(formatDistanceToNow).toHaveBeenCalledWith(exactly24HoursAgo, {
      addSuffix: true,
    });
  });
});
