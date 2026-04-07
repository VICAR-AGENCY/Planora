import { supabase } from './client'
import type { RealtimeChannel } from '@supabase/supabase-js'

export function subscribeToMessages(
  projectId: string,
  onMessage: (payload: unknown) => void
): RealtimeChannel {
  return supabase
    .channel(`messages:${projectId}`)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'messages', filter: `project_id=eq.${projectId}` },
      onMessage
    )
    .subscribe()
}

export function unsubscribe(channel: RealtimeChannel) {
  supabase.removeChannel(channel)
}
