import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface CategoryConfig {
  slug: string
  title: string
  subtitle: string
  description: string
  icon: LucideIcon
  calculatorLink?: string
  heroImage?: string
  priceRange: string
  premiumRange: string
  faqs: { question: string; answer: string }[]
}

export function CategoryLandingPage({ config }: { config: CategoryConfig }) {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700 mb-6">
            <config.icon size={16} />
            {config.title}
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-5xl">
            {config.subtitle}
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl mx-auto">
            {config.description}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/app/nieuw-project"
              className="flex items-center gap-2 rounded-xl bg-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-600/25 hover:bg-primary-700 transition-colors"
            >
              Start je project
              <ArrowRight size={18} />
            </Link>
            {config.calculatorLink && (
              <Link
                to={config.calculatorLink}
                className="flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-8 py-3.5 text-base font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                Bereken je kosten
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-primary-100 bg-primary-50 p-6 text-center">
              <p className="text-sm font-medium text-primary-600">Gemiddelde prijs</p>
              <p className="mt-2 text-2xl font-bold text-primary-700">{config.priceRange}</p>
            </div>
            <div className="rounded-xl border border-accent-200 bg-accent-50 p-6 text-center">
              <p className="text-sm font-medium text-accent-600">Mogelijke premies</p>
              <p className="mt-2 text-2xl font-bold text-accent-700">{config.premiumRange}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-neutral-900 text-center sm:text-3xl">Veelgestelde vragen</h2>
          <div className="mt-12 space-y-3">
            {config.faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials placeholder */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Wat klanten zeggen</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-100 bg-white p-6 text-left shadow-sm">
              <p className="text-neutral-600 italic">"Planora hielp me de juiste keuze te maken. Eindelijk een platform dat eerlijk vergelijkt."</p>
              <p className="mt-4 text-sm font-semibold text-neutral-900">Jan D. — Antwerpen</p>
            </div>
            <div className="rounded-xl border border-neutral-100 bg-white p-6 text-left shadow-sm">
              <p className="text-neutral-600 italic">"Binnen een week had ik 3 offertes die ik echt kon vergelijken. Topservice."</p>
              <p className="mt-4 text-sm font-semibold text-neutral-900">Sarah V. — Gent</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-700 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">Klaar om te starten?</h2>
          <p className="mt-4 text-lg text-primary-200">
            Krijg gratis en vrijblijvend advies voor jouw project.
          </p>
          <Link
            to="/app/nieuw-project"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-primary-700 shadow-lg hover:bg-primary-50 transition-colors"
          >
            Start je project
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border border-neutral-200 bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5 text-left"
      >
        <span className="font-medium text-neutral-900">{question}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-neutral-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-neutral-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
