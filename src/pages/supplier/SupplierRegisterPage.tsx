import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'

export function SupplierRegisterPage() {
  const [companyName, setCompanyName] = useState('')
  const [contactName, setContactName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // 1. Sign up
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: contactName, display_name: contactName } },
    })
    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    // 2. Immediately sign in to get an active session
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError || !signInData.user) {
      setError('Account aangemaakt. Controleer je e-mail om te bevestigen, dan kan je inloggen.')
      setLoading(false)
      return
    }

    const userId = signInData.user.id

    // 3. Create supplier record with active session
    const { error: supplierError } = await supabase.from('suppliers').insert({
      user_id: userId,
      company_name: companyName,
      contact_name: contactName,
      email,
      phone: phone || null,
      active: true,
      verified: false,
    })

    setLoading(false)

    if (supplierError) {
      setError(`Supplier fout: ${supplierError.message} (code: ${supplierError.code})`)
      return
    }

    navigate('/supplier/onboarding')
  }

  return (
    <div className="flex min-h-screen">
      {/* Left — form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="inline-block">
            <img src="/logo.png" alt="Planora" className="h-8" />
          </Link>
          <div className="mt-6 inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
            Installateurportaal
          </div>
          <h1 className="mt-4 text-2xl font-bold text-neutral-900">Word partner</h1>
          <p className="mt-2 text-sm text-neutral-500">
            Registreer gratis en ontvang projectaanvragen in jouw regio.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {error && (
              <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>
            )}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-neutral-700">Bedrijfsnaam</label>
              <input
                id="company"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-neutral-700">Contactpersoon</label>
              <input
                id="contact"
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
                className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">E-mail</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
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
                className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700">Wachtwoord</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
              <p className="mt-1 text-xs text-neutral-400">Minimaal 8 tekens</p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary-700 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Bezig...' : 'Gratis registreren'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-neutral-500">
            Al een partner?{' '}
            <Link to="/supplier/login" className="font-semibold text-primary-600 hover:text-primary-700">
              Inloggen
            </Link>
          </p>
        </div>
      </div>

      {/* Right — dark panel */}
      <div className="hidden bg-gradient-to-br from-primary-700 to-primary-900 lg:flex lg:flex-1 lg:items-center lg:justify-center">
        <div className="max-w-md text-center px-8">
          <img src="/icon-white.png" alt="" className="mx-auto h-16 mb-8 opacity-80" />
          <h2 className="text-2xl font-bold text-white">Word Planora Partner</h2>
          <p className="mt-4 text-primary-300">
            Ontvang kwalitatieve projectaanvragen, beheer offertes en groei je bedrijf. 100% gratis registreren.
          </p>
          <div className="mt-8 space-y-3 text-left">
            <div className="flex items-center gap-3 text-primary-200">
              <svg className="h-5 w-5 text-accent-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Geen registratiekosten
            </div>
            <div className="flex items-center gap-3 text-primary-200">
              <svg className="h-5 w-5 text-accent-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Alleen relevante leads
            </div>
            <div className="flex items-center gap-3 text-primary-200">
              <svg className="h-5 w-5 text-accent-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Gratis offertebeheer dashboard
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
