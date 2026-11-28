import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { api } from '../lib/api'
import type { AuthResponse } from '../types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormValues } from '../lib/schemas'

export default function LoginPage() {
      const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })
    const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (values: LoginFormValues) =>
      (await api.post<AuthResponse>('/auth/login', values)).data,
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken)
      localStorage.setItem('user', JSON.stringify(data.user))
      toast.success(`أهلاً ${data.user.name}`)
      navigate('/')
    },
    onError: () => {
      toast.error('البريد الإلكتروني أو كلمة المرور غير صحيحة')
    },
  })

  function onSubmit(values: LoginFormValues) {
        mutation.mutate(values)
  }
    return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-extrabold">تسجيل الدخول</h1>
        <p className="mb-6 mt-1 text-sm text-slate-500">أهلاً فيك مرة ثانية، دخّل بياناتك</p>
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
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
            {mutation.isPending ? 'جاري الدخول...' : 'دخول'}
          </button>
        </form>
      </div>
    </div>
  )}