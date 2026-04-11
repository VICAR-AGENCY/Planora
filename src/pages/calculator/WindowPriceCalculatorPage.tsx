import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Trash2,
  ArrowRight,
  Ruler,
  Layers,
  Frame,
  Settings2,
  Calculator,
  Info,
  Euro,
  ChevronDown,
  ChevronUp,
  Copy,
  ShieldCheck,
  Star,
  Clock,
} from 'lucide-react'
import {
  calculateWindowPrice,
  createDefaultWindow,
  type WindowItem,
  type WindowPriceInput,
} from '@/lib/calculator/window-price'
import { formatEUR } from '@/lib/utils/format'
import { cn } from '@/lib/utils/cn'
import { LeadCaptureModal } from '@/components/leads/LeadCaptureModal'

const materialOptions = [
  { value: 'pvc', label: 'PVC', description: 'Betaalbaar & onderhoudsvriendelijk' },
  { value: 'aluminium', label: 'Aluminium', description: 'Modern & duurzaam' },
  { value: 'wood', label: 'Hout', description: 'Warm & authentiek' },
]

const glazingOptions = [
  { value: 'double', label: 'Dubbel glas', description: 'U-waarde 1.1' },
  { value: 'triple', label: 'Triple glas', description: 'U-waarde 0.6' },
]

const openingOptions = [
  { value: 'fixed', label: 'Vast', description: 'Niet te openen' },
  { value: 'draaikip', label: 'Draai-kip', description: 'Standaard systeem' },
  { value: 'schuif', label: 'Schuifraam', description: 'Schuifsysteem' },
]

