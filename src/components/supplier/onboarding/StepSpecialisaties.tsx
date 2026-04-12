import { Thermometer, Home, LayoutGrid, Sun, Layers, Flame, Wind, Zap, Droplets, Hammer, Grid3x3 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { OnboardingData } from './types'

const CATEGORIES = [
  { value: 'warmtepomp', label: 'Warmtepomp', icon: Thermometer },
  { value: 'dakisolatie', label: 'Dakisolatie', icon: Home },
  { value: 'ramen_deuren', label: 'Ramen & Deuren', icon: LayoutGrid },
  { value: 'zonnepanelen', label: 'Zonnepanelen', icon: Sun },
  { value: 'muurisolatie', label: 'Muurisolatie', icon: Layers },
  { value: 'vloerverwarming', label: 'Vloerverwarming', icon: Flame },
  { value: 'ventilatie', label: 'Ventilatie', icon: Wind },
  { value: 'elektriciteit', label: 'Elektriciteit', icon: Zap },
  { value: 'sanitair', label: 'Sanitair', icon: Droplets },
  { value: 'dakrenovatie', label: 'Dakrenovatie', icon: Hammer },
  { value: 'tegelwerken', label: 'Tegelwerken', icon: Grid3x3 },
]

interface Props {
  data: OnboardingData
  onChange: (data: Partial<OnboardingData>) => void
}

export function StepSpecialisaties({ data, onChange }: Props) {
  const toggle = (value: string) => {
    const next = data.categories.includes(value)
      ? data.categories.filter((c) => c !== value)
      : [...data.categories, value]
    onChange({ categories: next })
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">Jouw specialisaties</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Selecteer alle categorieën waarin je actief bent. Minimaal 1 verplicht.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((cat) => {
          const selected = data.categories.includes(cat.value)
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => toggle(cat.value)}
              className={cn(
                'flex flex-col items-center gap-3 rounded-xl border-2 p-4 text-center transition-all',
                selected
                  ? 'border-primary-500 bg-primary-700 text-white'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:border-primary-200 hover:bg-primary-50/50'
              )}
            >
              <div className={cn(
                'flex h-10 w-10 items-center justify-center rounded-xl',
                selected ? 'bg-white/20' : 'bg-primary-50'
              )}>
                <cat.icon size={20} className={selected ? 'text-white' : 'text-primary-600'} />
              </div>
              <span className="text-xs font-medium leading-tight">{cat.label}</span>
            </button>
          )
        })}
      </div>

      {data.categories.length === 0 && (
        <p className="text-sm text-amber-600">
          Selecteer minstens één specialisatie.
        </p>
      )}
      {data.categories.length > 0 && (
        <p className="text-sm text-green-600">
          {data.categories.length} specialisatie{data.categories.length > 1 ? 's' : ''} geselecteerd
        </p>
      )}
    </div>
  )
}
