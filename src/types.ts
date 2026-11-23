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