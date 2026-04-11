import { cn } from '@/lib/utils/cn'
import type { OnboardingData } from './types'

const DAYS = [
  { value: 'mon', label: 'Ma' },
  { value: 'tue', label: 'Di' },
  { value: 'wed', label: 'Wo' },
  { value: 'thu', label: 'Do' },
  { value: 'fri', label: 'Vr' },
  { value: 'sat', label: 'Za' },
  { value: 'sun', label: 'Zo' },
]

const PRICE_OPTIONS = [
  { value: 'low', label: '€', sublabel: 'Laag tarief', desc: 'Competitieve prijs voor prijs-bewuste klanten' },
  { value: 'medium', label: '€€', sublabel: 'Midden tarief', desc: 'Goede balans tussen prijs en kwaliteit' },
  { value: 'high', label: '€€€', sublabel: 'Premium tarief', desc: 'Topkwaliteit en service voor veeleisende klanten' },
] as const

interface Props {
  data: OnboardingData
  onChange: (data: Partial<OnboardingData>) => void
}

export function StepBeschikbaarheid({ data, onChange }: Props) {
  const toggleDay = (day: string) => {
    const days = data.availability.days.includes(day)
      ? data.availability.days.filter((d) => d !== day)
      : [...data.availability.days, day]
    onChange({ availability: { ...data.availability, days } })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">Beschikbaarheid & tarieven</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Geef aan wanneer je beschikbaar bent en in welke prijscategorie je valt.
        </p>
      </div>

      {/* Werkdagen */}
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-3">Werkdagen</label>
        <div className="flex gap-2 flex-wrap">
          {DAYS.map((day) => (
            <button
              key={day.value}
              type="button"
              onClick={() => toggleDay(day.value)}
              className={cn(
                'h-11 w-11 rounded-xl text-sm font-bold transition-colors',
                data.availability.days.includes(day.value)
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-500 hover:bg-primary-50 hover:text-primary-700'
              )}
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>

      {/* Werktijden */}
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-3">Werktijden</label>
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-xs text-neutral-500 mb-1">Van</label>
            <input
              type="time"
              value={data.availability.time_from}
              onChange={(e) => onChange({ availability: { ...data.availability, time_from: e.target.value } })}
              className="rounded-xl border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
          <span className="text-neutral-400 mt-4">—</span>
          <div>
            <label className="block text-xs text-neutral-500 mb-1">Tot</label>
            <input
              type="time"
              value={data.availability.time_to}
              onChange={(e) => onChange({ availability: { ...data.availability, time_to: e.target.value } })}
              className="rounded-xl border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
        </div>
      </div>

      {/* Spoed */}
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-3">Spoedopdrachten</label>
        <div className="flex gap-3">
          {[
            { value: true, label: 'Ja, ik neem spoedopdrachten aan' },
            { value: false, label: 'Nee, enkel geplande opdrachten' },
          ].map((opt) => (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => onChange({ availability: { ...data.availability, urgent: opt.value } })}
              className={cn(
                'flex-1 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-colors text-left',
                data.availability.urgent === opt.value
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-neutral-200 text-neutral-600 hover:border-primary-200'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Prijscategorie */}
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-3">Prijscategorie</label>
        <div className="grid grid-cols-3 gap-3">
          {PRICE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ price_category: opt.value })}
              className={cn(
                'rounded-xl border-2 p-4 text-center transition-colors',
                data.price_category === opt.value
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-neutral-200 hover:border-primary-200'
              )}
            >
              <p className="text-2xl font-bold text-primary-700">{opt.label}</p>
              <p className="mt-1 text-sm font-semibold text-neutral-800">{opt.sublabel}</p>
              <p className="mt-1 text-xs text-neutral-500">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
