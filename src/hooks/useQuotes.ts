import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import type { Quote } from '@/types/quote'

export function useQuotes(projectId: string) {
  return useQuery({
    queryKey: ['quotes', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quotes')
        .select('*, supplier:suppliers(*)')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true })
      if (error) throw error
      return data as (Quote & { supplier: { id: string; company_name: string; rating: number; verified: boolean } })[]
    },
    enabled: !!projectId,
  })
}
