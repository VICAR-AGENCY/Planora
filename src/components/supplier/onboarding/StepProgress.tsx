import { Check } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const STEPS = [
  { label: 'Bedrijf' },
  { label: 'Specialisaties' },
  { label: 'Werkgebied' },
  { label: 'Beschikbaarheid' },
  { label: 'Overzicht' },
]

export function StepProgress({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, i) => {
        const done = i < current
        const active = i === current
        return (
          <div key={step.label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors',
                  done && 'bg-primary-600 text-white',
                  active && 'bg-primary-600 text-white ring-4 ring-primary-100',
                  !done && !active && 'bg-neutral-100 text-neutral-400'
                )}
              >
                {done ? <Check size={16} /> : i + 1}
              </div>
              <span
                className={cn(
                  'hidden sm:block text-xs font-medium whitespace-nowrap',
                  active ? 'text-primary-700' : done ? 'text-neutral-600' : 'text-neutral-400'
                )}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  'h-0.5 w-12 sm:w-20 mb-4 mx-1 transition-colors',
                  i < current ? 'bg-primary-600' : 'bg-neutral-200'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
