import { z } from 'zod';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

export const PictureProfileSchema = z.object({
  bannerProfile: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, 'File size must be less than 3MB')
    .refine((file) => {
      return file ? ACCEPTED_FILE_TYPES.includes(file.type) : true;
    }, 'File must be a PNG, JPEG, or JPG'),
  pictureProfile: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, 'File size must be less than 3MB')
    .refine((file) => {
      return file ? ACCEPTED_FILE_TYPES.includes(file.type) : true;
    }, 'File must be a PNG, JPEG, or JPG'),
});
