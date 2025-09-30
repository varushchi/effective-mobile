import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(['USER', 'ADMIN']).optional()
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})
