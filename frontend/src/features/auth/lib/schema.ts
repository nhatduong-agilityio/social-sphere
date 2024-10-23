import { z } from 'zod';

// Constants
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/constants/regex';

export const FormSchema = z.object({
  email: z.string().regex(EMAIL_REGEX, {
    message: 'Please enter a valid email address',
  }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(PASSWORD_REGEX, {
      message: 'Password must include uppercase, lowercase.',
    }),
});
