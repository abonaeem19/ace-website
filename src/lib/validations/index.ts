import { z } from "zod";

export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });

export const contactSchema = z.object({
  fullName: z.string().min(2, "الاسم مطلوب"), email: z.string().email("البريد غير صالح"),
  phone: z.string().optional(), subject: z.string().min(2, "الموضوع مطلوب"), message: z.string().min(10, "الرسالة قصيرة جدًا"),
});

export const quoteSchema = z.object({
  fullName: z.string().min(2), companyName: z.string().optional(), email: z.string().email(),
  phone: z.string().optional(), serviceId: z.string().optional(), projectDescription: z.string().min(10),
  budgetRange: z.string().optional(), timeline: z.string().optional(),
});

export const serviceSchema = z.object({
  titleAr: z.string().min(2), titleEn: z.string().min(2), shortDescriptionAr: z.string().min(5),
  shortDescriptionEn: z.string().min(5), descriptionAr: z.string().min(10), descriptionEn: z.string().min(10),
  icon: z.string().default("code"), slug: z.string().min(2), sortOrder: z.number().default(0), isPublished: z.boolean().default(true),
});

export const projectSchema = z.object({
  titleAr: z.string().min(2), titleEn: z.string().min(2), shortDescriptionAr: z.string().min(5),
  shortDescriptionEn: z.string().min(5), descriptionAr: z.string().min(10), descriptionEn: z.string().min(10),
  coverImage: z.string().optional(), projectUrl: z.string().optional(),
  slug: z.string().min(2), sortOrder: z.number().default(0), isPublished: z.boolean().default(true),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;