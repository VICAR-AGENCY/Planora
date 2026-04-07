import { cn } from '@/lib/utils/cn'
import { type LucideIcon } from 'lucide-react'

interface Option {
  value: string
  label: string
  description?: string
  icon?: LucideIcon
}

interface CalculatorStepCardsProps {
  options: Option[]
  selected: string
  onSelect: (value: string) => void
  columns?: 2 | 3 | 4
}

export function CalculatorStepCards({ options, selected, onSelect, columns = 3 }: CalculatorStepCardsProps) {
  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={cn('grid gap-4', gridCols[columns])}>
      {options.map((opt) => {
        const isSelected = selected === opt.value
        return (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={cn(
              'rounded-xl border-2 p-5 text-left transition-all',
              isSelected
                ? 'border-primary-600 bg-primary-50 shadow-md shadow-primary-600/10'
                : 'border-neutral-200 bg-white hover:border-primary-300 hover:bg-neutral-50'
            )}
          >
            {opt.icon && (
              <opt.icon size={24} className={cn('mb-3', isSelected ? 'text-primary-600' : 'text-neutral-400')} />
            )}
            <p className={cn('font-semibold', isSelected ? 'text-primary-700' : 'text-neutral-900')}>
              {opt.label}
            </p>
            {opt.description && (
              <p className="mt-1 text-sm text-neutral-500">{opt.description}</p>
            )}
          </button>
        )
      })}
    </div>
  )
}
