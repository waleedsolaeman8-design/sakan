import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import type { PropertyDetails } from '../types'
export default function PropertyDetailsPage() {
  const { id } = useParams()
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
      {property && <h1 className="text-3xl font-extrabold">{property.title}</h1>}
    </div>
  )
  
}