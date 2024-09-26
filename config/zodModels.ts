import { Description } from "@radix-ui/react-toast";
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
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
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

export const BookAppointmentSchema = z.object({
  specialist:z.string().min(2,{message:"this field is required"}),
  doctor:z.string().min(2,{message:"this field is required"}),
  date: z.date({
    required_error: " is required!.",
  }),
  time: z.string().min(2,{message:"this field is required"}),
  description: z.string().optional(),
});