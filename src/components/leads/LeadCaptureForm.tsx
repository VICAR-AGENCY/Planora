import { useState, type FormEvent } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useLeadCapture } from '@/hooks/useLeadCapture'
import { analytics } from '@/lib/analytics'
import { LocationSearch } from './LocationSearch'

const PROJECT_TYPE_LABELS: Record<string, string> = {
  warmtepomp: 'Warmtepomp',
  'ramen-deuren': 'Ramen & Deuren',
  dakisolatie: 'Dakisolatie',
}

interface LocationValue {
  label: string
  postcode?: string
  city?: string
  lat?: number
  lon?: number
}

interface LeadCaptureFormProps {
  projectType?: string
  source?: string
  calculatorData?: Record<string, unknown>
  onSuccess?: () => void
}

export function LeadCaptureForm({
  projectType,
  source,
  calculatorData,
  onSuccess,
}: LeadCaptureFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState<LocationValue | null>(null)
  const [locationError, setLocationError] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const { mutateAsync, isPending, error } = useLeadCapture()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!location) {
      setLocationError(true)
      return
    }
    setLocationError(false)
    await mutateAsync({
      name,
      email,
      phone: phone || undefined,
      postal_code: location.postcode,
      project_type: projectType,
      source,
      calculator_data: {
        ...calculatorData,
        city: location.city,
        lat: location.lat,
        lon: location.lon,
      },
    })
    analytics.leadSubmitted(source ?? 'unknown', projectType)
    setSubmitted(true)
    setTimeout(() => onSuccess?.(), 1800)
  }

  if (submitted) {
    return (
      <div className="py-4 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-neutral-900">We nemen snel contact op!</h3>
        <p className="mt-2 text-sm text-neutral-500">
          Bedankt {name.split(' ')[0]}. We sturen je offertes van erkende vakmensen in jouw regio.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
          Er ging iets mis. Probeer opnieuw.
        </p>
      )}

      {/* Project type badge */}
      {projectType && PROJECT_TYPE_LABELS[projectType] && (
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
          {PROJECT_TYPE_LABELS[projectType]}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="lead-name" className="block text-sm font-medium text-neutral-700">
            Naam <span className="text-red-400">*</span>
          </label>
          <input
            id="lead-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Jan Janssen"
            className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div>
          <label htmlFor="lead-email" className="block text-sm font-medium text-neutral-700">
            E-mail <span className="text-red-400">*</span>
          </label>
          <input
            id="lead-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="jan@voorbeeld.be"
            className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div>
          <label htmlFor="lead-phone" className="block text-sm font-medium text-neutral-700">
            Telefoon
          </label>
          <input
            id="lead-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0470 12 34 56"
            className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Jouw locatie <span className="text-red-400">*</span>
          </label>
          <LocationSearch
            value={location}
            onChange={(loc) => { setLocation(loc); if (loc) setLocationError(false) }}
            placeholder="Zoek gemeente of postcode..."
            required
          />
          {locationError && (
            <p className="mt-1 text-xs text-red-500">Vul een geldige locatie in.</p>
          )}
          {location && (
            <p className="mt-1 text-xs text-primary-600">
              Locatie bevestigd: {location.city ?? location.label}{location.postcode ? ` — ${location.postcode}` : ''}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 py-3 text-sm font-semibold text-white shadow-md shadow-primary-600/20 hover:bg-primary-700 disabled:opacity-50 transition-colors"
      >
        {isPending ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <>
            Ontvang gratis offertes
            <ArrowRight size={16} />
          </>
        )}
      </button>

      <p className="text-center text-xs text-neutral-400">
        Door te verzenden ga je akkoord met onze{' '}
        <a href="/privacy" className="underline hover:text-neutral-600">
          privacyverklaring
        </a>
        .
      </p>
    </form>
  )
}
