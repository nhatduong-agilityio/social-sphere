import { z } from 'zod';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

export const PictureProfileSchema = z.object({
  banner: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_UPLOAD_SIZE,
      'File size must be less than 3MB',
    )
    .refine(
      (file) => (file ? ACCEPTED_FILE_TYPES.includes(file.type) : true),
      'File must be a PNG, JPEG, or JPG',
    ),
  pictureProfile: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_UPLOAD_SIZE,
      'File size must be less than 3MB',
    )
    .refine(
      (file) => (file ? ACCEPTED_FILE_TYPES.includes(file.type) : true),
      'File must be a PNG, JPEG, or JPG',
    ),
});

export const OverviewSchema = z.object({
  firstName: z.string().min(1, {
    message: 'First name is required.',
  }),
  lastName: z.string().min(1, {
    message: 'Last name is required.',
  }),
  job: z.string().optional(),
  bio: z.string().optional(),
  location: z.object({
    city: z.string(),
    countryCode: z.string(),
  }),
});
