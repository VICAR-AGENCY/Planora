import { formatEUR } from '@/lib/utils/format'
import type { HeatPumpEstimate } from '@/lib/calculator/heat-pump'

interface ResultsCardProps {
  estimate: HeatPumpEstimate
}

export function ResultsCard({ estimate }: ResultsCardProps) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-neutral-900">Resultaat</h3>
      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Aanbevolen vermogen</span>
          <span className="font-medium">{estimate.recommendedPower} kW</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Toestel</span>
          <span className="font-medium">{formatEUR(estimate.equipmentCost.min)} – {formatEUR(estimate.equipmentCost.max)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Installatie</span>
          <span className="font-medium">{formatEUR(estimate.installationCost.min)} – {formatEUR(estimate.installationCost.max)}</span>
        </div>
        <div className="flex justify-between border-t pt-3 text-base font-semibold">
          <span>Totaal</span>
          <span className="text-primary-600">{formatEUR(estimate.totalCost.min)} – {formatEUR(estimate.totalCost.max)}</span>
        </div>
      </div>
    </div>
  )
}
