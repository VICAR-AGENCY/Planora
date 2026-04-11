import { useState } from 'react'
import {
  Thermometer, Home, Layers as LayersIcon,
  House, Building, LayoutPanelLeft, Rows3,
  CheckCircle2, Minus, AlertCircle,
  Banknote, Calendar,
  ClipboardCheck, MapPin, Ruler,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { LocationSearch } from '@/components/leads/LocationSearch'
import type { IntakeStep, IntakeProjectData } from '@/types/intake'

interface StepViewProps {
  step: IntakeStep
  projectData: Partial<IntakeProjectData>
  onNext: (data: Partial<IntakeProjectData>) => void
  onBack: () => void
  onConfirm: () => void
  isConfirming: boolean
  confirmError?: string | null
}

// ─── Option card ────────────────────────────────────────────────────────────

function OptionCard({
  icon: Icon,
  label,
  sublabel,
  selected,
  onClick,
}: {
  icon: React.ElementType
  label: string
  sublabel?: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex flex-col items-center gap-3 rounded-2xl border-2 p-5 text-center transition-all',
        selected
          ? 'border-primary-600 bg-primary-50 text-primary-700'
          : 'border-neutral-200 bg-white text-neutral-600 hover:border-primary-300 hover:bg-primary-50/40'
      )}
    >
      <div className={cn('rounded-xl p-3', selected ? 'bg-primary-100' : 'bg-neutral-100')}>
        <Icon size={26} className={selected ? 'text-primary-600' : 'text-neutral-400'} />
      </div>
      <div>
        <p className="text-sm font-semibold leading-tight">{label}</p>
        {sublabel && <p className="mt-0.5 text-xs text-neutral-400">{sublabel}</p>}
      </div>
    </button>
  )
}

// ─── Step shell ─────────────────────────────────────────────────────────────

