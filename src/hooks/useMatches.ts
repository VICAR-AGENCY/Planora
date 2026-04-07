import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

export interface Match {
  id: string
  project_id: string
  supplier_id: string
  status: 'pending' | 'accepted' | 'declined'
  supplier: {
    id: string
    company_name: string
    rating: number
    verified: boolean
  }
  created_at: string
}

export function useMatches(projectId: string) {
  return useQuery({
    queryKey: ['matches', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('matches')
        .select('*, supplier:suppliers(*)')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true })
      if (error) throw error
      return data as Match[]
    },
    enabled: !!projectId,
  })
}
