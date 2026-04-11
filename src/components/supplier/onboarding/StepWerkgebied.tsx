import { useState } from 'react'
import { X, ChevronRight, Check, CheckSquare, Square } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { OnboardingData } from './types'
import { BelgiumMap, PROVINCES, type CityPin } from './BelgiumMap'

// ── Data: cities with coordinates ────────────────────────────────────────────

type City = { label: string; prefix: string; lat: number; lon: number }

const PROVINCE_CITIES: Record<string, City[]> = {
  'antwerpen': [
    { label: 'Antwerpen',  prefix: '2000', lat: 51.2194, lon: 4.4025 },
    { label: 'Mechelen',   prefix: '2800', lat: 51.0280, lon: 4.4777 },
    { label: 'Turnhout',   prefix: '2300', lat: 51.3227, lon: 4.9431 },
    { label: 'Lier',       prefix: '2500', lat: 51.1306, lon: 4.5694 },
    { label: 'Herentals',  prefix: '2200', lat: 51.1767, lon: 4.8378 },
    { label: 'Mol',        prefix: '2400', lat: 51.1900, lon: 5.1144 },
  ],
  'oost-vlaanderen': [
    { label: 'Gent',        prefix: '9000', lat: 51.0543, lon: 3.7174 },
    { label: 'Aalst',       prefix: '9300', lat: 50.9389, lon: 4.0371 },
    { label: 'Sint-Niklaas',prefix: '9100', lat: 51.1658, lon: 4.1428 },
    { label: 'Dendermonde', prefix: '9200', lat: 51.0289, lon: 4.1008 },
    { label: 'Ronse',       prefix: '9600', lat: 50.7436, lon: 3.5992 },
    { label: 'Oudenaarde',  prefix: '9700', lat: 50.8444, lon: 3.6069 },
  ],
  'west-vlaanderen': [
    { label: 'Brugge',    prefix: '8000', lat: 51.2093, lon: 3.2247 },
    { label: 'Kortrijk',  prefix: '8500', lat: 50.8282, lon: 3.2647 },
    { label: 'Roeselare', prefix: '8800', lat: 50.9469, lon: 3.1222 },
    { label: 'Oostende',  prefix: '8400', lat: 51.2295, lon: 2.9163 },
    { label: 'Ieper',     prefix: '8900', lat: 50.8514, lon: 2.8820 },
    { label: 'Veurne',    prefix: '8630', lat: 51.0727, lon: 2.6635 },
  ],
  'vlaams-brabant': [
    { label: 'Leuven',    prefix: '3000', lat: 50.8798, lon: 4.7005 },
    { label: 'Halle',     prefix: '1500', lat: 50.7356, lon: 4.2356 },
    { label: 'Vilvoorde', prefix: '1800', lat: 50.9286, lon: 4.4253 },
    { label: 'Diest',     prefix: '3290', lat: 50.9897, lon: 5.0514 },
    { label: 'Tienen',    prefix: '3300', lat: 50.8053, lon: 4.9381 },
    { label: 'Aarschot',  prefix: '3200', lat: 50.9861, lon: 4.8344 },
  ],
  'brussel': [
    { label: 'Brussel-Stad', prefix: '1000', lat: 50.8503, lon: 4.3517 },
    { label: 'Etterbeek',    prefix: '1040', lat: 50.8381, lon: 4.3869 },
    { label: 'Anderlecht',   prefix: '1070', lat: 50.8356, lon: 4.3072 },
    { label: 'Schaarbeek',   prefix: '1030', lat: 50.8681, lon: 4.3797 },
    { label: 'Ixelles',      prefix: '1050', lat: 50.8261, lon: 4.3700 },
    { label: 'Molenbeek',    prefix: '1080', lat: 50.8542, lon: 4.3269 },
  ],
  'limburg': [
    { label: 'Hasselt',     prefix: '3500', lat: 50.9307, lon: 5.3383 },
    { label: 'Genk',        prefix: '3600', lat: 50.9653, lon: 5.5003 },
    { label: 'Tongeren',    prefix: '3700', lat: 50.7811, lon: 5.4644 },
    { label: 'Maaseik',     prefix: '3680', lat: 51.0978, lon: 5.7892 },
    { label: 'Sint-Truiden', prefix: '3800', lat: 50.8181, lon: 5.1892 },
    { label: 'Beringen',    prefix: '3580', lat: 51.0503, lon: 5.2267 },
  ],
  'hainaut': [
    { label: 'Charleroi',   prefix: '6000', lat: 50.4108, lon: 4.4444 },
    { label: 'Mons',        prefix: '7000', lat: 50.4542, lon: 3.9519 },
    { label: 'La Louvière', prefix: '7100', lat: 50.4792, lon: 4.1856 },
    { label: 'Tournai',     prefix: '7500', lat: 50.6050, lon: 3.3881 },
    { label: 'Mouscron',    prefix: '7700', lat: 50.7453, lon: 3.2094 },
  ],
  'namur': [
    { label: 'Namen',        prefix: '5000', lat: 50.4669, lon: 4.8675 },
    { label: 'Dinant',       prefix: '5500', lat: 50.2614, lon: 4.9119 },
    { label: 'Philippeville', prefix: '5600', lat: 50.2000, lon: 4.5500 },
  ],
  'liege': [
    { label: 'Luik',     prefix: '4000', lat: 50.6325, lon: 5.5797 },
    { label: 'Verviers', prefix: '4800', lat: 50.5900, lon: 5.8653 },
    { label: 'Seraing',  prefix: '4100', lat: 50.6044, lon: 5.5103 },
    { label: 'Spa',      prefix: '4900', lat: 50.4900, lon: 5.8656 },
  ],
  'luxembourg': [
    { label: 'Arlon',             prefix: '6700', lat: 49.6833, lon: 5.8167 },
    { label: 'Bastogne',          prefix: '6600', lat: 50.0047, lon: 5.7181 },
    { label: 'Marche-en-Famenne', prefix: '6900', lat: 50.2278, lon: 5.3475 },
  ],
  'brabant-wallon': [
    { label: 'Wavre',    prefix: '1300', lat: 50.7178, lon: 4.6097 },
    { label: 'Nivelles', prefix: '1400', lat: 50.5983, lon: 4.3289 },
    { label: 'Ottignies',prefix: '1340', lat: 50.6667, lon: 4.5667 },
  ],
}

