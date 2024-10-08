import { z } from 'zod';

// Constants
import { PASSWORD_REGEX } from '@/constants/regex';

export const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(PASSWORD_REGEX, {
      message: 'Password must include uppercase, lowercase.',
    }),
});
