import type { IntakeProjectData } from '@/types/intake'

interface ProjectSummaryProps {
  data: Partial<IntakeProjectData>
}

const BUDGET_LABELS: Record<string, string> = {
  '<10000': '< €10.000',
  '10000-15000': '€10.000 – €15.000',
  '15000-25000': '€15.000 – €25.000',
  '>25000': '> €25.000',
}

const LABELS: Record<string, string> = {
  property_type: 'Woningtype',
  surface_area: 'Oppervlakte',
  insulation_level: 'Isolatie',
  budget_range: 'Budget',
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
          let display: string
          if (key === 'surface_area') display = `${value} m²`
          else if (key === 'budget_range') display = BUDGET_LABELS[String(value)] ?? String(value)
          else display = String(value)
          return (
            <div key={key} className="flex justify-between text-sm">
              <dt className="text-neutral-500">{label}</dt>
              <dd className="font-medium text-neutral-900">{display}</dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
