import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'

export function CallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const handle = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        navigate('/login', { replace: true })
        return
      }

      const userId = session.user.id
      const params = new URLSearchParams(window.location.search)
      const role = params.get('role')

      // Supplier email confirmatie callback
      if (role === 'supplier') {
        const pending = localStorage.getItem('supplier_pending')
        if (pending) {
          try {
            const { company_name, contact_name, email, phone } = JSON.parse(pending)

            // Maak supplier record aan
            await supabase.from('suppliers').insert({
              user_id: userId,
              company_name: company_name ?? '',
              contact_name: contact_name ?? '',
              email: email ?? session.user.email ?? '',
              phone: phone ?? null,
              active: true,
              verified: false,
            })

            // Update profile role
            await supabase.from('profiles').update({ role: 'supplier' }).eq('id', userId)

            localStorage.removeItem('supplier_pending')
          } catch {
            // Als insert faalt (bijv. duplicate), ga toch door
          }
        } else {
          // Geen pending data maar role=supplier → update role wel
          await supabase.from('profiles').update({ role: 'supplier' }).eq('id', userId)
        }
        navigate('/supplier/onboarding', { replace: true })
        return
      }

      // Normale flow: check of user een supplier record heeft
      const { data: supplier } = await supabase
        .from('suppliers')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle()

      navigate(supplier ? '/supplier/dashboard' : '/app/dashboard', { replace: true })
    }

    handle()
  }, [navigate])

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <img src="/logo.png" alt="Planora" className="h-8 opacity-60" />
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      <p className="text-sm text-neutral-400">Even geduld...</p>
    </div>
  )
}