function StepShell({
  icon: Icon,
  title,
  subtitle,
  children,
  canContinue,
  onNext,
  onBack,
  showBack,
}: {
  icon: React.ElementType
  title: string
  subtitle?: string
  children: React.ReactNode
  canContinue: boolean
  onNext: () => void
  onBack: () => void
  showBack: boolean
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100">
            <Icon size={32} className="text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
          {subtitle && <p className="mt-1.5 text-sm text-neutral-500">{subtitle}</p>}
        </div>

        {/* Content */}
        <div className="mb-8">{children}</div>

        {/* Navigation */}
        <div className="flex gap-3">
          {showBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex-1 rounded-xl border border-neutral-200 py-3 text-sm font-semibold text-neutral-600 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
            >
              Terug
            </button>
          )}
          <button
            type="button"
            onClick={onNext}
            disabled={!canContinue}
            className="flex-1 rounded-xl bg-primary-600 py-3 text-sm font-semibold text-white shadow-sm shadow-primary-600/20 transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Volgende
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Individual steps ────────────────────────────────────────────────────────

function CategoryStep({ data, onNext, onBack }: { data: Partial<IntakeProjectData>; onNext: (d: Partial<IntakeProjectData>) => void; onBack: () => void }) {
  const [selected, setSelected] = useState(data.category ?? '')

  const options = [
    { value: 'warmtepomp', label: 'Warmtepomp', sublabel: 'Verwarming & koeling', icon: Thermometer },
    { value: 'ramen_deuren', label: 'Ramen & deuren', sublabel: 'Beglazing & schrijnwerk', icon: LayoutPanelLeft },
    { value: 'dakisolatie', label: 'Dakisolatie', sublabel: 'Isolatie & renovatie', icon: Home },
  ]

  return (
    <StepShell
      icon={LayersIcon}
      title="Welk project heb je in gedachten?"
      subtitle="Kies het type werk dat je wilt laten uitvoeren."
      canContinue={!!selected}
      onNext={() => onNext({ category: selected })}
      onBack={onBack}
      showBack={false}
    >
      <div className="grid grid-cols-3 gap-3">
        {options.map((o) => (
          <OptionCard
            key={o.value}
            icon={o.icon}
            label={o.label}
            sublabel={o.sublabel}
            selected={selected === o.value}
            onClick={() => setSelected(o.value)}
          />
        ))}
      </div>
    </StepShell>
  )
}

function PropertyTypeStep({ data, onNext, onBack }: { data: Partial<IntakeProjectData>; onNext: (d: Partial<IntakeProjectData>) => void; onBack: () => void }) {
  const [selected, setSelected] = useState(data.property_type ?? '')

  const options = [
    { value: 'vrijstaand', label: 'Vrijstaand', sublabel: 'Alleenstaande woning', icon: House },
    { value: 'halfopen', label: 'Halfopen', sublabel: 'Semi-vrijstaand', icon: LayoutPanelLeft },
    { value: 'rijwoning', label: 'Rijwoning', sublabel: 'Tussenwoning', icon: Rows3 },
    { value: 'appartement', label: 'Appartement', sublabel: 'Flat of studio', icon: Building },
  ]

  return (
    <StepShell
      icon={Building}
      title="Wat voor woning heb je?"
      subtitle="Het type woning bepaalt mee de complexiteit van het project."
      canContinue={!!selected}
      onNext={() => onNext({ property_type: selected })}
      onBack={onBack}
      showBack
    >
      <div className="grid grid-cols-2 gap-3">
        {options.map((o) => (
          <OptionCard
            key={o.value}
            icon={o.icon}
            label={o.label}
            sublabel={o.sublabel}
            selected={selected === o.value}
            onClick={() => setSelected(o.value)}
          />
        ))}
      </div>
    </StepShell>
  )
}

function SurfaceStep({ data, onNext, onBack }: { data: Partial<IntakeProjectData>; onNext: (d: Partial<IntakeProjectData>) => void; onBack: () => void }) {
  const [value, setValue] = useState(data.surface_area ? String(data.surface_area) : '')
  const num = parseInt(value, 10)
  const valid = !isNaN(num) && num >= 20 && num <= 2000

  return (
    <StepShell
      icon={Ruler}
      title="Wat is de oppervlakte van je woning?"
      subtitle="Een schatting is voldoende — installateurs houden hier rekening mee."
      canContinue={valid}
      onNext={() => onNext({ surface_area: num })}
      onBack={onBack}
      showBack
    >
      <div className="flex items-center gap-3 rounded-2xl border-2 border-neutral-200 bg-white px-5 py-4 focus-within:border-primary-500 transition-colors">
        <input
          type="number"
          min={20}
          max={2000}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="150"
          className="flex-1 bg-transparent text-2xl font-bold text-neutral-900 outline-none placeholder:text-neutral-300"
          autoFocus
        />
        <span className="text-lg font-medium text-neutral-400">m²</span>
      </div>
      {value && !valid && (
        <p className="mt-2 text-center text-xs text-red-500">Vul een oppervlakte in tussen 20 en 2000 m²</p>
      )}
    </StepShell>
  )
}

function InsulationStep({ data, onNext, onBack }: { data: Partial<IntakeProjectData>; onNext: (d: Partial<IntakeProjectData>) => void; onBack: () => void }) {
  const [selected, setSelected] = useState(data.insulation_level ?? '')

  const options = [
    { value: 'goed', label: 'Goed', sublabel: 'Recent gerenoveerd of nieuwbouw', icon: CheckCircle2 },
    { value: 'gemiddeld', label: 'Gemiddeld', sublabel: 'Gedeeltelijk geïsoleerd', icon: Minus },
    { value: 'slecht', label: 'Slecht', sublabel: 'Geen recente renovatie', icon: AlertCircle },
  ]

  return (
    <StepShell
      icon={LayersIcon}
      title="Hoe is de huidige isolatie van je woning?"
      subtitle="Dit helpt installateurs een betere inschatting te maken."
      canContinue={!!selected}
      onNext={() => onNext({ insulation_level: selected })}
      onBack={onBack}
      showBack
    >
      <div className="grid grid-cols-3 gap-3">
        {options.map((o) => (
          <OptionCard
            key={o.value}
            icon={o.icon}
            label={o.label}
            sublabel={o.sublabel}
            selected={selected === o.value}
            onClick={() => setSelected(o.value)}
          />
        ))}
      </div>
    </StepShell>
  )
}

function LocationStep({ data, onNext, onBack }: { data: Partial<IntakeProjectData>; onNext: (d: Partial<IntakeProjectData>) => void; onBack: () => void }) {
  const [loc, setLoc] = useState<{ label: string; city?: string; postcode?: string; lat?: number; lon?: number } | null>(
    data.city ? { label: `${data.city}${data.postal_code ? ` (${data.postal_code})` : ''}`, city: data.city, postcode: data.postal_code, lat: data.lat, lon: data.lon } : null
  )

  return (
    <StepShell
      icon={MapPin}
      title="Waar woon je?"
      subtitle="Wij zoeken installateurs in jouw buurt."
      canContinue={loc !== null}
      onNext={() =>
        onNext({
          city: loc?.city ?? '',
          postal_code: loc?.postcode ?? '',
          lat: loc?.lat,
          lon: loc?.lon,
        })
      }
      onBack={onBack}
      showBack
    >
      <LocationSearch
        value={loc}
        onChange={setLoc}
        placeholder="Zoek je gemeente of postcode..."
      />
    </StepShell>
  )
}

function BudgetStep({ data, onNext, onBack }: { data: Partial<IntakeProjectData>; onNext: (d: Partial<IntakeProjectData>) => void; onBack: () => void }) {
  const [selected, setSelected] = useState(data.budget_range ?? '')

  const options = [
    { value: '<10000', label: '< €10.000', sublabel: 'Kleinere ingreep' },
    { value: '10000-15000', label: '€10.000 – €15.000', sublabel: '' },
    { value: '15000-25000', label: '€15.000 – €25.000', sublabel: '' },
    { value: '>25000', label: '> €25.000', sublabel: 'Grote renovatie' },
  ]

  return (
    <StepShell
      icon={Banknote}
      title="Wat is je budget?"
      subtitle="Een ruwe schatting volstaat. Installateurs geven een vrijblijvende offerte."
      canContinue={!!selected}
      onNext={() => onNext({ budget_range: selected })}
      onBack={onBack}
      showBack
    >
      <div className="grid grid-cols-2 gap-3">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => setSelected(o.value)}
            className={cn(
              'rounded-2xl border-2 px-5 py-4 text-left transition-all',
              selected === o.value
                ? 'border-primary-600 bg-primary-50'
                : 'border-neutral-200 bg-white hover:border-primary-300 hover:bg-primary-50/40'
            )}
          >
            <p className={cn('text-sm font-bold', selected === o.value ? 'text-primary-700' : 'text-neutral-800')}>{o.label}</p>
            {o.sublabel && <p className="mt-0.5 text-xs text-neutral-400">{o.sublabel}</p>}
          </button>
        ))}
      </div>
    </StepShell>
  )
}

