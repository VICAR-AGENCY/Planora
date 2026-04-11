import { useState } from 'react'
import { Home, Building2, Building, Warehouse, Wind, Thermometer, Zap, ArrowLeft, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { calculateHeatPump, type HeatPumpInput } from '@/lib/calculator/heat-pump'
import { calculatePremium } from '@/lib/calculator/premium'
import { CalculatorStepCards } from '@/components/calculator/CalculatorStepCards'
import { CalculatorResults } from '@/components/calculator/CalculatorResults'

const steps = [
  { key: 'property', title: 'Woningtype', subtitle: 'Wat voor type woning heb je?' },
  { key: 'surface', title: 'Oppervlakte', subtitle: 'Hoe groot is je woning?' },
  { key: 'insulation', title: 'Isolatie', subtitle: 'Hoe goed is je woning geïsoleerd?' },
  { key: 'system', title: 'Warmtepomp', subtitle: 'Welk type warmtepomp?' },
  { key: 'results', title: 'Resultaten', subtitle: 'Je geschatte kosten en besparing' },
]

const propertyOptions = [
  { value: 'detached', label: 'Vrijstaand', description: 'Geen gedeelde muren', icon: Home },
  { value: 'semi-detached', label: 'Halfopen', description: 'Eén gedeelde muur', icon: Building2 },
  { value: 'terraced', label: 'Rijwoning', description: 'Twee gedeelde muren', icon: Building },
  { value: 'apartment', label: 'Appartement', description: 'In een gebouw', icon: Warehouse },
]

const insulationOptions = [
  { value: 'good', label: 'Goed', description: 'Recent gerenoveerd of nieuwbouw', icon: Thermometer },
  { value: 'average', label: 'Gemiddeld', description: 'Deels geïsoleerd', icon: Thermometer },
  { value: 'poor', label: 'Slecht', description: 'Geen recente renovatie', icon: Thermometer },
]

const systemOptions = [
  { value: 'air-water', label: 'Lucht-water', description: 'Meest populair, betaalbaar', icon: Wind },
  { value: 'ground-water', label: 'Grond-water', description: 'Meest efficiënt, hogere investering', icon: Thermometer },
  { value: 'hybrid', label: 'Hybride', description: 'Warmtepomp + bestaande ketel', icon: Zap },
]

export function HeatPumpCalculatorPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [input, setInput] = useState<HeatPumpInput>({
    propertyType: 'semi-detached',
    surfaceArea: 150,
    insulationLevel: 'average',
    systemType: 'air-water',
  })

  const estimate = calculateHeatPump(input)
  const premium = calculatePremium({
    systemType: input.systemType,
    region: 'flanders',
    incomeCategory: 'medium',
  })

  const canGoNext = currentStep < steps.length - 1
  const canGoBack = currentStep > 0

  return (
    <>
      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Warmtepomp kostenberekening
          </h1>
          <p className="mt-4 text-lg text-neutral-600">
            Bereken in 30 seconden wat een warmtepomp kost voor jouw woning.
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
                  options={propertyOptions}
                  selected={input.propertyType}
                  onSelect={(v) => setInput({ ...input, propertyType: v as HeatPumpInput['propertyType'] })}
                  columns={4}
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
                    min={50}
                    max={400}
                    step={10}
                    value={input.surfaceArea}
                    onChange={(e) => setInput({ ...input, surfaceArea: Number(e.target.value) })}
                    className="w-full accent-primary-600"
                  />
                  <div className="mt-2 flex justify-between text-xs text-neutral-400">
                    <span>50 m²</span>
                    <span>400 m²</span>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <CalculatorStepCards
                  options={insulationOptions}
                  selected={input.insulationLevel}
                  onSelect={(v) => setInput({ ...input, insulationLevel: v as HeatPumpInput['insulationLevel'] })}
                  columns={3}
                />
              )}

              {currentStep === 3 && (
                <CalculatorStepCards
                  options={systemOptions}
                  selected={input.systemType}
                  onSelect={(v) => setInput({ ...input, systemType: v as HeatPumpInput['systemType'] })}
                  columns={3}
                />
              )}

              {currentStep === 4 && (
                <CalculatorResults estimate={estimate} premium={premium} projectType="warmtepomp" source="calculator_warmtepomp" />
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
