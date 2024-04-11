import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  SECRET_JWT: z.string(),
  URI_DATABASE: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success == false) {
  throw new Error('Some error with env variables');
}

export const env = _env.data;
