import type { Property } from '../types'
import { Heart } from 'lucide-react'
type Props = {
  property: Property
}

export default function PropertyCard({ property }: Props) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="relative h-44 bg-emerald-100">
        <img
          src={property.coverImage}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
                {property.isFeatured && (
          <span className="absolute start-3 top-3 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">
            مميز
          </span>
        )}
                {property.isFeatured && (
          <span className="absolute start-3 top-3 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">
            مميز
          </span>
        )}
        <button
          type="button"
          aria-label="أضف إلى المفضلة"
          className="absolute end-2.5 top-2.5 flex size-9 items-center justify-center rounded-full bg-white text-slate-600"
        >
          <Heart size={18} />
        </button>
      </div>
            <div className="flex flex-col gap-2.5 p-4">
        <span className="text-xs font-medium text-emerald-700">
          {property.purpose === 'SALE' ? 'للبيع' : 'للإيجار'}
        </span>
        <h3 className="text-lg leading-snug font-bold">{property.title}</h3>
        <span className="text-sm text-slate-600">
          {property.neighborhood}، {property.city.nameAr}
        </span>
                <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-extrabold text-slate-900">
            {property.price.toLocaleString('en-US')} د.أ
          </span>
          {property.purpose === 'RENT' && (
            <span className="text-sm text-slate-600">شهرياً</span>
          )}
        </div>
                <div className="flex gap-4 border-t border-slate-200 pt-2.5 text-sm text-slate-600">
          <span>{property.bedrooms} غرف</span>
          <span>{property.bathrooms} حمامات</span>
          <span>{property.area} م²</span>
        </div>
      </div>
    </article>
  )
}