import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

// ── Stats ──────────────────────────────────────────────────────────────────

export function useAdminStats() {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      const weekAgoISO = weekAgo.toISOString()

      const [
        { count: totalHomeowners },
        { count: totalSuppliers },
        { count: totalLeads },
        { count: newHomeowners },
        { count: newSuppliers },
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'homeowner'),
        supabase.from('suppliers').select('*', { count: 'exact', head: true }),
        supabase.from('leads').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'homeowner').gte('created_at', weekAgoISO),
        supabase.from('suppliers').select('*', { count: 'exact', head: true }).gte('created_at', weekAgoISO),
      ])

      return {
        totalHomeowners: totalHomeowners ?? 0,
        totalSuppliers: totalSuppliers ?? 0,
        totalLeads: totalLeads ?? 0,
        newHomeowners: newHomeowners ?? 0,
        newSuppliers: newSuppliers ?? 0,
      }
    },
  })
}

// ── Homeowner profiles ─────────────────────────────────────────────────────

export interface AdminUser {
  id: string
  full_name: string | null
  email: string
  phone: string | null
  city: string | null
  postal_code: string | null
  created_at: string
}

export function useAdminUsers() {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, phone, city, postal_code, created_at')
        .eq('role', 'homeowner')
        .order('created_at', { ascending: false })

      if (error) throw error
      return (data ?? []) as AdminUser[]
    },
  })
}

// ── Suppliers ──────────────────────────────────────────────────────────────

export interface AdminSupplier {
  id: string
  company_name: string | null
  contact_name: string | null
  email: string | null
  phone: string | null
  verified: boolean
  active: boolean
  onboarding_completed: boolean | null
  price_category: string | null
  created_at: string
  supplier_regions: { city: string; postal_code_prefix: string }[]
  supplier_categories: { category: string }[]
}

export function useAdminSuppliers() {
  return useQuery({
    queryKey: ['admin', 'suppliers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('suppliers')
        .select(`
          id, company_name, contact_name, email, phone,
          verified, active, onboarding_completed, price_category, created_at,
          supplier_regions(city, postal_code_prefix),
          supplier_categories(category)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      return (data ?? []) as AdminSupplier[]
    },
  })
}
