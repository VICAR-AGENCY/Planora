import { formatEUR } from '@/lib/utils/format'
import type { PremiumEstimate as PremiumEstimateType } from '@/lib/calculator/premium'

interface PremiumEstimateProps {
  estimate: PremiumEstimateType
}

export function PremiumEstimate({ estimate }: PremiumEstimateProps) {
  return (
    <div className="rounded-xl border border-accent-200 bg-accent-50 p-6">
      <h3 className="text-lg font-semibold text-accent-700">Geschatte premies</h3>
      <dl className="mt-4 space-y-3">
        {estimate.mijnVerbouwPremie > 0 && (
          <div className="flex justify-between text-sm">
            <dt className="text-accent-600">MijnVerbouwPremie</dt>
            <dd className="font-semibold text-accent-700">{formatEUR(estimate.mijnVerbouwPremie)}</dd>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <dt className="text-accent-600">Federale belastingvermindering</dt>
          <dd className="font-semibold text-accent-700">{formatEUR(estimate.federalTaxCredit)}</dd>
        </div>
        <div className="flex justify-between border-t border-accent-200 pt-3 text-base">
          <dt className="font-semibold text-accent-700">Totaal voordeel</dt>
          <dd className="font-bold text-accent-700">{formatEUR(estimate.totalPremium)}</dd>
        </div>
      </dl>
    </div>
  )
}
