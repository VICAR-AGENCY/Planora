import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, Wrench, ArrowRight } from 'lucide-react'
import { signInWithEmail } from '@/lib/supabase/auth'
import { supabase } from '@/lib/supabase/client'

type PageState = 'form' | 'switching' | 'activating'

export function SupplierLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [pageState, setPageState] = useState<PageState>('form')
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: signInError } = await signInWithEmail(email, password)
    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    // Check if this user already has a supplier record
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError('Inloggen mislukt. Probeer opnieuw.')
      setLoading(false)
      return
    }

    const { data: supplier } = await supabase
      .from('suppliers')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle()

    setLoading(false)

    if (supplier) {
      // Already a supplier → go to dashboard
      navigate('/supplier/dashboard')
    } else {
      // Has a consumer account but no supplier record → ask to switch
      setPageState('switching')
    }
  }

  const handleActivate = async () => {
    setPageState('activating')
    setError('')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError('Sessie verlopen. Probeer opnieuw in te loggen.')
      setPageState('switching')
      return
    }

    // Create supplier record
    const { error: insertError } = await supabase.from('suppliers').insert({
      user_id: user.id,
      company_name: '',
      contact_name: user.email ?? '',
      email: user.email ?? '',
      active: true,
      verified: false,
    })

    if (insertError) {
      setError(`Activatie mislukt: ${insertError.message}`)
      setPageState('switching')
      return
    }

    // Update profile role to supplier
    await supabase.from('profiles').update({ role: 'supplier' }).eq('id', user.id)

    navigate('/supplier/onboarding')
  }

  const handleCancel = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen">
      {/* Left — form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="inline-block">
            <img src="/logo.png" alt="Planora" className="h-8" />
          </Link>

          {pageState === 'form' && (
            <>
              <div className="mt-6 inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                Installateurportaal
              </div>
              <h1 className="mt-4 text-2xl font-bold text-neutral-900">Inloggen als installateur</h1>
              <p className="mt-2 text-sm text-neutral-500">
                Beheer je projecten, offertes en berichten.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                {error && (
                  <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>
                )}
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
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-700">Wachtwoord</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-700 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 disabled:opacity-50 transition-colors"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : 'Inloggen'}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-neutral-500">
                Nog geen partner?{' '}
                <Link to="/supplier/registreren" className="font-semibold text-primary-600 hover:text-primary-700">
                  Gratis registreren
                </Link>
              </p>
              <p className="mt-2 text-center text-sm text-neutral-400">
                <Link to="/login" className="hover:text-neutral-600">
                  Inloggen als huiseigenaar →
                </Link>
              </p>
            </>
          )}

          {(pageState === 'switching' || pageState === 'activating') && (
            <>
              <div className="mt-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100">
                <Wrench size={30} className="text-primary-600" />
              </div>
              <h1 className="mt-6 text-2xl font-bold text-neutral-900">Je bent al geregistreerd als particulier</h1>
              <p className="mt-3 text-sm text-neutral-500">
                Dit e-mailadres heeft al een particulier account. Wil je ook als vakman/installateur actief worden op Planora? Dan activeren we een vakman-profiel voor je.
              </p>

              {error && (
                <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>
              )}

              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={handleActivate}
                  disabled={pageState === 'activating'}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-700 py-3 text-sm font-semibold text-white hover:bg-primary-800 disabled:opacity-50 transition-colors"
                >
                  {pageState === 'activating' ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      Ja, activeer vakman-account
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={pageState === 'activating'}
                  className="w-full rounded-xl border border-neutral-200 py-3 text-sm font-semibold text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 transition-colors"
                >
                  Nee, ga naar particulier dashboard
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right — dark panel */}
      <div className="hidden bg-gradient-to-br from-primary-700 to-primary-900 lg:flex lg:flex-1 lg:items-center lg:justify-center">
        <div className="max-w-md text-center px-8">
          <img src="/icon-white.png" alt="" className="mx-auto h-16 mb-8 opacity-80" />
          <h2 className="text-2xl font-bold text-white">Installateur Dashboard</h2>
          <p className="mt-4 text-primary-300">
            Beheer je projectaanvragen, stuur offertes en communiceer met klanten. Alles op één plek.
          </p>
        </div>
      </div>
    </div>
  )
}
