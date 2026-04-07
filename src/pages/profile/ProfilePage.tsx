import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, User } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase/client'

export function ProfilePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    // For MVP, just show success feedback
    await new Promise((r) => setTimeout(r, 500))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-neutral-900">Mijn profiel</h1>
      <p className="mt-1 text-neutral-500">Beheer je accountgegevens.</p>

      {/* Avatar */}
      <div className="mt-8 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
          <User size={28} className="text-primary-600" />
        </div>
        <div>
          <p className="font-semibold text-neutral-900">{user?.email?.split('@')[0] ?? 'Gebruiker'}</p>
          <p className="text-sm text-neutral-500">{user?.email}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="mt-8 space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700">Naam</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Je volledige naam"
            className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700">E-mail</label>
          <input
            id="email"
            type="email"
            value={user?.email ?? ''}
            disabled
            className="mt-1 w-full rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-500"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">Telefoon</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+32 xxx xx xx xx"
            className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-neutral-700">Stad</label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Antwerpen"
              className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
          <div>
            <label htmlFor="postal" className="block text-sm font-medium text-neutral-700">Postcode</label>
            <input
              id="postal"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="2000"
              className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Opslaan...' : saved ? 'Opgeslagen!' : 'Opslaan'}
        </button>
      </form>

      {/* Logout */}
      <div className="mt-12 border-t border-neutral-100 pt-8">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={16} />
          Uitloggen
        </button>
      </div>
    </div>
  )
}
