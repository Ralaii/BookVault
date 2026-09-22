import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.union([
    z.string().email(),
    z.string().min(4)
  ]),

  password: z.string().min(8)
})

export const registerSchema = z.object({
  username: z.string().min(4, "Username must be more than 4 characters").max(20, "Username must not be more than 20 characters"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be more than 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})