function TimelineStep({ data, onNext, onBack }: { data: Partial<IntakeProjectData>; onNext: (d: Partial<IntakeProjectData>) => void; onBack: () => void }) {
  const [selected, setSelected] = useState(data.timeline ?? '')

  const options = [
    { value: 'zo_snel_mogelijk', label: 'Zo snel mogelijk', sublabel: 'Ik wil snel starten', icon: CheckCircle2 },
    { value: 'dit_jaar', label: 'Dit jaar', sublabel: 'Binnen 12 maanden', icon: Calendar },
    { value: 'volgend_jaar', label: 'Volgend jaar', sublabel: 'Ik ben aan het plannen', icon: Calendar },
    { value: 'nog_niet_zeker', label: 'Nog niet zeker', sublabel: 'Ik oriënteer me', icon: Minus },
  ]

  return (
    <StepShell
      icon={Calendar}
      title="Wanneer wil je starten?"
      subtitle="Dit helpt installateurs hun planning te organiseren."
      canContinue={!!selected}
      onNext={() => onNext({ timeline: selected })}
      onBack={onBack}
      showBack
    >
      <div className="grid grid-cols-2 gap-3">
        {options.map((o) => (
          <OptionCard
            key={o.value}
            icon={o.icon}
            label={o.label}
            sublabel={o.sublabel}
            selected={selected === o.value}
            onClick={() => setSelected(o.value)}
          />
        ))}
      </div>
    </StepShell>
  )
}

