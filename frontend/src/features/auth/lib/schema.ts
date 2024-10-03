import { z } from 'zod';

// Minimum 8 characters, at least one uppercase letter, one lowercase letter.
export const passwordValidation = new RegExp(/^[A-Za-z\d@$!%*?&.]{8,}$/);

export const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(passwordValidation, {
      message: 'Password must include uppercase, lowercase.',
    }),
});
