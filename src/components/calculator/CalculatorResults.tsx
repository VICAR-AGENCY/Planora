import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatEUR } from '@/lib/utils/format'

interface CalculatorResultsProps {
  estimate: {
    recommendedPower: number
    equipmentCost: { min: number; max: number }
    installationCost: { min: number; max: number }
    totalCost: { min: number; max: number }
    annualSavings: { min: number; max: number }
    paybackYears: { min: number; max: number }
  }
  premium: {
    totalPremium: number
  }
}

export function CalculatorResults({ estimate, premium }: CalculatorResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Cost breakdown */}
      <div className="rounded-xl border border-neutral-100 bg-white p-6">
        <h3 className="text-lg font-semibold text-neutral-900">Geschatte kosten</h3>
        <div className="mt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Toestel ({estimate.recommendedPower} kW)</span>
            <span className="font-medium">{formatEUR(estimate.equipmentCost.min)} – {formatEUR(estimate.equipmentCost.max)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Installatie</span>
            <span className="font-medium">{formatEUR(estimate.installationCost.min)} – {formatEUR(estimate.installationCost.max)}</span>
          </div>
          <div className="flex justify-between border-t border-neutral-100 pt-3 text-base font-semibold">
            <span>Totaal</span>
            <motion.span
              key={estimate.totalCost.min}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-primary-700"
            >
              {formatEUR(estimate.totalCost.min)} – {formatEUR(estimate.totalCost.max)}
            </motion.span>
          </div>
        </div>
      </div>

      {/* Premiums & savings */}
      <div className="rounded-xl border border-accent-200 bg-accent-50 p-6">
        <h3 className="text-lg font-semibold text-accent-700">Premies & besparing</h3>
        <div className="mt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-accent-600">Geschatte premies</span>
            <motion.span
              key={premium.totalPremium}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-medium text-accent-700"
            >
              – {formatEUR(premium.totalPremium)}
            </motion.span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-accent-600">Jaarlijkse besparing</span>
            <span className="font-medium text-accent-700">{formatEUR(estimate.annualSavings.min)} – {formatEUR(estimate.annualSavings.max)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-accent-600">Terugverdientijd</span>
            <span className="font-medium text-accent-700">{estimate.paybackYears.min} – {estimate.paybackYears.max} jaar</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Link
        to="/app/nieuw-project"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
      >
        Wil je exactere prijzen? Start je project
        <ArrowRight size={16} />
      </Link>
    </motion.div>
  )
}
