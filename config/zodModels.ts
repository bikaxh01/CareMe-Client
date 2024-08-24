import { z } from "zod";

export const SignUpFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Username must be at least 6 characters.",
  }),
  email: z.string().email({
    message: "Invalid Email",
  }),
  phone: z.string().length(10, {
    message: "Invalid Phone Number.",
  }),

  dateOfBirth: z.date({
    required_error: "DOB is required!.",
  }),
  gender: z.string({
    message: "Please select gender",
  }),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  documentNumber: z.string({ message: "Document ID is required" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password should at least 6 character" }),
  password: z
    .string()
    .min(6, { message: "confirm password should at least 6 character" }),
});

export const SignInFormSchema = z.object({
  email: z.string().email({
    message: "Invalid Email",
  }),
  password: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
});
