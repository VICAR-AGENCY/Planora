import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from './useAuth'

export function useSupplier() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['supplier', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*, supplier_categories(*), supplier_regions(*)')
        .eq('user_id', user!.id)
        .single()
      if (error) throw error
      return data
    },
    enabled: !!user?.id,
  })
}

export function useSupplierMatches() {
  const { data: supplier } = useSupplier()

  return useQuery({
    queryKey: ['supplier-matches', supplier?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('matches')
        .select('*, project:projects(*)')
        .eq('supplier_id', supplier!.id)
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
    enabled: !!supplier?.id,
  })
}

export function useSupplierQuotes() {
  const { data: supplier } = useSupplier()

  return useQuery({
    queryKey: ['supplier-quotes', supplier?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quotes')
        .select('*, project:projects(title, city, category)')
        .eq('supplier_id', supplier!.id)
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
    enabled: !!supplier?.id,
  })
}

export function useSupplierStats() {
  const { data: supplier } = useSupplier()

  return useQuery({
    queryKey: ['supplier-stats', supplier?.id],
    queryFn: async () => {
      const [matchesRes, quotesRes] = await Promise.all([
        supabase
          .from('matches')
          .select('status', { count: 'exact' })
          .eq('supplier_id', supplier!.id),
        supabase
          .from('quotes')
          .select('status', { count: 'exact' })
          .eq('supplier_id', supplier!.id),
      ])

      const matches = matchesRes.data ?? []
      const quotes = quotesRes.data ?? []

      return {
        pendingMatches: matches.filter((m) => m.status === 'pending').length,
        activeProjects: matches.filter((m) => m.status === 'accepted').length,
        totalQuotes: quotes.length,
      }
    },
    enabled: !!supplier?.id,
  })
}

export function useUpdateSupplier() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: async (updates: Record<string, unknown>) => {
      const { data, error } = await supabase
        .from('suppliers')
        .update(updates)
        .eq('user_id', user!.id)
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier', user?.id] })
    },
  })
}

export function useSubmitQuote() {
  const queryClient = useQueryClient()
  const { data: supplier } = useSupplier()

  return useMutation({
    mutationFn: async (quote: {
      project_id: string
      total_amount: number
      notes?: string
    }) => {
      const { data, error } = await supabase
        .from('quotes')
        .insert({
          project_id: quote.project_id,
          supplier_id: supplier!.id,
          total_amount: quote.total_amount,
          status: 'submitted',
          parsed_data: quote.notes ? { notes: [quote.notes] } : null,
        })
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier-quotes'] })
      queryClient.invalidateQueries({ queryKey: ['supplier-stats'] })
    },
  })
}

export function useProjectMessages(projectId: string | undefined) {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['messages', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('project_id', projectId!)
        .order('created_at', { ascending: true })
      if (error) throw error
      return data
    },
    enabled: !!projectId && !!user?.id,
    refetchInterval: 10000,
  })
}

export function useSendMessage() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: async ({
      projectId,
      content,
    }: {
      projectId: string
      content: string
    }) => {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          project_id: projectId,
          sender_id: user!.id,
          content,
        })
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['messages', variables.projectId],
      })
    },
  })
}
