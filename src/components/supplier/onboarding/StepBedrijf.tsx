import type { OnboardingData } from './types'

interface Props {
  data: OnboardingData
  onChange: (data: Partial<OnboardingData>) => void
}

export function StepBedrijf({ data, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">Jouw bedrijfsprofiel</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Basisinformatie over je bedrijf die klanten te zien krijgen.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Bedrijfsnaam <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={data.company_name}
            onChange={(e) => onChange({ company_name: e.target.value })}
            placeholder="ACME Installaties"
            className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Contactpersoon <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={data.contact_name}
            onChange={(e) => onChange({ contact_name: e.target.value })}
            placeholder="Jan Janssen"
            className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Telefoon</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="0470 12 34 56"
            className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Website</label>
          <input
            type="url"
            value={data.website}
            onChange={(e) => onChange({ website: e.target.value })}
            placeholder="https://www.jouwbedrijf.be"
            className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Korte beschrijving
          </label>
          <textarea
            value={data.description}
            onChange={(e) => onChange({ description: e.target.value })}
            rows={4}
            placeholder="Vertel klanten wie je bent, wat je doet en waarom ze voor jou moeten kiezen..."
            className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none"
          />
          <p className="mt-1 text-xs text-neutral-400">{data.description.length}/500 tekens</p>
        </div>
      </div>
    </div>
  )
}