const CATEGORY_LABELS: Record<string, string> = {
  warmtepomp: 'Warmtepomp',
  ramen_deuren: 'Ramen & deuren',
  dakisolatie: 'Dakisolatie',
}
const PROPERTY_LABELS: Record<string, string> = {
  vrijstaand: 'Vrijstaand',
  halfopen: 'Halfopen',
  rijwoning: 'Rijwoning',
  appartement: 'Appartement',
}
const INSULATION_LABELS: Record<string, string> = {
  goed: 'Goed',
  gemiddeld: 'Gemiddeld',
  slecht: 'Slecht',
}
const BUDGET_LABELS: Record<string, string> = {
  '<10000': '< €10.000',
  '10000-15000': '€10.000 – €15.000',
  '15000-25000': '€15.000 – €25.000',
  '>25000': '> €25.000',
}
const TIMELINE_LABELS: Record<string, string> = {
  zo_snel_mogelijk: 'Zo snel mogelijk',
  dit_jaar: 'Dit jaar',
  volgend_jaar: 'Volgend jaar',
  nog_niet_zeker: 'Nog niet zeker',
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-neutral-500">{label}</span>
      <span className="text-sm font-semibold text-neutral-900">{value ?? '—'}</span>
    </div>
  )
}

function SummaryStep({
  data,
  onBack,
  onConfirm,
  isConfirming,
  confirmError,
}: {
  data: Partial<IntakeProjectData>
  onBack: () => void
  onConfirm: () => void
  isConfirming: boolean
  confirmError?: string | null
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100">
            <ClipboardCheck size={32} className="text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900">Controleer je gegevens</h2>
          <p className="mt-1.5 text-sm text-neutral-500">Alles correct? Dan sturen we je aanvraag naar installateurs in jouw regio.</p>
        </div>

        <div className="mb-8 divide-y divide-neutral-100 rounded-2xl border border-neutral-200 bg-white px-6">
          <SummaryRow label="Project" value={CATEGORY_LABELS[data.category ?? '']} />
          <SummaryRow label="Woningtype" value={PROPERTY_LABELS[data.property_type ?? '']} />
          <SummaryRow label="Oppervlakte" value={data.surface_area ? `${data.surface_area} m²` : undefined} />
          <SummaryRow label="Isolatie" value={INSULATION_LABELS[data.insulation_level ?? '']} />
          <SummaryRow label="Locatie" value={data.city ? `${data.city}${data.postal_code ? ` (${data.postal_code})` : ''}` : undefined} />
          <SummaryRow label="Budget" value={BUDGET_LABELS[data.budget_range ?? '']} />
          <SummaryRow label="Tijdstip" value={TIMELINE_LABELS[data.timeline ?? '']} />
        </div>

        {confirmError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {confirmError}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-xl border border-neutral-200 py-3 text-sm font-semibold text-neutral-600 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
          >
            Terug
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isConfirming}
            className="flex-1 rounded-xl bg-primary-600 py-3 text-sm font-semibold text-white shadow-sm shadow-primary-600/20 transition-colors hover:bg-primary-700 disabled:opacity-50"
          >
            {isConfirming ? 'Aanmaken...' : 'Bevestig project'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function StepView({ step, projectData, onNext, onBack, onConfirm, isConfirming, confirmError }: StepViewProps) {
  switch (step) {
    case 'category':
      return <CategoryStep data={projectData} onNext={onNext} onBack={onBack} />
    case 'property_type':
      return <PropertyTypeStep data={projectData} onNext={onNext} onBack={onBack} />
    case 'surface':
      return <SurfaceStep data={projectData} onNext={onNext} onBack={onBack} />
    case 'insulation':
      return <InsulationStep data={projectData} onNext={onNext} onBack={onBack} />
    case 'location':
      return <LocationStep data={projectData} onNext={onNext} onBack={onBack} />
    case 'budget':
      return <BudgetStep data={projectData} onNext={onNext} onBack={onBack} />
    case 'timeline':
      return <TimelineStep data={projectData} onNext={onNext} onBack={onBack} />
    case 'summary':
      return <SummaryStep data={projectData} onBack={onBack} onConfirm={onConfirm} isConfirming={isConfirming} confirmError={confirmError} />
  }
}
