import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, User, Lock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useProfile, useUpdateProfile } from '@/hooks/useProfile'
import { DeleteAccountSection } from '@/components/profile/DeleteAccountSection'
import { supabase } from '@/lib/supabase/client'
import { cn } from '@/lib/utils/cn'

type Tab = 'gegevens' | 'wachtwoord'

export function ProfilePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('gegevens')

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100">
          <User size={24} className="text-primary-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Mijn profiel</h1>
          <p className="text-sm text-neutral-500">{user?.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-neutral-100 p-1 mb-8 w-fit">
        {(['gegevens', 'wachtwoord'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors capitalize',
              tab === t
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700'
            )}
          >
            {t === 'gegevens' ? <User size={14} /> : <Lock size={14} />}
            {t === 'gegevens' ? 'Persoonlijke gegevens' : 'Wachtwoord'}
          </button>
        ))}
      </div>

      {tab === 'gegevens' && <GegevensTab />}
      {tab === 'wachtwoord' && <WachtwoordTab />}

      {/* Danger zone */}
      <div className="mt-10 border-t border-neutral-100 pt-8 space-y-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={16} />
          Uitloggen
        </button>
        <DeleteAccountSection />
      </div>
    </div>
  )
}

function GegevensTab() {
  const { data: profile, isLoading } = useProfile()
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Populate form once profile loads
  useEffect(() => {
    if (profile) {
      setName(profile.full_name ?? '')
      setPhone(profile.phone ?? '')
      setCity(profile.city ?? '')
      setPostalCode(profile.postal_code ?? '')
    }
  }, [profile])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('idle')
    try {
      await updateProfile({
        full_name: name,
        phone: phone || null,
        city: city || null,
        postal_code: postalCode || null,
      })
      setStatus('success')
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-neutral-500 py-8">
        <Loader2 size={16} className="animate-spin" />
        Laden...
      </div>
    )
  }

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
            Volledige naam
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jan Janssen"
            className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-neutral-700 mb-1">E-mail</label>
          <input
            type="email"
            value={profile?.email ?? ''}
            disabled
            className="w-full rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-400 cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-neutral-400">E-mailadres kan niet gewijzigd worden.</p>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
            Telefoon
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0470 12 34 56"
            className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-1">
            Stad
          </label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Antwerpen"
            className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div>
          <label htmlFor="postal" className="block text-sm font-medium text-neutral-700 mb-1">
            Postcode
          </label>
          <input
            id="postal"
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="2000"
            maxLength={4}
            className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50 transition-colors"
        >
          {isPending && <Loader2 size={14} className="animate-spin" />}
          {isPending ? 'Opslaan...' : 'Wijzigingen opslaan'}
        </button>

        {status === 'success' && (
          <span className="flex items-center gap-1.5 text-sm text-green-600">
            <CheckCircle2 size={16} />
            Opgeslagen
          </span>
        )}
        {status === 'error' && (
          <span className="flex items-center gap-1.5 text-sm text-red-600">
            <AlertCircle size={16} />
            Opslaan mislukt
          </span>
        )}
      </div>
    </form>
  )
}

function WachtwoordTab() {
  const [current, setCurrent] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirm, setConfirm] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('idle')
    setErrorMsg('')

    if (newPw.length < 8) {
      setErrorMsg('Nieuw wachtwoord moet minstens 8 tekens bevatten.')
      setStatus('error')
      return
    }
    if (newPw !== confirm) {
      setErrorMsg('Wachtwoorden komen niet overeen.')
      setStatus('error')
      return
    }

    setIsPending(true)
    // Verify current password by re-signing in
    const { data: sessionData } = await supabase.auth.getSession()
    const email = sessionData.session?.user.email
    if (email) {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password: current })
      if (signInError) {
        setErrorMsg('Huidig wachtwoord is onjuist.')
        setStatus('error')
        setIsPending(false)
        return
      }
    }

    const { error } = await supabase.auth.updateUser({ password: newPw })
    setIsPending(false)

    if (error) {
      setErrorMsg(error.message)
      setStatus('error')
    } else {
      setStatus('success')
      setCurrent('')
      setNewPw('')
      setConfirm('')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-sm">
      <div>
        <label htmlFor="current-pw" className="block text-sm font-medium text-neutral-700 mb-1">
          Huidig wachtwoord
        </label>
        <input
          id="current-pw"
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          required
          className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
      </div>

      <div>
        <label htmlFor="new-pw" className="block text-sm font-medium text-neutral-700 mb-1">
          Nieuw wachtwoord
        </label>
        <input
          id="new-pw"
          type="password"
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
          required
          minLength={8}
          className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
        <p className="mt-1 text-xs text-neutral-400">Minimaal 8 tekens.</p>
      </div>

      <div>
        <label htmlFor="confirm-pw" className="block text-sm font-medium text-neutral-700 mb-1">
          Bevestig nieuw wachtwoord
        </label>
        <input
          id="confirm-pw"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className={cn(
            'w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            confirm && confirm !== newPw
              ? 'border-red-300 focus:border-red-400'
              : 'border-neutral-200 focus:border-primary-500'
          )}
        />
        {confirm && confirm !== newPw && (
          <p className="mt-1 text-xs text-red-500">Wachtwoorden komen niet overeen.</p>
        )}
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50 transition-colors"
        >
          {isPending && <Loader2 size={14} className="animate-spin" />}
          {isPending ? 'Bezig...' : 'Wachtwoord wijzigen'}
        </button>

        {status === 'success' && (
          <span className="flex items-center gap-1.5 text-sm text-green-600">
            <CheckCircle2 size={16} />
            Wachtwoord gewijzigd
          </span>
        )}
        {status === 'error' && (
          <span className="flex items-center gap-1.5 text-sm text-red-600">
            <AlertCircle size={16} />
            {errorMsg}
          </span>
        )}
      </div>
    </form>
  )
}
