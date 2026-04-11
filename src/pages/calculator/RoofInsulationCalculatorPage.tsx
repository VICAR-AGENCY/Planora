import { useState } from 'react'
import { Triangle, Square, Ruler, Home, Layers, Shield, Wind, AlertCircle, ArrowLeft, ArrowRight, ShieldCheck, Star, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { calculateRoofInsulation, type RoofInsulationInput } from '@/lib/calculator/roof-insulation'
import { LeadCaptureModal } from '@/components/leads/LeadCaptureModal'
import { CalculatorStepCards } from '@/components/calculator/CalculatorStepCards'
import { formatEUR } from '@/lib/utils/format'

const steps = [
  { key: 'roofType', title: 'Daktype', subtitle: 'Welk type dak heeft je woning?' },
  { key: 'surface', title: 'Oppervlakte', subtitle: 'Hoe groot is het dakoppervlak?' },
  { key: 'method', title: 'Isolatiemethode', subtitle: 'Welke methode heeft je voorkeur?' },
  { key: 'current', title: 'Huidige isolatie', subtitle: 'Wat is de huidige staat van je dakisolatie?' },
  { key: 'results', title: 'Resultaten', subtitle: 'Je geschatte kosten en besparing' },
]

const roofTypeOptions = [
  { value: 'pitched', label: 'Hellend dak', description: 'Schuin dak met pannen of leien', icon: Triangle },
  { value: 'flat', label: 'Plat dak', description: 'Plat of licht hellend dak', icon: Square },
]

const methodOptions = [
  { value: 'interior', label: 'Binnenisolatie', description: 'Isolatie aan de binnenkant, meest betaalbaar', icon: Home },
  { value: 'sarking', label: 'Sarking', description: 'Isolatie bovenop het dak, beste prestatie', icon: Shield },
  { value: 'spray', label: 'PUR-schuim spuiten', description: 'Snelle plaatsing, goede afdichting', icon: Wind },
]

const currentInsulationOptions = [
  { value: 'none', label: 'Geen', description: 'Geen isolatie aanwezig', icon: AlertCircle },
  { value: 'thin', label: 'Dunne laag', description: 'Beperkte isolatie aanwezig', icon: Layers },
  { value: 'old', label: 'Verouderd', description: 'Oude isolatie die aan vervanging toe is', icon: Ruler },
]

export function RoofInsulationCalculatorPage() {
  const [leadModalOpen, setLeadModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [input, setInput] = useState<RoofInsulationInput>({
    roofType: 'pitched',
    surfaceArea: 80,
    insulationMethod: 'interior',
    currentInsulation: 'none',
  })

  const estimate = calculateRoofInsulation(input)

  const canGoNext = currentStep < steps.length - 1
  const canGoBack = currentStep > 0

  return (
    <>
      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Dakisolatie kostenberekening
          </h1>
          <p className="mt-4 text-lg text-neutral-600">
            Bereken wat dakisolatie kost voor jouw woning.
          </p>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-3xl px-4">
          {/* Step indicator */}
          <div className="mb-10 flex items-center justify-center gap-2">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <button
                  onClick={() => i <= currentStep && setCurrentStep(i)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    i <= currentStep
                      ? 'bg-primary-600 text-white'
                      : 'bg-primary-100 text-primary-400'
                  }`}
                >
                  {i + 1}
                </button>
                {i < steps.length - 1 && (
                  <div className={`h-px w-6 sm:w-10 ${i < currentStep ? 'bg-primary-600' : 'bg-primary-100'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold text-neutral-900">{steps[currentStep].title}</h2>
              <p className="mt-1 text-neutral-500 mb-6">{steps[currentStep].subtitle}</p>

              {currentStep === 0 && (
                <CalculatorStepCards
                  options={roofTypeOptions}
                  selected={input.roofType}
                  onSelect={(v) => setInput({ ...input, roofType: v as RoofInsulationInput['roofType'] })}
                  columns={2}
                />
              )}

              {currentStep === 1 && (
                <div className="max-w-md">
                  <div className="flex items-end justify-between mb-4">
                    <span className="text-4xl font-bold text-primary-700">{input.surfaceArea}</span>
                    <span className="text-lg text-neutral-500">m²</span>
                  </div>
                  <input
                    type="range"
                    min={30}
                    max={300}
                    step={5}
                    value={input.surfaceArea}
                    onChange={(e) => setInput({ ...input, surfaceArea: Number(e.target.value) })}
                    className="w-full accent-primary-600"
                  />
                  <div className="mt-2 flex justify-between text-xs text-neutral-400">
                    <span>30 m²</span>
                    <span>300 m²</span>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <CalculatorStepCards
                  options={methodOptions}
                  selected={input.insulationMethod}
                  onSelect={(v) => setInput({ ...input, insulationMethod: v as RoofInsulationInput['insulationMethod'] })}
                  columns={3}
                />
              )}

              {currentStep === 3 && (
                <CalculatorStepCards
                  options={currentInsulationOptions}
                  selected={input.currentInsulation}
                  onSelect={(v) => setInput({ ...input, currentInsulation: v as RoofInsulationInput['currentInsulation'] })}
                  columns={3}
                />
              )}

              {currentStep === 4 && (
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
                        <span className="text-neutral-500">Materiaal ({estimate.surfaceArea} m²)</span>
                        <span className="font-medium">
                          {formatEUR(estimate.equipmentCost.min)} – {formatEUR(estimate.equipmentCost.max)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-500">Installatie</span>
                        <span className="font-medium">
                          {formatEUR(estimate.installationCost.min)} – {formatEUR(estimate.installationCost.max)}
                        </span>
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
                          key={estimate.estimatedPremium}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="font-medium text-accent-700"
                        >
                          – {formatEUR(estimate.estimatedPremium)}
                        </motion.span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-accent-600">Jaarlijkse besparing</span>
                        <span className="font-medium text-accent-700">
                          {formatEUR(estimate.annualSavings.min)} – {formatEUR(estimate.annualSavings.max)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-accent-600">Terugverdientijd</span>
                        <span className="font-medium text-accent-700">
                          {estimate.paybackYears.min} – {estimate.paybackYears.max} jaar
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="rounded-xl border border-primary-100 bg-primary-50/50 p-5">
                    <p className="text-sm font-semibold text-neutral-900 mb-1">Wil je exacte prijzen van erkende vakmensen?</p>
                    <p className="text-xs text-neutral-500 mb-4">Ontvang gratis en vrijblijvend offertes op maat.</p>
                    <button
                      onClick={() => setLeadModalOpen(true)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
                    >
                      Ontvang gratis offertes
                      <ArrowRight size={16} />
                    </button>
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-neutral-500">
                      <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-green-500" />Gratis &amp; vrijblijvend</span>
                      <span className="flex items-center gap-1"><Clock size={12} className="text-primary-500" />Reactie binnen 24u</span>
                      <span className="flex items-center gap-1"><Star size={12} className="text-yellow-400 fill-yellow-400" />4.8/5 score</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep((s) => s - 1)}
              disabled={!canGoBack}
              className="flex items-center gap-2 rounded-xl border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-30 transition-colors"
            >
              <ArrowLeft size={16} />
              Vorige
            </button>
            {canGoNext && (
              <button
                onClick={() => setCurrentStep((s) => s + 1)}
                className="flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
              >
                Volgende
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      <LeadCaptureModal
        open={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        projectType="dakisolatie"
        source="calculator_dakisolatie"
      />
    </>
  )
}
