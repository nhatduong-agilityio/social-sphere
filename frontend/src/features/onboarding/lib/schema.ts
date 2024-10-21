import { z } from 'zod';

// Constants
import { PASSWORD_REGEX, PHONE_NUMBER_REGEX } from '@/constants/regex';

export const EnterAboutInfoSchema = z.object({
  firstName: z.string().min(1, {
    message: 'First name is required.',
  }),
  lastName: z.string().min(1, {
    message: 'Last name is required.',
  }),
  email: z.string().email({
    message: 'Invalid email address.',
  }),
});

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

export const PictureProfileSchema = z.object({
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

// Exp password: MyP@ssw0rd2023
export const SecureAccountSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(PASSWORD_REGEX, {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      }),
    repeatPassword: z.string(),
    phoneNumber: z.string().regex(PHONE_NUMBER_REGEX, {
      message: 'Please enter a valid phone number',
    }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ['repeatPassword'],
  });
