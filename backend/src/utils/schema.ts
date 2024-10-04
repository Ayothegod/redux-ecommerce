import { z } from "zod";

export const registrationSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(225, { message: "Password must be at most 225 characters long" }),
});

export const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(225, { message: "Password must be at most 225 characters long" }),
});

export const forgotPasswordSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
});

export const resetPasswordSchema = z.object({
  otp: z.string({ required_error: "OTPs required" }).min(6, { message: "OTP cannot be less than 6 digits" }).max(6, { message: "OTP cannot be more than 6 digits." }),
  newPassword: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "New password must be at least 8 characters long" }),
});


