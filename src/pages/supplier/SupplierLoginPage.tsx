import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmail } from '@/lib/supabase/auth'

export function SupplierLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signInWithEmail(email, password)
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      navigate('/supplier/dashboard')
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
              className="w-full rounded-xl bg-primary-700 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Bezig...' : 'Inloggen'}
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
