import { z } from "zod";

export const eventSchema = z.object({
  eventName: z.string().min(1, "Event name is required"),
  eventDescription: z.string().min(1, "Event Description is required"),
  organizerName: z.string().min(1, "Organizer name is required"),
  email: z.string().email("Valid email is required"),
  contact: z
    .string()
    .min(7, "Contact number must be at least 7 digits")
    .max(15, "Contact number must be at most 15 digits"),
  eventLocation: z.string().min(1, "Event location is required"),
  volunteerCapacity: z
    .number({ invalid_type_error: "Volunteer capacity must be a number" })
    .min(1, "Volunteer capacity must be at least 1"),
  registrationLink: z.string().url("Must be a valid URL").optional(),
});
