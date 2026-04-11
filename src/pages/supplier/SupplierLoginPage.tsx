import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, Wrench, ArrowRight } from 'lucide-react'
import { signInWithEmail, signInWithGoogle } from '@/lib/supabase/auth'
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

              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-4 text-neutral-400">of</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => signInWithGoogle()}
                className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-300 bg-white py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Doorgaan met Google
              </button>

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
