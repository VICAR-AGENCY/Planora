import { Link } from 'react-router-dom'
import { ArrowRight, Users, FileCheck, MessageCircle, BarChart3, Shield, TrendingUp } from 'lucide-react'

const benefits = [
  {
    icon: Users,
    title: 'Kwalitatieve leads',
    description: 'Ontvang alleen projectaanvragen die matchen met jouw regio en specialisatie. Geen spam.',
  },
  {
    icon: FileCheck,
    title: 'Complete projectbriefs',
    description: 'Elke aanvraag bevat een AI-opgestelde projectbrief met fotos, budget en tijdlijn.',
  },
  {
    icon: MessageCircle,
    title: 'Direct contact',
    description: 'Communiceer rechtstreeks met de klant via ons beveiligd berichtenplatform.',
  },
  {
    icon: BarChart3,
    title: 'Offertes beheren',
    description: 'Upload en beheer je offertes in een overzichtelijk dashboard. Track je conversie.',
  },
  {
    icon: Shield,
    title: 'Verificatie & vertrouwen',
    description: 'Geverifieerde installateurs worden prominenter getoond. Bouw je reputatie op met reviews.',
  },
  {
    icon: TrendingUp,
    title: 'Groei je bedrijf',
    description: 'Bereik nieuwe klanten zonder marketingkosten. Betaal alleen wanneer het resultaat oplevert.',
  },
]

const stats = [
  { value: '500+', label: 'Huiseigenaren op het platform' },
  { value: '15+', label: 'Gecertificeerde partners' },
  { value: '92%', label: 'Matchscore gemiddeld' },
  { value: '€0', label: 'Registratiekosten' },
]

export function SupplierLandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-primary-200 mb-6">
              Voor installateurs & installateurs
            </span>
            <h1 className="text-3xl font-bold text-white sm:text-5xl">
              Ontvang kwalitatieve projectaanvragen via Planora
            </h1>
            <p className="mt-6 text-lg text-primary-200">
              Stop met koude acquisitie. Ontvang alleen serieuze, geverifieerde aanvragen in jouw regio en specialisatie. Gratis registreren.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/supplier/registreren"
                className="flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-primary-700 shadow-lg hover:bg-primary-50 transition-colors"
              >
                Gratis registreren
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/supplier/login"
                className="flex items-center gap-2 rounded-xl border border-white/30 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Inloggen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b border-primary-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary-700">{stat.value}</p>
                <p className="mt-1 text-sm text-neutral-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works for suppliers */}
      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-neutral-900 text-center sm:text-3xl">
            Hoe werkt het voor installateurs?
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="font-semibold text-neutral-900">Registreer gratis</h3>
              <p className="mt-2 text-sm text-neutral-500">
                Maak een account aan, kies je specialisaties en regio's. Verificatie binnen 24u.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-100 text-accent-600 mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="font-semibold text-neutral-900">Ontvang matches</h3>
              <p className="mt-2 text-sm text-neutral-500">
                Wij matchen je automatisch met relevante projectaanvragen. Je ontvangt een notificatie.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-warm-100 text-warm-500 mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="font-semibold text-neutral-900">Stuur je offerte</h3>
              <p className="mt-2 text-sm text-neutral-500">
                Bekijk de projectbrief, neem contact op met de klant en stuur je offerte via het platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-neutral-900 text-center sm:text-3xl mb-12">
            Waarom kiezen installateurs voor Planora?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-xl border border-primary-100 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                  <benefit.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">{benefit.title}</h3>
                <p className="mt-2 text-sm text-neutral-500">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-700 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">
            Klaar om te groeien?
          </h2>
          <p className="mt-4 text-lg text-primary-200">
            Registreer gratis en ontvang je eerste projectaanvragen binnen 24 uur.
          </p>
          <Link
            to="/supplier/registreren"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-primary-700 shadow-lg hover:bg-primary-50 transition-colors"
          >
            Gratis registreren
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
