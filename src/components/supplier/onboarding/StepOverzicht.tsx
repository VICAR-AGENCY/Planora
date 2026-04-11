import { Building2, Tag, MapPin, Clock, Euro } from 'lucide-react'
import type { OnboardingData } from './types'

const PRICE_LABELS = { low: '€ Laag tarief', medium: '€€ Midden tarief', high: '€€€ Premium tarief' }
const DAY_LABELS: Record<string, string> = { mon: 'Ma', tue: 'Di', wed: 'Wo', thu: 'Do', fri: 'Vr', sat: 'Za', sun: 'Zo' }

interface Props {
  data: OnboardingData
}

export function StepOverzicht({ data }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">Overzicht</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Controleer je gegevens voor je profiel activeert.
        </p>
      </div>

      <div className="space-y-4">
        {/* Bedrijf */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-3">
            <Building2 size={16} className="text-primary-600" />
            <h3 className="text-sm font-semibold text-neutral-900">Bedrijfsprofiel</h3>
          </div>
          <dl className="space-y-1.5 text-sm">
            <Row label="Bedrijf" value={data.company_name || '—'} />
            <Row label="Contactpersoon" value={data.contact_name || '—'} />
            <Row label="Telefoon" value={data.phone || '—'} />
            <Row label="Website" value={data.website || '—'} />
            {data.description && (
              <div className="pt-1">
                <p className="text-neutral-400 text-xs">Beschrijving</p>
                <p className="text-neutral-700 mt-0.5">{data.description}</p>
              </div>
            )}
          </dl>
        </div>

        {/* Specialisaties */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-3">
            <Tag size={16} className="text-primary-600" />
            <h3 className="text-sm font-semibold text-neutral-900">Specialisaties</h3>
          </div>
          {data.categories.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.categories.map((c) => (
                <span key={c} className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700 capitalize">
                  {c.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-400">Geen specialisaties geselecteerd</p>
          )}
        </div>

        {/* Werkgebied */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={16} className="text-primary-600" />
            <h3 className="text-sm font-semibold text-neutral-900">Werkgebied</h3>
          </div>
          {data.regions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.regions.map((r) => (
                <span key={r.prefix} className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                  {r.label}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-400">Geen regio's geselecteerd</p>
          )}
        </div>

        {/* Beschikbaarheid */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} className="text-primary-600" />
            <h3 className="text-sm font-semibold text-neutral-900">Beschikbaarheid</h3>
          </div>
          <dl className="space-y-1.5 text-sm">
            <Row
              label="Werkdagen"
              value={data.availability.days.map((d) => DAY_LABELS[d]).join(', ') || '—'}
            />
            <Row label="Werktijden" value={`${data.availability.time_from} – ${data.availability.time_to}`} />
            <Row label="Spoedopdrachten" value={data.availability.urgent ? 'Ja' : 'Nee'} />
          </dl>
        </div>

        {/* Tarieven */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-3">
            <Euro size={16} className="text-primary-600" />
            <h3 className="text-sm font-semibold text-neutral-900">Tarieven</h3>
          </div>
          <p className="text-sm text-neutral-700">
            {data.price_category ? PRICE_LABELS[data.price_category] : '—'}
          </p>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-neutral-400">{label}</dt>
      <dd className="font-medium text-neutral-800 text-right max-w-[60%] truncate">{value}</dd>
    </div>
  )
}
