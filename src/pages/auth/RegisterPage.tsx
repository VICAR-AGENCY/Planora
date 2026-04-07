import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUpWithEmail, signInWithGoogle } from '@/lib/supabase/auth'

export function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signUpWithEmail(email, password, name)
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
  }

  const handleGoogleSignUp = async () => {
    setError('')
    const { error } = await signInWithGoogle()
    if (error) {
      setError(error.message)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left — form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="inline-block">
            <img src="/logo.png" alt="Planora" className="h-8" />
          </Link>
          <h1 className="mt-8 text-2xl font-bold text-neutral-900">Account aanmaken</h1>
          <p className="mt-2 text-sm text-neutral-500">
            Start gratis en ontdek hoe Planora je helpt.
          </p>

          {success ? (
            <div className="mt-8 rounded-xl bg-green-50 p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-green-800">Bevestig je e-mail</h3>
              <p className="mt-2 text-sm text-green-700">
                We hebben een bevestigingslink gestuurd naar <strong>{email}</strong>. Klik op de link om je account te activeren.
              </p>
              <Link 
                to="/login"
                className="mt-4 inline-block text-sm font-semibold text-primary-600 hover:text-primary-700"
              >
                Terug naar inloggen
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                {error && (
                  <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>
                )}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700">Naam</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                  className="w-full rounded-xl bg-primary-600 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Bezig...' : 'Registreren'}
                </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-neutral-500">Of registreer met</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-300 bg-white py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Doorgaan met Google
                </button>
              </div>
            </>
          )}

          <p className="mt-8 text-center text-sm text-neutral-500">
            Al een account?{' '}
            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">
              Inloggen
            </Link>
          </p>
        </div>
      </div>

      {/* Right — gradient panel */}
      <div className="hidden bg-gradient-to-br from-primary-600 to-primary-800 lg:flex lg:flex-1 lg:items-center lg:justify-center">
        <div className="max-w-md text-center px-8">
          <img src="/icon-white.png" alt="" className="mx-auto h-16 mb-8 opacity-80" />
          <h2 className="text-2xl font-bold text-white">Slim beslissen over je woningproject</h2>
          <p className="mt-4 text-primary-200">
            Vergelijk offertes, begrijp kosten en beslis met vertrouwen. 100% gratis.
          </p>
        </div>
      </div>
    </div>
  )
}
