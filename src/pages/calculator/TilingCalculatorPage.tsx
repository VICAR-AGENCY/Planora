import { useState } from 'react'
import { Grid3x3, LayoutGrid, Layers, ArrowLeft, ArrowRight, ShieldCheck, Star, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { calculateTiling, type TilingInput } from '@/lib/calculator/tiling'
import { LeadCaptureModal } from '@/components/leads/LeadCaptureModal'
import { CalculatorStepCards } from '@/components/calculator/CalculatorStepCards'
import { formatEUR } from '@/lib/utils/format'

const steps = [
  { key: 'tileType', title: 'Type tegelwerk', subtitle: 'Waar wil je tegels plaatsen?' },
  { key: 'surface', title: 'Oppervlakte', subtitle: 'Hoeveel m² wil je betegelen?' },
  { key: 'quality', title: 'Kwaliteit tegels', subtitle: 'Welk kwaliteitsniveau zoek je?' },
  { key: 'results', title: 'Resultaten', subtitle: 'Je geschatte kosten' },
]

const tileTypeOptions = [
  { value: 'floor', label: 'Vloertegels', description: 'Enkel vloer betegelen', icon: Grid3x3 },
  { value: 'wall', label: 'Wandtegels', description: 'Enkel wand betegelen', icon: LayoutGrid },
  { value: 'both', label: 'Vloer & wand', description: 'Combinatie vloer en wand', icon: Layers },
]

const qualityOptions = [
  { value: 'standard', label: 'Standaard', description: 'Degelijke tegels voor een goede prijs', icon: Grid3x3 },
  { value: 'premium', label: 'Premium', description: 'Hoogwaardig, breed assortiment', icon: LayoutGrid },
  { value: 'luxury', label: 'Luxe', description: 'Exclusieve materialen en afwerking', icon: Layers },
]

export function TilingCalculatorPage() {
  const [leadModalOpen, setLeadModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [input, setInput] = useState<TilingInput>({
    tileType: 'floor',
    surfaceArea: 25,
    tileQuality: 'standard',
  })

  const estimate = calculateTiling(input)

  const canGoNext = currentStep < steps.length - 1
  const canGoBack = currentStep > 0

  return (
    <>
      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Tegelwerken kostenberekening
          </h1>
          <p className="mt-4 text-lg text-neutral-600">
            Bereken wat tegelwerken kosten voor jouw project.
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
                  options={tileTypeOptions}
                  selected={input.tileType}
                  onSelect={(v) => setInput({ ...input, tileType: v as TilingInput['tileType'] })}
                  columns={3}
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
                    min={5}
                    max={100}
                    step={1}
                    value={input.surfaceArea}
                    onChange={(e) => setInput({ ...input, surfaceArea: Number(e.target.value) })}
                    className="w-full accent-primary-600"
                  />
                  <div className="mt-2 flex justify-between text-xs text-neutral-400">
                    <span>5 m²</span>
                    <span>100 m²</span>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <CalculatorStepCards
                  options={qualityOptions}
                  selected={input.tileQuality}
                  onSelect={(v) => setInput({ ...input, tileQuality: v as TilingInput['tileQuality'] })}
                  columns={3}
                />
              )}

              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="rounded-xl border border-neutral-100 bg-white p-6">
                    <h3 className="text-lg font-semibold text-neutral-900">Geschatte kosten</h3>
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-500">Tegels ({estimate.surfaceArea} m²)</span>
                        <span className="font-medium">
                          {formatEUR(estimate.equipmentCost.min)} – {formatEUR(estimate.equipmentCost.max)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-500">Plaatsing & afwerking</span>
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

                  <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-5 text-sm text-neutral-500">
                    Prijzen zijn inclusief materiaal, lijm, voeg en plaatsing. Exclusief sloopwerken of ondergrondvoorbereiding indien nodig.
                  </div>

                  <div className="rounded-xl border border-primary-100 bg-primary-50/50 p-5">
                    <p className="text-sm font-semibold text-neutral-900 mb-1">Wil je exacte prijzen van erkende tegelzetters?</p>
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
        projectType="tegelwerken"
        source="calculator_tegelwerken"
      />
    </>
  )
}
