import { useState } from 'react'
import { Sun, Wind, CloudSun, BatteryFull, BatteryLow, ArrowLeft, ArrowRight, ShieldCheck, Star, Clock, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { calculateSolarPanels, type SolarPanelInput } from '@/lib/calculator/solar-panels'
import { LeadCaptureModal } from '@/components/leads/LeadCaptureModal'
import { CalculatorStepCards } from '@/components/calculator/CalculatorStepCards'
import { formatEUR } from '@/lib/utils/format'

const steps = [
  { key: 'orientation', title: 'Dakoriëntatie', subtitle: 'In welke richting is je dak gericht?' },
  { key: 'panels', title: 'Aantal panelen', subtitle: 'Hoeveel zonnepanelen wil je plaatsen?' },
  { key: 'battery', title: 'Batterijopslag', subtitle: 'Wil je ook een thuisbatterij?' },
  { key: 'results', title: 'Resultaten', subtitle: 'Je geschatte kosten en opbrengst' },
]

const orientationOptions = [
  { value: 'south', label: 'Zuid', description: 'Optimale productie, max. rendement', icon: Sun },
  { value: 'east_west', label: 'Oost/West', description: 'Goede productie, gespreide opwekking', icon: CloudSun },
  { value: 'north', label: 'Noord', description: 'Beperkte productie, minder ideaal', icon: Wind },
]

const batteryOptions = [
  { value: 'yes', label: 'Ja, met batterij', description: 'Sla zelf opgewekte energie op', icon: BatteryFull },
  { value: 'no', label: 'Nee, zonder batterij', description: 'Enkel zonnepanelen zonder opslag', icon: BatteryLow },
]

export function SolarPanelCalculatorPage() {
  const [leadModalOpen, setLeadModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [input, setInput] = useState<SolarPanelInput>({
    roofOrientation: 'south',
    panelCount: 12,
    batteryStorage: false,
  })

  const estimate = calculateSolarPanels(input)

  const canGoNext = currentStep < steps.length - 1
  const canGoBack = currentStep > 0

  return (
    <>
      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Zonnepanelen kostenberekening
          </h1>
          <p className="mt-4 text-lg text-neutral-600">
            Bereken wat zonnepanelen kosten en opbrengen voor jouw woning.
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
                  options={orientationOptions}
                  selected={input.roofOrientation}
                  onSelect={(v) => setInput({ ...input, roofOrientation: v as SolarPanelInput['roofOrientation'] })}
                  columns={3}
                />
              )}

              {currentStep === 1 && (
                <div className="max-w-md">
                  <div className="flex items-end justify-between mb-4">
                    <span className="text-4xl font-bold text-primary-700">{input.panelCount}</span>
                    <span className="text-lg text-neutral-500">panelen ({(input.panelCount * 0.4).toFixed(1)} kWp)</span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={30}
                    step={1}
                    value={input.panelCount}
                    onChange={(e) => setInput({ ...input, panelCount: Number(e.target.value) })}
                    className="w-full accent-primary-600"
                  />
                  <div className="mt-2 flex justify-between text-xs text-neutral-400">
                    <span>4 panelen</span>
                    <span>30 panelen</span>
                  </div>
                  <p className="mt-3 text-xs text-neutral-400">
                    Gemiddeld gezin verbruikt ±3.500 kWh/jaar — 8-12 panelen volstaat doorgaans.
                  </p>
                </div>
              )}

              {currentStep === 2 && (
                <CalculatorStepCards
                  options={batteryOptions}
                  selected={input.batteryStorage ? 'yes' : 'no'}
                  onSelect={(v) => setInput({ ...input, batteryStorage: v === 'yes' })}
                  columns={2}
                />
              )}

              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Production highlight */}
                  <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                        <Zap size={20} className="text-yellow-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-yellow-800">Jaarlijkse productie</h3>
                    </div>
                    <motion.p
                      key={estimate.annualProduction}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-3xl font-bold text-yellow-700"
                    >
                      ±{estimate.annualProduction.toLocaleString('nl-BE')} kWh/jaar
                    </motion.p>
                    <p className="mt-1 text-sm text-yellow-600">{estimate.panelCount} panelen × 400 Wp = {estimate.totalKwp.toFixed(1)} kWp</p>
                  </div>

                  {/* Cost breakdown */}
                  <div className="rounded-xl border border-neutral-100 bg-white p-6">
                    <h3 className="text-lg font-semibold text-neutral-900">Geschatte investering</h3>
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between border-t border-neutral-100 pt-3 text-base font-semibold">
                        <span>Totaal incl. plaatsing</span>
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

                  {/* Savings */}
                  <div className="rounded-xl border border-accent-200 bg-accent-50 p-6">
                    <h3 className="text-lg font-semibold text-accent-700">Besparing</h3>
                    <div className="mt-4 space-y-3">
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
                      <div className="flex justify-between text-sm">
                        <span className="text-accent-600">BTW-voordeel (6%)</span>
                        <span className="font-medium text-accent-700">Toepasbaar</span>
                      </div>
                    </div>
                  </div>

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
        projectType="zonnepanelen"
        source="calculator_zonnepanelen"
      />
    </>
  )
}
