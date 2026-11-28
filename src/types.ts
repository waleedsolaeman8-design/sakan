export type City = {
  id: number
  nameAr: string
  nameEn: string
  slug: string
  imageUrl: string
  propertiesCount: number
}

export type Stats = {
  properties: number
  agents: number
  cities: number
  closedDeals: number
}

export type Property = {
  id: number
  title: string
  type: string
  purpose: string
  price: number
  area: number
  bedrooms: number
  bathrooms: number
  furnished: boolean
  neighborhood: string
  coverImage: string
  isFeatured: boolean
  isFavorite: boolean
  city: { id: number; nameAr: string }
}
export type Paginated<T> = {
  data: T[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}
export type Amenity = {
  id: number
  nameAr: string
  nameEn: string
  icon: string
}

export type PropertyDetails = Property & {
  description: string
  images: string[]
  floor: number | null
  yearBuilt: number | null
  address: string | null
  amenities: Amenity[]
  agent: {
    id: number
    name: string
    phone: string
    avatarUrl: string | null
    email: string
    bio: string
    listingsCount: number
  }
}