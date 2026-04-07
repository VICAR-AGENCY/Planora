import type { ReactNode } from 'react'

interface CalculatorStepProps {
  step: number
  title: string
  children: ReactNode
}

export function CalculatorStep({ step, title, children }: CalculatorStepProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
          {step}
        </span>
        <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
      </div>
      <div className="pl-11">{children}</div>
    </div>
  )
}
