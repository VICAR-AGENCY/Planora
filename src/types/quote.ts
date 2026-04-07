export interface Quote {
  id: string
  project_id: string
  supplier_id: string
  status: 'pending' | 'submitted' | 'accepted' | 'rejected'
  total_amount: number | null
  pdf_url: string | null
  parsed_data: ParsedQuote | null
  created_at: string
  updated_at: string
}

export interface ParsedQuote {
  line_items: QuoteLineItem[]
  total_excl_vat: number
  vat_amount: number
  total_incl_vat: number
  warranty_years: number | null
  estimated_duration: string | null
  notes: string[]
}

export interface QuoteLineItem {
  description: string
  quantity: number
  unit_price: number
  total: number
  category: string
}
