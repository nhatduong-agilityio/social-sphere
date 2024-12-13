import generateRGBDataURL from '../image';

describe('Image Utils', () => {
  describe('generateRGBDataURL', () => {
    it('generates correct base64 data URL for RGB values', () => {
      // Test with black (0, 0, 0)
      expect(generateRGBDataURL(0, 0, 0)).toBe(
        'data:image/gif;base64,R0lGODlhAQABAPAAAAAAAP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
      );

      // Test with white (255, 255, 255)
      expect(generateRGBDataURL(255, 255, 255)).toBe(
        'data:image/gif;base64,R0lGODlhAQABAPAAAP///////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
      );

      // Test with red (255, 0, 0)
      expect(generateRGBDataURL(255, 0, 0)).toBe(
        'data:image/gif;base64,R0lGODlhAQABAPAAAP8AAP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
      );
    });

    it('handles edge cases for RGB values', () => {
      // Test with mid-range values
      expect(generateRGBDataURL(128, 128, 128)).toBe(
        'data:image/gif;base64,R0lGODlhAQABAPAAAICAgP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
      );
    });
  });
});
