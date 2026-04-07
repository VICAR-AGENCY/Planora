import { useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { subscribeToMessages, unsubscribe } from '@/lib/supabase/realtime'

interface Message {
  id: string
  project_id: string
  sender_id: string
  content: string
  created_at: string
}

export function useMessages(projectId: string) {
  const queryClient = useQueryClient()
  const channelRef = useRef<ReturnType<typeof subscribeToMessages> | null>(null)

  const query = useQuery({
    queryKey: ['messages', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true })
      if (error) throw error
      return data as Message[]
    },
    enabled: !!projectId,
  })

  useEffect(() => {
    if (!projectId) return

    channelRef.current = subscribeToMessages(projectId, () => {
      queryClient.invalidateQueries({ queryKey: ['messages', projectId] })
    })

    return () => {
      if (channelRef.current) unsubscribe(channelRef.current)
    }
  }, [projectId, queryClient])

  return query
}

export function useSendMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ projectId, content }: { projectId: string; content: string }) => {
      const { data, error } = await supabase
        .from('messages')
        .insert({ project_id: projectId, content })
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: (_data, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ['messages', projectId] })
    },
  })
}
