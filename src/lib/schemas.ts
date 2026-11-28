import { z } from 'zod'

export const inquirySchema = z.object({
  name: z.string().min(2, 'الاسم مطلوب (حرفان على الأقل)'),
  email: z.email('البريد الإلكتروني غير صحيح'),
  phone: z.string().regex(/^\+?[0-9\s-]{8,15}$/, 'رقم الهاتف غير صحيح'),
  message: z.string().min(10, 'الرسالة قصيرة (10 أحرف على الأقل)'),
})

export type InquiryFormValues = z.infer<typeof inquirySchema>

export const loginSchema = z.object({
  email: z.email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(1, 'كلمة المرور مطلوبة'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export const registerSchema = z.object({
  name: z.string().min(2, 'الاسم مطلوب (حرفان على الأقل)'),
  email: z.email('البريد الإلكتروني غير صحيح'),
  phone: z.string().regex(/^\+?[0-9]{8,15}$/, 'رقم الهاتف غير صحيح (مثال: +962790000000)'),
  password: z
    .string()
    .min(8, 'كلمة المرور 8 أحرف على الأقل')
    .max(64, 'كلمة المرور طويلة (64 حرف كحد أقصى)'),
  role: z.enum(['USER', 'AGENT']),
})

export type RegisterFormValues = z.infer<typeof registerSchema>