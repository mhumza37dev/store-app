import { z } from 'zod';
import type { DummyUser } from '@/types/dummy-user';

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

export interface LoginResponse extends DummyUser {
  token: string;
}
