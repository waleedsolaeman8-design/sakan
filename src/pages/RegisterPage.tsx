import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { api } from '../lib/api'
import useAuth from '../hooks/useAuth'
import type { AuthResponse } from '../types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormValues } from '../lib/schemas'
export default function RegisterPage() {
      const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'USER' },
  })
    const navigate = useNavigate()
  const { login } = useAuth()

  const mutation = useMutation({
    mutationFn: async (values: RegisterFormValues) =>
      (await api.post<AuthResponse>('/auth/register', values)).data,
    onSuccess: (data) => {
      login(data.accessToken, data.user)
      toast.success(`أهلاً ${data.user.name}، تم إنشاء حسابك`)
      navigate('/')
    },
    onError: () => {
      toast.error('تعذّر إنشاء الحساب (ربما البريد مستخدم مسبقاً)')
    },
  })

  function onSubmit(values: RegisterFormValues) {
        mutation.mutate(values)
  }
  return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-extrabold">إنشاء حساب</h1>
        <p className="mb-6 mt-1 text-sm text-slate-500">سجّل وابدأ تدور على بيتك أو انشر عقارك</p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                    <div>
            <p className="mb-1.5 text-sm font-bold">نوع الحساب</p>
            <div className="grid grid-cols-2 gap-2">
              <label className="cursor-pointer rounded-xl border border-slate-300 py-2.5 text-center text-sm font-bold has-[:checked]:border-emerald-700 has-[:checked]:bg-emerald-700 has-[:checked]:text-white">
                <input type="radio" value="USER" {...register('role')} className="sr-only" />
                مستخدم
              </label>
              <label className="cursor-pointer rounded-xl border border-slate-300 py-2.5 text-center text-sm font-bold has-[:checked]:border-emerald-700 has-[:checked]:bg-emerald-700 has-[:checked]:text-white">
                <input type="radio" value="AGENT" {...register('role')} className="sr-only" />
                وكيل عقاري
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-bold">
              الاسم الكامل
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-3 outline-none focus:border-emerald-700"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>
                    <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-bold">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              dir="ltr"
              {...register('email')}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-3 outline-none focus:border-emerald-700"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
                    <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-bold">
              رقم الهاتف
            </label>
            <input
              id="phone"
              type="tel"
              dir="ltr"
              placeholder="+962790000000"
              {...register('phone')}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-3 outline-none focus:border-emerald-700"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>
                    <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-bold">
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              dir="ltr"
              {...register('password')}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-3 outline-none focus:border-emerald-700"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
            <button
            type="submit"
            disabled={mutation.isPending}
            className="rounded-xl bg-emerald-700 py-3 font-extrabold text-white disabled:opacity-60"
          >
            {mutation.isPending ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
          </button>
        </form>
                <p className="mt-5 text-center text-sm text-slate-600">
          عندك حساب؟{' '}
          <Link to="/login" className="font-bold text-emerald-700">
            سجّل الدخول
          </Link>
        </p>
      </div>
    </div>
  )
}