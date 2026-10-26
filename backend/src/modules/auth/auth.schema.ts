import { z } from "zod";

export const userRegisterSchema = z
  .object({
    name: z.string().min(1, "Name can't be empty").trim().toLowerCase(),
    email: z.email("Email is required").trim().toLowerCase(),
    password: z.string().min(6, "Password must be atleast 6 characters long"),
  })
  .strict();

export const loginUserSchema = z
  .object({
    email: z.email("Email is required").trim().toLowerCase(),
    password: z.string(),
  })
  .strict();

export type RegisterUserInputType = z.infer<typeof userRegisterSchema>;
export type LoginUserInputType = z.infer<typeof loginUserSchema>;
