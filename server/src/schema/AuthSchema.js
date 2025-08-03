import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid Email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
  userName: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name is too long"),
});

export const signinSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid Email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
});
