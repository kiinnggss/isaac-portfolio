import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Please provide a valid email address")
    .max(150, "Email must be less than 150 characters"),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(150, "Subject must be less than 150 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message must be less than 3000 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const pingQuerySchema = z.object({
  target: z
    .string()
    .min(1, "Target host or IP is required")
    .regex(/^[a-zA-Z0-9.-]+$/, "Invalid hostname or IP address format")
    .default("8.8.8.8"),
  count: z
    .coerce
    .number()
    .int()
    .min(1)
    .max(8)
    .default(4),
});

export const subnetQuerySchema = z.object({
  cidr: z
    .string()
    .regex(
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(3[0-2]|[12]?[0-9])$/,
      "Must be a valid IPv4 CIDR notation (e.g. 192.168.10.0/24)"
    )
    .default("192.168.10.0/24"),
});
