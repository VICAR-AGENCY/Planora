import { useState } from 'react'
import { Columns2, LayoutGrid, TreePine, Layers, Layers2, DoorOpen, ArrowLeft, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { calculateWindowsDoors, type WindowsDoorInput } from '@/lib/calculator/windows-doors'
import { CalculatorStepCards } from '@/components/calculator/CalculatorStepCards'
import { formatEUR } from '@/lib/utils/format'

const steps = [
  { key: 'windowType', title: 'Raamtype', subtitle: 'Welk materiaal wil je voor je ramen?' },
  { key: 'glazing', title: 'Beglazing', subtitle: 'Welk type beglazing wil je?' },
  { key: 'count', title: 'Aantal', subtitle: 'Hoeveel ramen en deuren wil je vervangen?' },
  { key: 'results', title: 'Resultaten', subtitle: 'Je geschatte kosten en besparing' },
]

const windowTypeOptions = [
  { value: 'pvc', label: 'PVC', description: 'Betaalbaar en onderhoudsvriendelijk', icon: Columns2 },
  { value: 'aluminium', label: 'Aluminium', description: 'Strak en duurzaam', icon: LayoutGrid },
  { value: 'wood', label: 'Hout', description: 'Warm en authentiek', icon: TreePine },
]

const glazingOptions = [
  { value: 'double', label: 'Dubbel glas', description: 'Standaard isolerend glas', icon: Layers },
  { value: 'triple', label: 'Driedubbel glas', description: 'Maximale isolatie', icon: Layers2 },
]

export function WindowsDoorCalculatorPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [input, setInput] = useState<WindowsDoorInput>({
    windowType: 'pvc',
    glazingType: 'double',
    windowCount: 6,
    doorCount: 1,
  })

  const estimate = calculateWindowsDoors(input)

  const canGoNext = currentStep < steps.length - 1
  const canGoBack = currentStep > 0

  return (
    <>
      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Ramen & deuren kostenberekening
          </h1>
          <p className="mt-4 text-lg text-neutral-600">
            Bereken wat nieuwe ramen en deuren kosten voor jouw woning.
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
                  options={windowTypeOptions}
                  selected={input.windowType}
                  onSelect={(v) => setInput({ ...input, windowType: v as WindowsDoorInput['windowType'] })}
                  columns={3}
                />
              )}

              {currentStep === 1 && (
                <CalculatorStepCards
                  options={glazingOptions}
                  selected={input.glazingType}
                  onSelect={(v) => setInput({ ...input, glazingType: v as WindowsDoorInput['glazingType'] })}
                  columns={2}
                />
              )}

              {currentStep === 2 && (
                <div className="space-y-8 max-w-md">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Columns2 size={20} className="text-primary-600" />
                      <span className="font-medium text-neutral-700">Aantal ramen</span>
                    </div>
                    <div className="flex items-end justify-between mb-4">
                      <span className="text-4xl font-bold text-primary-700">{input.windowCount}</span>
                      <span className="text-lg text-neutral-500">ramen</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      step={1}
                      value={input.windowCount}
                      onChange={(e) => setInput({ ...input, windowCount: Number(e.target.value) })}
                      className="w-full accent-primary-600"
                    />
                    <div className="mt-2 flex justify-between text-xs text-neutral-400">
                      <span>1</span>
                      <span>20</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <DoorOpen size={20} className="text-primary-600" />
                      <span className="font-medium text-neutral-700">Aantal deuren</span>
                    </div>
                    <div className="flex items-end justify-between mb-4">
                      <span className="text-4xl font-bold text-primary-700">{input.doorCount}</span>
                      <span className="text-lg text-neutral-500">deuren</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={5}
                      step={1}
                      value={input.doorCount}
                      onChange={(e) => setInput({ ...input, doorCount: Number(e.target.value) })}
                      className="w-full accent-primary-600"
                    />
                    <div className="mt-2 flex justify-between text-xs text-neutral-400">
                      <span>0</span>
                      <span>5</span>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
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
                        <span className="text-neutral-500">
                          Ramen ({estimate.windowCount}) & deuren ({estimate.doorCount})
                        </span>
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
                  <Link
                    to="/app/nieuw-project"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
                  >
                    Wil je exactere prijzen? Start je project
                    <ArrowRight size={16} />
                  </Link>
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
    </>
  )
}
