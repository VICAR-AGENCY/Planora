import { Link } from 'react-router-dom'
import { ArrowRight, Calculator, Flame, DoorOpen, Home } from 'lucide-react'
import { AnimatedHero } from '@/components/animated/AnimatedHero'
import { ScrollVelocityText } from '@/components/animated/ScrollVelocityText'
import { MatchingAnimation } from '@/components/animated/MatchingAnimation'
import { LogoCarousel } from '@/components/animated/LogoCarousel'
import { FeatureGrid } from '@/components/marketing/FeatureGrid'
import { motion } from 'framer-motion'

const categories = [
  {
    title: 'Warmtepompen',
    description: 'Bespaar tot 60% op je verwarmingskosten met een lucht-water, grond-water of hybride warmtepomp.',
    to: '/projecten/warmtepomp',
    price: 'Vanaf €5.000',
    premium: 'Tot €7.500 premie',
    image: '/warmtepomp.webp',
  },
  {
    title: 'Ramen & Deuren',
    description: 'Nieuwe ramen verbeteren je isolatie, comfort en veiligheid. PVC, aluminium of hout.',
    to: '/projecten/ramen-deuren',
    price: 'Vanaf €5.000',
    premium: 'Tot €4.000 premie',
    image: '/ramen-deuren.jpg',
  },
  {
    title: 'Dakisolatie',
    description: 'Tot 30% van je warmte verdwijnt via het dak. De snelste weg naar een lagere energiefactuur.',
    to: '/projecten/dakisolatie',
    price: 'Vanaf €3.000',
    premium: 'Tot €5.000 premie',
    image: '/dakisolatie.webp',
  },
]

const calculators = [
  {
    icon: Flame,
    title: 'Warmtepomp',
    desc: 'Bereken kosten, premies en terugverdientijd',
    to: '/calculator/warmtepomp',
  },
  {
    icon: DoorOpen,
    title: 'Ramen & Deuren',
    desc: 'PVC, aluminium of hout — wat kost het?',
    to: '/calculator/ramen-deuren',
  },
  {
    icon: Home,
    title: 'Dakisolatie',
    desc: 'Sarking, binnenisolatie of PUR-schuim',
    to: '/calculator/dakisolatie',
  },
]

export function HomePage() {
  return (
    <>
      <AnimatedHero />

      <ScrollVelocityText
        texts={[
          '500+ tevreden huiseigenaren',
          'Gemiddeld 30% besparing',
          'Alleen gecertificeerde installateurs',
          '100% gratis en vrijblijvend',
          'AI-gestuurd advies',
        ]}
      />

      {/* ── Category cards ── */}
      <section className="bg-white py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 mb-6">
              <img src="/favicon.png" alt="" className="h-4 w-4 rounded-sm" />
              Onze specialisaties
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">Kies je project</h2>
            <p className="mt-5 text-lg text-neutral-500">
              Start met één van onze specialisaties en ontvang persoonlijk advies op maat.
            </p>
          </div>
          <div className="grid gap-10 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                to={cat.to}
                className="group relative overflow-hidden rounded-3xl bg-white border border-primary-100/80 shadow-lg shadow-primary-900/[0.04] hover:shadow-2xl hover:shadow-primary-900/[0.08] hover:-translate-y-1 transition-all duration-500"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 shadow-sm">
                      <img src="/favicon.png" alt="" className="h-3.5 w-3.5 rounded-sm" />
                      <span className="text-xs font-semibold text-primary-700">Planora</span>
                    </div>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-2xl font-bold text-white">{cat.title}</h3>
                  </div>
                </div>
                <div className="p-7">
                  <p className="text-neutral-600 leading-relaxed">{cat.description}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="rounded-full bg-primary-50 px-4 py-1.5 text-xs font-bold text-primary-700">
                      {cat.price}
                    </span>
                    <span className="rounded-full bg-accent-50 px-4 py-1.5 text-xs font-bold text-accent-700">
                      {cat.premium}
                    </span>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-bold text-primary-600 group-hover:text-primary-700">
                    Ontdek meer
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calculator tools — prominent ── */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700 mb-6">
              <Calculator size={14} />
              Gratis calculators
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
              Bereken direct je kosten
            </h2>
            <p className="mt-4 text-lg text-neutral-500">
              Weet in 30 seconden wat je project kost — inclusief premies en terugverdientijd.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {calculators.map((calc, i) => (
              <motion.div
                key={calc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={calc.to}
                  className="group flex flex-col items-center rounded-2xl border-2 border-primary-100 bg-white p-8 text-center hover:border-primary-400 hover:shadow-xl hover:shadow-primary-600/10 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 group-hover:bg-primary-100 transition-colors">
                    <calc.icon size={28} className="text-primary-600" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-neutral-900">{calc.title}</h3>
                  <p className="mt-2 text-sm text-neutral-500">{calc.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-bold text-primary-600 group-hover:text-primary-700">
                    Bereken nu
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Matching animatie ── */}
      <MatchingAnimation />

      <FeatureGrid />

      <LogoCarousel />

      {/* ── Installateurs sectie — met foto ── */}
      <section className="bg-white py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left — text */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 mb-6">
                Voor installateurs & specialisten
              </div>
              <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
                Ontvang kwalitatieve projectaanvragen
              </h2>
              <p className="mt-5 text-lg text-neutral-500 leading-relaxed">
                Sluit je aan bij Planora en ontvang alleen relevante, geverifieerde projectaanvragen in jouw regio. Geen koude leads — enkel serieuze klanten.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'Alleen leads in jouw regio en specialisatie',
                  'Complete projectbrief met foto\'s en budget',
                  'Gratis dashboard om offertes te beheren',
                  'Direct contact met de klant via chat',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-neutral-700">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-100">
                      <svg className="h-3 w-3 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/voor-vaklui"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-700/20 hover:bg-primary-800 transition-colors"
                >
                  Word partner
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/supplier/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-primary-200 px-6 py-3 text-sm font-semibold text-primary-700 hover:bg-primary-50 transition-colors"
                >
                  Inloggen als installateur
                </Link>
              </div>
            </div>

            {/* Right — photo + floating card */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary-900/10">
                <img
                  src="/installateur-blij.avif"
                  alt="Tevreden installateur partner van Planora"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent" />
              </div>
              {/* Floating stats card */}
              <motion.div
                className="absolute -bottom-6 -left-6 rounded-2xl bg-white border border-primary-100 p-5 shadow-xl sm:left-auto sm:-right-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50">
                    <span className="text-lg font-bold text-accent-600">4.7</span>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">Gemiddelde score</p>
                    <p className="text-xs text-neutral-500">15+ gecertificeerde partners</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-primary-700 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <img src="/favicon.png" alt="" className="mx-auto h-12 w-12 rounded-xl mb-8 opacity-80" />
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Klaar om slim te beslissen?
          </h2>
          <p className="mt-5 text-lg text-primary-200 max-w-xl mx-auto">
            Begin vandaag met je woningproject. Gratis, vrijblijvend en binnen 5 minuten je eerste kostenraming.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/app/nieuw-project"
              className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-primary-700 shadow-lg hover:bg-primary-50 transition-colors"
            >
              Start je project
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/calculator/warmtepomp"
              className="flex items-center gap-2 rounded-xl border border-white/30 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <Calculator size={18} />
              Bereken je kosten
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
