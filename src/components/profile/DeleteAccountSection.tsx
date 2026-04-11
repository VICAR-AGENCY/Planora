import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export function DeleteAccountSection() {
  const [open, setOpen] = useState(false)
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleDelete = async () => {
    setLoading(true)
    setError('')

    const { error: rpcError } = await supabase.rpc('delete_own_account')
    if (rpcError) {
      setError('Verwijderen mislukt. Neem contact op via info@planora.be.')
      setLoading(false)
      return
    }

    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6">
      <div className="flex items-start gap-3">
        <AlertTriangle size={20} className="text-red-500 shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-900">Account verwijderen</h3>
          <p className="mt-1 text-sm text-red-700">
            Dit verwijdert je account en alle bijbehorende gegevens permanent. Dit kan niet ongedaan worden gemaakt.
          </p>

          {!open && (
            <button
              onClick={() => setOpen(true)}
              className="mt-4 flex items-center gap-2 rounded-xl border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={14} />
              Account verwijderen
            </button>
          )}

          {open && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-red-800 mb-1">
                  Typ <strong>VERWIJDEREN</strong> om te bevestigen
                </label>
                <input
                  type="text"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="VERWIJDEREN"
                  className="w-full rounded-xl border border-red-300 bg-white px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="flex gap-3">
                <button
                  onClick={() => { setOpen(false); setConfirm(''); setError('') }}
                  className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors"
                >
                  Annuleren
                </button>
                <button
                  onClick={handleDelete}
                  disabled={confirm !== 'VERWIJDEREN' || loading}
                  className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-40 transition-colors"
                >
                  {loading && <Loader2 size={14} className="animate-spin" />}
                  Definitief verwijderen
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
