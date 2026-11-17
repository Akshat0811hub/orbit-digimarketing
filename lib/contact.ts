import { z } from "zod";
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Enter a valid email address.").max(254),
  company: z.string().trim().max(150),
  service: z.string().min(1, "Choose a service.").max(100),
  budget: z.string().min(1, "Choose a budget range.").max(100),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more (at least 20 characters).")
    .max(5000),
  website: z.string().max(0),
});
export type ContactValues = z.infer<typeof contactSchema>;
