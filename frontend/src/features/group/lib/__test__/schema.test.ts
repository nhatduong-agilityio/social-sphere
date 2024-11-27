import { PictureProfileSchema, OverviewSchema } from '../schema';

describe('Schema Validation', () => {
  describe('PictureProfileSchema', () => {
    it('should validate valid file uploads', () => {
      const validFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
      const result = PictureProfileSchema.safeParse({
        banner: validFile,
        pictureProfile: validFile,
      });
      expect(result.success).toBe(true);
    });

    it('should validate when files are optional', () => {
      const result = PictureProfileSchema.safeParse({});
      expect(result.success).toBe(true);
    });

    it('should reject files larger than 3MB', () => {
      const largeFile = new File(['x'.repeat(4 * 1024 * 1024)], 'large.jpg', {
        type: 'image/jpeg',
      });
      const result = PictureProfileSchema.safeParse({
        banner: largeFile,
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid file types', () => {
      const invalidFile = new File([''], 'test.pdf', {
        type: 'application/pdf',
      });
      const result = PictureProfileSchema.safeParse({
        pictureProfile: invalidFile,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('OverviewSchema', () => {
    it('should validate valid overview data', () => {
      const validData = {
        firstName: 'John',
        lastName: 'Doe',
        job: 'Developer',
        bio: 'Test bio',
        location: {
          city: 'New York',
          countryCode: 'US',
        },
      };
      const result = OverviewSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should validate with optional fields', () => {
      const minimalData = {
        firstName: 'John',
        lastName: 'Doe',
        location: {
          city: 'New York',
          countryCode: 'US',
        },
      };
      const result = OverviewSchema.safeParse(minimalData);
      expect(result.success).toBe(true);
    });

    it('should reject missing required fields', () => {
      const invalidData = {
        firstName: '',
        lastName: '',
        location: {
          city: '',
          countryCode: '',
        },
      };
      const result = OverviewSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
