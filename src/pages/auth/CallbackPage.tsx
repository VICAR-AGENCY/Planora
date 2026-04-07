import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'

export function CallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      navigate(session ? '/app/dashboard' : '/login', { replace: true })
    })
  }, [navigate])

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <img src="/logo.png" alt="Planora" className="h-8 opacity-60" />
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      <p className="text-sm text-neutral-400">Even geduld...</p>
    </div>
  )
}
