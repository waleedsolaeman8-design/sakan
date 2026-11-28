import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import type { PropertyDetails } from '../types'
import InquiryForm from '../components/InquiryForm'
export default function PropertyDetailsPage() {
  const { id } = useParams()
    const [selectedImage, setSelectedImage] = useState(0)
    const {
    data: property,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => (await api.get<PropertyDetails>(`/properties/${id}`)).data,
  })

  
      return (
    <div className="px-6 py-8 md:px-12">
      {isLoading && <p className="text-slate-500">جاري تحميل العقار...</p>}
      {isError && <p className="text-red-600">تعذّر تحميل العقار.</p>}
           {property && (
        <div className="flex flex-col gap-6">
          <img
            src={property.images[selectedImage]}
            alt={property.title}
            className="h-72 w-full rounded-2xl object-cover md:h-96"
          />
            <div className="flex gap-2 overflow-x-auto">
            {property.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`h-20 w-28 flex-none overflow-hidden rounded-xl ${index === selectedImage ? 'ring-2 ring-emerald-700' : 'opacity-70'}`}
              >
                <img src={image} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_340px]"></div>
          <div className="flex flex-col gap-6"></div>
                    <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                {property.purpose === 'SALE' ? 'للبيع' : 'للإيجار'}
              </span>
              {property.isFeatured && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-800">
                  مميز
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold">{property.title}</h1>
            <p className="text-slate-600">
              {property.neighborhood}، {property.city.nameAr}
            </p>
            <p className="text-3xl font-extrabold text-emerald-700">
              {property.price.toLocaleString('en-US')} د.أ
              {property.purpose === 'RENT' && (
                <span className="text-base font-medium text-slate-600"> / شهرياً</span>
              )}
            </p>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { value: property.bedrooms, label: 'غرف نوم' },
              { value: property.bathrooms, label: 'حمامات' },
              { value: `${property.area} م²`, label: 'المساحة' },
              { value: property.furnished ? 'نعم' : 'لا', label: 'مفروش' },
            ].map((spec) => (
              <div
                key={spec.label}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center"
              >
                <div className="text-2xl font-extrabold text-emerald-700">{spec.value}</div>
                <div className="text-sm text-slate-600">{spec.label}</div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-extrabold">الوصف</h2>
            <p className="leading-loose text-slate-700">{property.description}</p>
          </div>
                    <div className="flex flex-col gap-3">
            <h2 className="text-xl font-extrabold">المرافق</h2>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity) => (
                <span
                  key={amenity.id}
                  className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800"
                >
                  {amenity.nameAr}
                </span>
              ))}
            </div>
            <aside className="flex flex-col gap-4">
                            <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center gap-3">
                  {property.agent.avatarUrl && (
                    <img
                      src={property.agent.avatarUrl}
                      alt={property.agent.name}
                      className="size-14 flex-none rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-lg font-extrabold">{property.agent.name}</p>
                    <p dir="ltr" className="text-right text-sm text-slate-600">
                      {property.agent.phone}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">{property.agent.bio}</p>
                <Link
                  to={`/agents/${property.agent.id}`}
                  className="font-bold text-emerald-700"
                >
                  عرض كل عقارات الوكيل ({property.agent.listingsCount})
                </Link>
              </div>
              <InquiryForm propertyId={property.id} />
            </aside>
          </div>
          </div>

         
            </div>
      )}
    </div>
  )
  
}