import { useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import type { Paginated, Property,City } from '../types'
import { usePageTitle } from '../hooks/usePageTitle'
import PropertyCard from '../components/PropertyCard'
import Pagination from '../components/Pagination'
import { PROPERTY_TYPES, SORT_OPTIONS } from '../constants'

export default function PropertiesPage() {
  usePageTitle('العقارات')
  
   const [searchParams, setSearchParams] = useSearchParams()

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    next.delete('page')
    setSearchParams(next)
  }
    function goToPage(newPage: number) {
    const next = new URLSearchParams(searchParams)
    next.set('page', String(newPage))
    setSearchParams(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const purpose = searchParams.get('purpose') ?? ''
  const cityId = searchParams.get('cityId') ?? ''
  const type = searchParams.get('type') ?? ''
  const bedrooms = searchParams.get('bedrooms') ?? ''
  const sort = searchParams.get('sort') ?? 'newest'
 const page = Number(searchParams.get('page') ?? 1)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['properties', searchParams.toString()],
    queryFn: async () =>
      (
        await api.get<Paginated<Property>>('/properties', {
          params: Object.fromEntries(searchParams),
        })
      ).data,
  })
  const { data: cities } = useQuery({
    queryKey: ['cities'],
    queryFn: async () => (await api.get<City[]>('/cities')).data,
  })
   return (
    <div className="px-6 py-8 md:px-12">
      <h1 className="text-3xl font-extrabold">العقارات</h1>
      {data && <p className="mt-1 text-slate-600">تم العثور على {data.meta.total} عقار</p>}
      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[280px_1fr]">
                <aside className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-extrabold">تصفية النتائج</h2>
          <div className="flex gap-2">
            {[
              { value: '', label: 'الكل' },
              { value: 'SALE', label: 'للبيع' },
              { value: 'RENT', label: 'للإيجار' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateParam('purpose', option.value)}
                className={`flex-1 rounded-xl py-2 ${purpose === option.value ? 'bg-emerald-700 font-bold text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                {option.label}
              </button>
            ))}
          </div>
                    <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-600">
            المدينة
            <select
              value={cityId}
              onChange={(e) => updateParam('cityId', e.target.value)}
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
                    <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-600">
            نوع العقار
            <select
              value={type}
              onChange={(e) => updateParam('type', e.target.value)}
              className="rounded-xl border border-slate-300 bg-white p-3 text-base text-slate-900"
            >
              <option value="">كل الأنواع</option>
              {PROPERTY_TYPES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
                    <div className="flex gap-2">
            {[
              { key: 'minPrice', label: 'السعر من', placeholder: '0' },
              { key: 'maxPrice', label: 'إلى', placeholder: 'أي سعر' },
            ].map((field) => (
              <label
                key={field.key}
                className="flex min-w-0 flex-1 flex-col gap-1.5 text-sm font-medium text-slate-600"
              >
                {field.label}
                <input
                  key={searchParams.get(field.key)}
                  type="number"
                  min="0"
                  placeholder={field.placeholder}
                  defaultValue={searchParams.get(field.key) ?? ''}
                  onBlur={(e) => updateParam(field.key, e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-3 text-base text-slate-900"
                />
              </label>
            ))}
          </div>
                    <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-600">
            غرف النوم
            <select
              value={bedrooms}
              onChange={(e) => updateParam('bedrooms', e.target.value)}
              className="rounded-xl border border-slate-300 bg-white p-3 text-base text-slate-900"
            >
              <option value="">أي عدد</option>
              {[1, 2, 3, 4, 5].map((count) => (
                <option key={count} value={count}>
                  {count}+ غرف
                </option>
              ))}
            </select>
          </label>
                    <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-600">
            الترتيب
            <select
              value={sort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="rounded-xl border border-slate-300 bg-white p-3 text-base text-slate-900"
            >
              {SORT_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
                    <button
            type="button"
            onClick={() => setSearchParams({})}
            className="rounded-xl border border-slate-300 py-2.5 font-medium text-slate-700"
          >
            مسح الفلاتر
          </button>
        </aside>
        <div>
                   {isLoading && <p className="text-slate-500">جاري تحميل العقارات...</p>}
          {isError && <p className="text-red-600">تعذّر تحميل العقارات، حاول مرة أخرى.</p>}
          {data?.data.length === 0 && (
            <p className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
              لا توجد عقارات تطابق بحثك. جرّب تغيير الفلاتر.
            </p>
          )}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {data?.data.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
                    {data && (
            <Pagination page={page} totalPages={data.meta.totalPages} onPageChange={goToPage} />
          )}
        </div>
      </div>
    </div>
  )
}