const REGIONS = [
  {
    id: 'vlaanderen',
    label: 'Vlaanderen',
    provinces: ['antwerpen', 'oost-vlaanderen', 'west-vlaanderen', 'vlaams-brabant', 'limburg'],
  },
  {
    id: 'brussel',
    label: 'Brussels Gewest',
    provinces: ['brussel'],
  },
  {
    id: 'wallonie',
    label: 'Wallonië',
    provinces: ['hainaut', 'namur', 'liege', 'luxembourg', 'brabant-wallon'],
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  data: OnboardingData
  onChange: (data: Partial<OnboardingData>) => void
}

export function StepWerkgebied({ data, onChange }: Props) {
  // Which province's cities are shown as pins on the map (null = none)
  const [activeProvince, setActiveProvince] = useState<string | null>(null)
  // All provinces start closed
  const [openProvinces, setOpenProvinces] = useState<Set<string>>(new Set())

  // ── Helpers ────────────────────────────────────────────────────────────────

  function cities(provId: string): City[] { return PROVINCE_CITIES[provId] ?? [] }

  function isCitySelected(prefix: string) {
    return data.regions.some((r) => r.prefix === prefix)
  }

  function isProvinceFull(provId: string) {
    const c = cities(provId)
    return c.length > 0 && c.every((city) => isCitySelected(city.prefix))
  }

  function isProvincePartial(provId: string) {
    const c = cities(provId)
    return c.some((city) => isCitySelected(city.prefix)) && !isProvinceFull(provId)
  }

  function isRegionFull(regionId: string) {
    return REGIONS.find((r) => r.id === regionId)!.provinces.every(isProvinceFull)
  }

// ── Toggle actions ─────────────────────────────────────────────────────────

  function toggleCity(city: City) {
    if (isCitySelected(city.prefix)) {
      onChange({ regions: data.regions.filter((r) => r.prefix !== city.prefix) })
    } else {
      onChange({ regions: [...data.regions, { label: city.label, prefix: city.prefix }] })
    }
  }

  function toggleCityByPrefix(prefix: string) {
    // Find city in active province
    if (!activeProvince) return
    const city = cities(activeProvince).find((c) => c.prefix === prefix)
    if (city) toggleCity(city)
  }

  function toggleProvince(provId: string) {
    const c = cities(provId)
    if (isProvinceFull(provId)) {
      onChange({ regions: data.regions.filter((r) => !c.some((city) => city.prefix === r.prefix)) })
    } else {
      const toAdd = c
        .filter((city) => !isCitySelected(city.prefix))
        .map((city) => ({ label: city.label, prefix: city.prefix }))
      onChange({ regions: [...data.regions, ...toAdd] })
    }
  }

  // Map click: select province + show its pins + open accordion
  function handleMapClick(provId: string) {
    toggleProvince(provId)
    setActiveProvince(provId)
    setOpenProvinces((prev) => {
      const next = new Set(prev)
      next.add(provId)
      return next
    })
  }

  // Sidebar province row click: open accordion + show pins (don't toggle selection)
  function handleProvinceRowClick(provId: string) {
    setActiveProvince(provId)
    setOpenProvinces((prev) => {
      const next = new Set(prev)
      if (next.has(provId)) {
        next.delete(provId)
        // hide pins when closing
        if (activeProvince === provId) setActiveProvince(null)
      } else {
        next.add(provId)
      }
      return next
    })
  }

  // Build city pins for the currently active province
  const cityPins: CityPin[] = activeProvince
    ? cities(activeProvince).map((city) => ({
        label: city.label,
        prefix: city.prefix,
        lat: city.lat,
        lon: city.lon,
        selected: isCitySelected(city.prefix),
      }))
    : []

  // Which provinces are (partially or fully) selected — for map fill color
  const selectedOnMap = PROVINCES
    .filter((p) => isProvinceFull(p.id) || isProvincePartial(p.id))
    .map((p) => p.id)

  const totalSelected = data.regions.length

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">Jouw werkgebied</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Klik op een provincie op de kaart of in de lijst om steden te selecteren.
        </p>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid gap-5 lg:grid-cols-[1fr_300px]">

        {/* ── LEFT: Map ── */}
        <div className="flex flex-col gap-3">
          <BelgiumMap
            selected={selectedOnMap}
            onToggleProvince={handleMapClick}
            cityPins={cityPins}
            onToggleCity={toggleCityByPrefix}
          />

          {/* Selected summary */}
          {totalSelected > 0 && (
            <div className="rounded-xl border border-primary-100 bg-primary-50/50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold text-neutral-500">
                  {totalSelected} gemeente{totalSelected !== 1 ? 'n' : ''} geselecteerd
                </p>
                <button
                  type="button"
                  onClick={() => { onChange({ regions: [] }); setActiveProvince(null) }}
                  className="text-xs text-red-400 hover:text-red-600 transition-colors"
                >
                  Wis alles
                </button>
              </div>
              <div className="flex max-h-20 flex-wrap gap-1.5 overflow-y-auto">
                {data.regions.map((r) => (
                  <span
                    key={r.prefix}
                    className="flex items-center gap-1 rounded-full border border-primary-200 bg-white px-2 py-0.5 text-xs font-medium text-primary-700"
                  >
                    {r.label}
                    <button
                      type="button"
                      onClick={() => onChange({ regions: data.regions.filter((x) => x.prefix !== r.prefix) })}
                      className="text-primary-300 hover:text-primary-700 transition-colors"
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: Hierarchical accordion ── */}
        <div className="flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden">
          <div className="border-b border-neutral-100 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Werkgebied</p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-neutral-100" style={{ maxHeight: 460 }}>
            {REGIONS.map((reg) => {
              const regCount = reg.provinces.reduce(
                (sum, p) => sum + cities(p).filter((c) => isCitySelected(c.prefix)).length, 0
              )
              const regTotal = reg.provinces.reduce((sum, p) => sum + cities(p).length, 0)

              return (
                <div key={reg.id}>
                  {/* ── Region header (not clickable for toggle, just label) ── */}
                  <div className="flex items-center gap-2 bg-neutral-50 px-4 py-2">
                    <span className="flex-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                      {reg.label}
                    </span>
                    {regCount > 0 && (
                      <span className="text-[10px] font-semibold text-primary-500">
                        {regCount}/{regTotal}
                      </span>
                    )}
                  </div>

                  {/* ── Provinces ── */}
                  {reg.provinces.map((provId) => {
                    const prov = PROVINCES.find((p) => p.id === provId)!
                    const provFull = isProvinceFull(provId)
                    const provPartial = isProvincePartial(provId)
                    const isOpen = openProvinces.has(provId)
                    const isActive = activeProvince === provId
                    const provCities = cities(provId)
                    const selectedCount = provCities.filter((c) => isCitySelected(c.prefix)).length

                    return (
                      <div key={provId}>
                        {/* Province row — entire row is clickable */}
                        <button
                          type="button"
                          onClick={() => handleProvinceRowClick(provId)}
                          className={cn(
                            'flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors',
                            isActive
                              ? 'bg-primary-50'
                              : 'hover:bg-neutral-50'
                          )}
                        >
                          {/* Checkbox — stopPropagation so row click doesn't interfere */}
                          <span
                            onClick={(e) => { e.stopPropagation(); toggleProvince(provId) }}
                            className="shrink-0 text-primary-500 hover:text-primary-700 transition-colors"
                          >
                            {provFull ? (
                              <CheckSquare size={15} className="fill-primary-600 text-white" />
                            ) : provPartial ? (
                              <CheckSquare size={15} className="fill-primary-100 text-primary-500" />
                            ) : (
                              <Square size={15} className="text-neutral-300" />
                            )}
                          </span>

                          <span className={cn(
                            'flex-1 text-sm font-medium transition-colors',
                            provFull || provPartial ? 'text-neutral-900' : 'text-neutral-500'
                          )}>
                            {prov.label}
                          </span>

                          {selectedCount > 0 && (
                            <span className="text-xs font-semibold text-primary-500">
                              {selectedCount}
                            </span>
                          )}

                          <span className={cn(
                            'text-neutral-300 transition-transform duration-200',
                            isOpen && 'rotate-90'
                          )}>
                            <ChevronRight size={14} />
                          </span>
                        </button>

                        {/* City list (accordion body) */}
                        {isOpen && (
                          <div className="border-t border-neutral-50 bg-neutral-50/60 pb-1">
                            {provCities.map((city) => {
                              const sel = isCitySelected(city.prefix)
                              return (
                                <button
                                  key={city.prefix}
                                  type="button"
                                  onClick={() => toggleCity(city)}
                                  className="flex w-full items-center gap-2.5 px-10 py-2 text-left transition-colors hover:bg-primary-50/70"
                                >
                                  <span className={cn(
                                    'flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border transition-colors',
                                    sel ? 'border-primary-600 bg-primary-600' : 'border-neutral-300 bg-white'
                                  )}>
                                    {sel && <Check size={9} className="text-white" strokeWidth={3} />}
                                  </span>
                                  <span className={cn(
                                    'flex-1 text-xs transition-colors',
                                    sel ? 'font-semibold text-neutral-900' : 'text-neutral-500'
                                  )}>
                                    {city.label}
                                  </span>
                                  <span className="text-[10px] text-neutral-300">{city.prefix}</span>
                                </button>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {totalSelected === 0 && (
        <p className="text-sm text-amber-600">Selecteer minstens één gemeente.</p>
      )}
    </div>
  )
}
