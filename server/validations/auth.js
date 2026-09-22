import { z } from "zod";

export const registerSchema = z.object({
  username: z.string()
    .min(3, "Username must be more than 3 characters")
    .max(20, "Username must be at least most 20 characters"),

    email: z.string().email(),

    password: z.string()
    .min(8, "Password must be at least 8 characters")
});

export const loginSchema = z.object({
  identifier: z.union([
    z.string().email("Invalid email format"),
    z.string().min(3, "Username must be at least 3 characteres")
  ]),
  password: z.string().min(8, "Password must be minimum of 8 characters")
})