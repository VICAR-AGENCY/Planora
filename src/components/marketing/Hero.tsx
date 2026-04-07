import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Shield, BarChart3 } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Slim beslissen over je{' '}
            <span className="text-primary-600">warmtepomp</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-600 sm:text-xl">
            Planora helpt je stap voor stap: van oriëntatie tot de juiste installateur.
            Geen verkooppraatjes, wel eerlijke vergelijkingen.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/intake"
              className="flex items-center gap-2 rounded-xl bg-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-600/25 hover:bg-primary-700 transition-colors"
            >
              Start je project
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/calculator/warmtepomp"
              className="flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-8 py-3.5 text-base font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Bereken je kosten
            </Link>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-sm border border-neutral-100">
            <Zap className="mt-0.5 h-6 w-6 shrink-0 text-accent-500" />
            <div>
              <h3 className="font-semibold text-neutral-900">AI-gestuurd</h3>
              <p className="mt-1 text-sm text-neutral-500">Beschrijf je project via chat of foto — wij doen de rest</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-sm border border-neutral-100">
            <Shield className="mt-0.5 h-6 w-6 shrink-0 text-primary-500" />
            <div>
              <h3 className="font-semibold text-neutral-900">Geverifieerde installateurs</h3>
              <p className="mt-1 text-sm text-neutral-500">Alleen gecertificeerde installateurs in jouw regio</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-sm border border-neutral-100">
            <BarChart3 className="mt-0.5 h-6 w-6 shrink-0 text-warm-500" />
            <div>
              <h3 className="font-semibold text-neutral-900">Slimme vergelijking</h3>
              <p className="mt-1 text-sm text-neutral-500">Offertes geanalyseerd en zij-aan-zij vergeleken</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
