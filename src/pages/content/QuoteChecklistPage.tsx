import { Check } from 'lucide-react'
import { CTASection } from '@/components/marketing/CTASection'

const checklist = [
  'Merk en model van de warmtepomp',
  'Vermogen (kW) afgestemd op je woning',
  'Type warmtepomp (lucht-water, grond-water, hybride)',
  'Inclusief of exclusief vloerverwarming / radiatoren',
  'BTW-tarief (6% renovatie of 21%)',
  'Plaatsingskosten apart vermeld',
  'Boorwerken (bij grond-water)',
  'Garantievoorwaarden (toestel + installatie)',
  'Onderhoudspakket inbegrepen?',
  'Geschatte jaarlijks verbruik (kWh)',
  'Hulp bij premie-aanvraag',
  'Oplevertermijn',
]

export function QuoteChecklistPage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Checklist: waar moet een warmtepomp offerte aan voldoen?
        </h1>
        <p className="mt-4 text-lg text-neutral-600">
          Gebruik deze checklist om offertes te beoordelen. Mis niets en vergelijk appels met appels.
        </p>

        <div className="mt-12 space-y-4">
          {checklist.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-neutral-100 p-4">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-100">
                <Check className="h-4 w-4 text-accent-600" />
              </div>
              <span className="text-neutral-700">{item}</span>
            </div>
          ))}
        </div>
      </article>

      <CTASection />
    </>
  )
}
