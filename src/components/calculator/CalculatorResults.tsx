import { useState } from 'react'
import { ArrowRight, ShieldCheck, Star, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatEUR } from '@/lib/utils/format'
import { LeadCaptureModal } from '@/components/leads/LeadCaptureModal'

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
  projectType?: string
  source?: string
}

export function CalculatorResults({ estimate, premium, projectType, source }: CalculatorResultsProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const calculatorData = {
    totalCost: estimate.totalCost,
    annualSavings: estimate.annualSavings,
    paybackYears: estimate.paybackYears,
    premium: premium.totalPremium,
  }

  return (
    <>
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
      <div className="rounded-xl border border-primary-100 bg-primary-50/50 p-5">
        <p className="text-sm font-semibold text-neutral-900 mb-1">
          Wil je exacte prijzen van erkende vakmensen?
        </p>
        <p className="text-xs text-neutral-500 mb-4">
          Ontvang gratis en vrijblijvend offertes op maat voor jouw situatie.
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
        >
          Ontvang gratis offertes
          <ArrowRight size={16} />
        </button>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <ShieldCheck size={12} className="text-green-500" />
            Gratis &amp; vrijblijvend
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-primary-500" />
            Reactie binnen 24u
          </span>
          <span className="flex items-center gap-1">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            4.8/5 score
          </span>
        </div>
      </div>
    </motion.div>

    <LeadCaptureModal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      projectType={projectType}
      source={source ?? 'calculator_results'}
      calculatorData={calculatorData}
    />
    </>
  )
}
