import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { inquirySchema, type InquiryFormValues } from '../lib/schemas'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../lib/api'
type Props = {
  propertyId: number
}

export default function InquiryForm({ propertyId }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
  })

  const mutation = useMutation({
    mutationFn: (values: InquiryFormValues) =>
      api.post(`/properties/${propertyId}/inquiries`, values),
    onSuccess: () => {
      toast.success('تم إرسال استفسارك بنجاح')
      reset()
    },
    onError: () => {
      toast.error('تعذّر إرسال الاستفسار، حاول مرة أخرى')
    },
  })

  function onSubmit(values: InquiryFormValues) {
    mutation.mutate(values)
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-5"
    >
      <h2 className="text-lg font-extrabold">أرسل استفساراً</h2>
            <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-slate-600">
          الاسم
        </label>
        <input
          id="name"
          {...register('name')}
          className="rounded-xl border border-slate-300 p-3 text-base aria-invalid:border-red-500"
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>
            <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-slate-600">
          البريد الإلكتروني
        </label>
        <input
          id="email"
          type="email"
          dir="ltr"
          {...register('email')}
          className="rounded-xl border border-slate-300 p-3 text-right text-base aria-invalid:border-red-500"
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-sm font-medium text-slate-600">
          رقم الهاتف
        </label>
        <input
          id="phone"
          type="tel"
          dir="ltr"
          {...register('phone')}
          className="rounded-xl border border-slate-300 p-3 text-right text-base aria-invalid:border-red-500"
          aria-invalid={errors.phone ? 'true' : 'false'}
        />
        {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
      </div>
            <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-slate-600">
          الرسالة
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('message')}
          className="rounded-xl border border-slate-300 p-3 text-base aria-invalid:border-red-500"
          aria-invalid={errors.message ? 'true' : 'false'}
        />
        {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
      </div>

           <button
        type="submit"
        disabled={mutation.isPending}
        className="rounded-xl bg-emerald-700 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {mutation.isPending ? 'جاري الإرسال...' : 'إرسال'}
      </button>
    </form>
  )
}