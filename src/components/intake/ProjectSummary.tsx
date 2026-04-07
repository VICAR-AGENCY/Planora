import { formatEUR } from '@/lib/utils/format'
import type { IntakeProjectData } from '@/types/intake'

interface ProjectSummaryProps {
  data: Partial<IntakeProjectData>
}

const LABELS: Record<string, string> = {
  property_type: 'Woningtype',
  current_heating: 'Huidige verwarming',
  desired_system: 'Gewenst systeem',
  surface_area: 'Oppervlakte',
  insulation_level: 'Isolatie',
  timeline: 'Timing',
  city: 'Stad',
  postal_code: 'Postcode',
}

export function ProjectSummary({ data }: ProjectSummaryProps) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-neutral-900">Jouw projectbrief</h3>
      <dl className="mt-4 space-y-3">
        {Object.entries(LABELS).map(([key, label]) => {
          const value = data[key as keyof IntakeProjectData]
          if (!value) return null
          return (
            <div key={key} className="flex justify-between text-sm">
              <dt className="text-neutral-500">{label}</dt>
              <dd className="font-medium text-neutral-900">
                {key === 'surface_area' ? `${value} m²` : String(value)}
              </dd>
            </div>
          )
        })}
        {data.budget_range && (
          <div className="flex justify-between text-sm">
            <dt className="text-neutral-500">Budget</dt>
            <dd className="font-medium text-neutral-900">
              {formatEUR(data.budget_range.min)} – {formatEUR(data.budget_range.max)}
            </dd>
          </div>
        )}
      </dl>
    </div>
  )
}
