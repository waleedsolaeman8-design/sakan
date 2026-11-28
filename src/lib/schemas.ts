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