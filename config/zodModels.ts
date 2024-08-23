import { z } from "zod";

export const FormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Username must be at least 6 characters.",
  }),
  email: z.string().email({
    message: "Invalid Email",
  }),
  phone: z.string().length(10, {
    message: "Invalid Phone Number.",
  }),

  datetime: z.date({
    required_error: "DOB is required!.",
  }),
  gender: z.string({
    message:"Please select gender"
  }),
  country:z.string({message:"Please select country"})
  
});
