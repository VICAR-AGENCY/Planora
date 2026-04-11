import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

export interface LeadData {
  name: string
  email: string
  phone?: string
  postal_code?: string
  project_type?: string
  source?: string
  calculator_data?: Record<string, unknown>
}

export function useLeadCapture() {
  return useMutation({
    mutationFn: async (lead: LeadData) => {
      const { error } = await supabase.from('leads').insert({
        name: lead.name,
        email: lead.email,
        phone: lead.phone ?? null,
        postal_code: lead.postal_code ?? null,
        project_type: lead.project_type ?? null,
        source: lead.source ?? null,
        calculator_data: lead.calculator_data ?? null,
      })
      if (error) throw error

      // Optional webhook (configure VITE_LEAD_WEBHOOK_URL in .env)
      const webhookUrl = import.meta.env.VITE_LEAD_WEBHOOK_URL
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
        }).catch(() => {
          // Non-blocking — webhook failure should not break lead capture
        })
      }
    },
  })
}
