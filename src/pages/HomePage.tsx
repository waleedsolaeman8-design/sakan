import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import type { City } from '../types'
import { PROPERTY_TYPES } from '../constants'
export default function HomePage() {
    const [purpose, setPurpose] = useState('SALE')
      const { data: cities } = useQuery({
    queryKey: ['cities'],
    queryFn: async () => (await api.get<City[]>('/cities')).data,
  })
    const [cityId, setCityId] = useState('')
  const [type, setType] = useState('')
    const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams({ purpose })
    if (cityId) params.set('cityId', cityId)
    if (type) params.set('type', type)
    navigate(`/properties?${params}`)
  }
  return (
    <section className="bg-gradient-to-br from-emerald-900 via-emerald-700 to-teal-700 px-12 py-20 text-white">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
        <h1 className="text-5xl font-extrabold leading-tight">
          اعثر على بيتك القادم في الأردن
        </h1>
        <p className="text-lg text-emerald-100">
          شقق وفلل وأراضٍ ومكاتب ومحلات، للبيع أو للإيجار، في عمّان وكل المحافظات.
        </p>
      </div>
                  <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 flex w-full max-w-4xl flex-col gap-4 rounded-2xl bg-white p-5 text-slate-900 shadow-2xl"
      >
              <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPurpose('SALE')}
            className={`rounded-xl px-7 py-2.5 ${purpose === 'SALE' ? 'bg-emerald-700 font-bold text-white' : 'bg-slate-100 font-medium text-slate-700'}`}
          >
            للبيع
          </button>
          <button
            type="button"
            onClick={() => setPurpose('RENT')}
            className={`rounded-xl px-7 py-2.5 ${purpose === 'RENT' ? 'bg-emerald-700 font-bold text-white' : 'bg-slate-100 font-medium text-slate-700'}`}
          >
            للإيجار
          </button>
        </div>
                <div className="flex flex-wrap items-end gap-3">
          <label className="flex min-w-48 flex-1 flex-col gap-1.5 text-sm font-medium text-slate-600">
            المدينة
                        <select
              value={cityId}
              onChange={(e) => setCityId(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white p-3 text-base text-slate-900"
            >
                            <option value="">كل المدن</option>
              {cities?.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.nameAr}
                </option>
              ))}
            </select>
          </label>
                    <label className="flex min-w-48 flex-1 flex-col gap-1.5 text-sm font-medium text-slate-600">
            نوع العقار
                        <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white p-3 text-base text-slate-900"
            >
                            <option value="">كل الأنواع</option>
              {PROPERTY_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </label>
                    <button type="submit" className="rounded-xl bg-emerald-700 px-10 py-3 text-lg font-bold text-white">
            ابحث
          </button>
        </div>
      </form>
    </section>
  )
}