function WindowCard({
  window,
  index,
  onUpdate,
  onRemove,
  onDuplicate,
  canRemove,
}: {
  window: WindowItem
  index: number
  onUpdate: (window: WindowItem) => void
  onRemove: () => void
  onDuplicate: () => void
  canRemove: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(true)
  const area = ((window.width * window.height) / 10000).toFixed(2)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-xl border border-neutral-200 bg-white overflow-hidden"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 bg-neutral-50 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-700 font-bold text-sm">
            {index + 1}
          </div>
          <div>
            <input
              type="text"
              value={window.name}
              onChange={(e) => onUpdate({ ...window, name: e.target.value })}
              onClick={(e) => e.stopPropagation()}
              className="font-semibold text-neutral-900 bg-transparent border-none focus:outline-none focus:ring-0 w-32"
            />
            <p className="text-xs text-neutral-500">
              {window.width}×{window.height} cm • {area} m²
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDuplicate()
            }}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            title="Dupliceer raam"
          >
            <Copy size={16} />
          </button>
          {canRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onRemove()
              }}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Verwijder raam"
            >
              <Trash2 size={16} />
            </button>
          )}
          {isExpanded ? (
            <ChevronUp size={20} className="text-neutral-400" />
          ) : (
            <ChevronDown size={20} className="text-neutral-400" />
          )}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-5">
              {/* Dimensions */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Ruler size={16} className="text-primary-600" />
                  <span className="text-sm font-medium text-neutral-700">Afmetingen (cm)</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1">Breedte</label>
                    <input
                      type="number"
                      min={30}
                      max={400}
                      value={window.width}
                      onChange={(e) => onUpdate({ ...window, width: Number(e.target.value) })}
                      className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1">Hoogte</label>
                    <input
                      type="number"
                      min={30}
                      max={300}
                      value={window.height}
                      onChange={(e) => onUpdate({ ...window, height: Number(e.target.value) })}
                      className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Material */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Frame size={16} className="text-primary-600" />
                  <span className="text-sm font-medium text-neutral-700">Materiaal</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {materialOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => onUpdate({ ...window, material: opt.value as WindowItem['material'] })}
                      className={cn(
                        'rounded-lg border p-2.5 text-left transition-all',
                        window.material === opt.value
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-neutral-200 hover:border-primary-300'
                      )}
                    >
                      <p
                        className={cn(
                          'text-sm font-medium',
                          window.material === opt.value ? 'text-primary-700' : 'text-neutral-700'
                        )}
                      >
                        {opt.label}
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">{opt.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Glazing */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Layers size={16} className="text-primary-600" />
                  <span className="text-sm font-medium text-neutral-700">Beglazing</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {glazingOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => onUpdate({ ...window, glazing: opt.value as WindowItem['glazing'] })}
                      className={cn(
                        'rounded-lg border p-2.5 text-left transition-all',
                        window.glazing === opt.value
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-neutral-200 hover:border-primary-300'
                      )}
                    >
                      <p
                        className={cn(
                          'text-sm font-medium',
                          window.glazing === opt.value ? 'text-primary-700' : 'text-neutral-700'
                        )}
                      >
                        {opt.label}
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">{opt.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Opening type */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Settings2 size={16} className="text-primary-600" />
                  <span className="text-sm font-medium text-neutral-700">Openingstype</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {openingOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => onUpdate({ ...window, opening: opt.value as WindowItem['opening'] })}
                      className={cn(
                        'rounded-lg border p-2.5 text-left transition-all',
                        window.opening === opt.value
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-neutral-200 hover:border-primary-300'
                      )}
                    >
                      <p
                        className={cn(
                          'text-sm font-medium',
                          window.opening === opt.value ? 'text-primary-700' : 'text-neutral-700'
                        )}
                      >
                        {opt.label}
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">{opt.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function WindowPriceCalculatorPage() {
  const [leadModalOpen, setLeadModalOpen] = useState(false)
  const [windows, setWindows] = useState<WindowItem[]>([createDefaultWindow(1)])
  const [options, setOptions] = useState({
    includeInstallation: true,
    includeDemolition: true,
    includeFinishing: true,
  })

  const input: WindowPriceInput = {
    windows,
    ...options,
  }

  const result = calculateWindowPrice(input)
  const totalArea = result.windows.reduce((sum, w) => sum + w.area, 0)

  const addWindow = () => {
    setWindows([...windows, createDefaultWindow(windows.length + 1)])
  }

  const updateWindow = (id: string, updated: WindowItem) => {
    setWindows(windows.map((w) => (w.id === id ? updated : w)))
  }

  const removeWindow = (id: string) => {
    setWindows(windows.filter((w) => w.id !== id))
  }

  const duplicateWindow = (window: WindowItem) => {
    const newWindow = {
      ...window,
      id: Math.random().toString(36).substring(2, 9),
      name: `${window.name} (kopie)`,
    }
    setWindows([...windows, newWindow])
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700 mb-6">
            <Calculator size={16} />
            Raamprijs Calculator
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Bereken de prijs van je nieuwe ramen
          </h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            Voeg je ramen toe met exacte afmetingen en krijg direct een gedetailleerde prijsindicatie.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-neutral-50 py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left: Window configuration */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-neutral-900">Jouw ramen</h2>
                <span className="text-sm text-neutral-500">
                  {windows.length} raam{windows.length !== 1 ? 'en' : ''} • {totalArea.toFixed(2)} m²
                </span>
              </div>

              <AnimatePresence mode="popLayout">
                {windows.map((window, index) => (
                  <WindowCard
                    key={window.id}
                    window={window}
                    index={index}
                    onUpdate={(updated) => updateWindow(window.id, updated)}
                    onRemove={() => removeWindow(window.id)}
                    onDuplicate={() => duplicateWindow(window)}
                    canRemove={windows.length > 1}
                  />
                ))}
              </AnimatePresence>

              <motion.button
                onClick={addWindow}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary-300 bg-primary-50 py-4 text-primary-700 font-medium hover:border-primary-400 hover:bg-primary-100 transition-colors"
              >
                <Plus size={20} />
                Voeg raam toe
              </motion.button>

              {/* Extra options */}
              <div className="rounded-xl border border-neutral-200 bg-white p-4 mt-6">
                <h3 className="font-semibold text-neutral-900 mb-4">Extra diensten</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options.includeInstallation}
                      onChange={(e) => setOptions({ ...options, includeInstallation: e.target.checked })}
                      className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-neutral-700">Plaatsing inbegrepen</span>
                    <span className="text-xs text-neutral-400 ml-auto">€180/raam</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options.includeDemolition}
                      onChange={(e) => setOptions({ ...options, includeDemolition: e.target.checked })}
                      className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-neutral-700">Afbraak oude ramen</span>
                    <span className="text-xs text-neutral-400 ml-auto">€120/raam</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options.includeFinishing}
                      onChange={(e) => setOptions({ ...options, includeFinishing: e.target.checked })}
                      className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-neutral-700">Afwerking (pleisterwerk, schilderen)</span>
                    <span className="text-xs text-neutral-400 ml-auto">€85/raam</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Price summary */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 space-y-4">
                {/* Main price card */}
                <motion.div
                  className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                  layout
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Euro size={20} className="text-primary-600" />
                    <h3 className="text-lg font-semibold text-neutral-900">Prijsoverzicht</h3>
                  </div>

                  <div className="space-y-3 text-sm">
                    {/* Per window breakdown */}
                    {result.windows.map((w) => (
                      <div key={w.item.id} className="flex justify-between text-neutral-600">
                        <span className="truncate max-w-[140px]">
                          {w.item.name} ({w.area} m²)
                        </span>
                        <span className="font-medium">{formatEUR(w.totalPrice)}</span>
                      </div>
                    ))}

                    <div className="border-t border-neutral-100 pt-3">
                      <div className="flex justify-between text-neutral-600">
                        <span>Subtotaal ramen</span>
                        <span className="font-medium">{formatEUR(result.subtotal)}</span>
                      </div>
                    </div>

                    {options.includeInstallation && (
                      <div className="flex justify-between text-neutral-600">
                        <span>Plaatsing</span>
                        <span className="font-medium">{formatEUR(result.installationCost)}</span>
                      </div>
                    )}

                    {options.includeDemolition && (
                      <div className="flex justify-between text-neutral-600">
                        <span>Afbraak</span>
                        <span className="font-medium">{formatEUR(result.demolitionCost)}</span>
                      </div>
                    )}

                    {options.includeFinishing && (
                      <div className="flex justify-between text-neutral-600">
                        <span>Afwerking</span>
                        <span className="font-medium">{formatEUR(result.finishingCost)}</span>
                      </div>
                    )}

                    <div className="border-t border-neutral-100 pt-3">
                      <div className="flex justify-between text-neutral-600">
                        <span>Totaal excl. BTW</span>
                        <span className="font-medium">{formatEUR(result.totalBeforeVAT)}</span>
                      </div>
                      <div className="flex justify-between text-neutral-500 text-xs mt-1">
                        <span>BTW 6% (renovatie)</span>
                        <span>{formatEUR(result.vat)}</span>
                      </div>
                    </div>

                    <div className="border-t border-neutral-200 pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-neutral-900">Totaal incl. BTW</span>
                        <motion.span
                          key={result.totalWithVAT}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-2xl font-bold text-primary-700"
                        >
                          {formatEUR(result.totalWithVAT)}
                        </motion.span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-1 text-right">
                        {formatEUR(result.pricePerM2)}/m²
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Premium info */}
                <div className="rounded-xl border border-accent-200 bg-accent-50 p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-200 text-accent-700">
                      <Info size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-accent-800">Vlaamse premie</h4>
                      <p className="text-sm text-accent-700 mt-1">
                        Geschatte premie: <strong>{formatEUR(result.estimatedPremium)}</strong>
                      </p>
                      <p className="text-xs text-accent-600 mt-2">
                        Tot €400/raam, max €4.000. Je woning moet minstens 15 jaar oud zijn.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="rounded-xl border border-primary-100 bg-primary-50/50 p-5">
                  <p className="text-sm font-semibold text-neutral-900 mb-1">Wil je exacte prijzen van erkende vakmensen?</p>
                  <p className="text-xs text-neutral-500 mb-4">Ontvang gratis en vrijblijvend offertes op maat.</p>
                  <button
                    onClick={() => setLeadModalOpen(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-4 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info section */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Hoe berekenen we de prijs?</h2>
          <div className="prose prose-neutral prose-sm">
            <p>
              Onze calculator gebruikt actuele marktprijzen van Belgische raambouwers om een realistische
              indicatie te geven. De prijs is gebaseerd op:
            </p>
            <ul>
              <li>
                <strong>Materiaal:</strong> PVC is het voordeligst, hout het duurst maar ook het warmst
              </li>
              <li>
                <strong>Beglazing:</strong> Triple glas isoleert beter maar kost meer
              </li>
              <li>
                <strong>Openingstype:</strong> Draai-kip en schuiframen hebben complexer beslag
              </li>
              <li>
                <strong>Afmetingen:</strong> Groter = duurder, maar de prijs per m² daalt bij grotere ramen
              </li>
            </ul>
            <p>
              De werkelijke prijs kan afwijken afhankelijk van toegankelijkheid, extra opties (zoals
              inbraakwerend glas) en regionale prijsverschillen.
            </p>
          </div>
        </div>
      </section>

      <LeadCaptureModal
        open={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        projectType="ramen-deuren"
        source="calculator_ramen_deuren"
      />
    </>
  )
}
