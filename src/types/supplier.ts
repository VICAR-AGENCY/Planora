export interface Supplier {
  id: string
  company_name: string
  contact_name: string
  email: string
  phone: string
  regions: string[]
  categories: string[]
  rating: number
  review_count: number
  verified: boolean
  created_at: string
}
