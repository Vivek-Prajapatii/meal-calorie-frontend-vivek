import { z } from "zod";

export const registerFormSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),

    last_name: z.string().min(1, "Last name is required"),

    email: z.string().email("Enter a valid email"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[0-9]/, "Password must contain at least one number"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;