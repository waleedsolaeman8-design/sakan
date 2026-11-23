import { useState, type FormEvent } from 'react'
import { useNavigate,Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import type { City,Stats,Paginated, Property } from '../types'
import { PROPERTY_TYPES } from '../constants'
import PropertyCard from '../components/PropertyCard'
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
    const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => (await api.get<Stats>('/stats')).data,
  })
     const { data: featured, isLoading, isError } = useQuery({
    queryKey: ['properties', 'featured'],
    queryFn: async () =>
      (
        await api.get<Paginated<Property>>('/properties', {
          params: { featured: true, limit: 4 },
        })
      ).data.data,
  })
    const statItems = [
    { value: stats?.properties, label: 'عقار منشور' },
    { value: stats?.agents, label: 'وكيل عقاري' },
    { value: stats?.cities, label: 'مدن' },
    { value: stats?.closedDeals, label: 'صفقة مغلقة' },
  ]
  return (
        <>
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
              <section className="border-b border-slate-200 bg-slate-50 px-6 py-10 md:px-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {statItems.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1 text-center">
              <span className="text-4xl font-extrabold text-emerald-700">{item.value ?? '-'}</span>
              <span className="text-slate-600">{item.label}</span>
            </div>
          ))}
        </div>
      </section>
            <section className="flex flex-col gap-7 px-6 pt-16 pb-6 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-3xl font-extrabold">عقارات مميزة</h2>
            <p className="text-slate-600">اختيارات الفريق من أفضل العروض المنشورة.</p>
          </div>
          <Link to="/properties?featured=true" className="font-bold text-emerald-700">
            عرض الكل
          </Link>
        </div>
                {isLoading && <p className="text-slate-500">جاري تحميل العقارات...</p>}
        {isError && <p className="text-red-600">تعذّر تحميل العقارات، حاول مرة أخرى.</p>}
        {featured?.length === 0 && <p className="text-slate-500">لا توجد عقارات مميزة حالياً.</p>}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured?.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
        </>
  )
}