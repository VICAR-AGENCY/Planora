import { useState, useRef, useEffect } from 'react'
import { MapPin, Loader2, Search } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface LocationResult {
  display_name: string
  address: {
    city?: string
    town?: string
    village?: string
    municipality?: string
    postcode?: string
    state?: string
    country?: string
  }
  lat: string
  lon: string
}

interface LocationValue {
  label: string
  postcode?: string
  city?: string
  lat?: number
  lon?: number
}

interface LocationSearchProps {
  value: LocationValue | null
  onChange: (location: LocationValue | null) => void
  placeholder?: string
  required?: boolean
}

export function LocationSearch({ value, onChange, placeholder = 'Zoek je adres of gemeente...', required }: LocationSearchProps) {
  const [query, setQuery] = useState(value?.label ?? '')
  const [results, setResults] = useState<LocationResult[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Sync external value changes
  useEffect(() => {
    if (value?.label && value.label !== query) {
      setQuery(value.label)
    }
  }, [value?.label])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const search = async (q: string) => {
    if (q.length < 2) {
      setResults([])
      setOpen(false)
      return
    }
    setLoading(true)
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&countrycodes=be&q=${encodeURIComponent(q)}`
      const res = await fetch(url, {
        headers: { 'Accept-Language': 'nl', 'User-Agent': 'Planora/1.0 contact@planora.be' },
      })
      const data: LocationResult[] = await res.json()
      setResults(data)
      setOpen(true)
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleInput = (val: string) => {
    setQuery(val)
    onChange(null) // clear confirmed value while typing
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(val), 350)
  }

  const handleSelect = (result: LocationResult) => {
    const city =
      result.address.city ??
      result.address.town ??
      result.address.village ??
      result.address.municipality ??
      ''
    const postcode = result.address.postcode?.split(';')[0] ?? ''

    // Build a clean label: "Gemeente (postcode)"
    const label = postcode ? `${city || result.display_name.split(',')[0]} (${postcode})` : city || result.display_name.split(',')[0]

    setQuery(label)
    setOpen(false)
    setResults([])
    onChange({
      label,
      city,
      postcode,
      lat: parseFloat(result.lat),
      lon: parseFloat(result.lon),
    })
  }

  const confirmed = value !== null

  return (
    <div ref={containerRef} className="relative">
      <div className={cn(
        'flex items-center gap-2 rounded-xl border px-4 py-2.5 transition-all',
        confirmed
          ? 'border-primary-400 bg-primary-50 ring-2 ring-primary-500/20'
          : 'border-neutral-300 bg-white focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20'
      )}>
        {loading ? (
          <Loader2 size={16} className="shrink-0 animate-spin text-primary-500" />
        ) : confirmed ? (
          <MapPin size={16} className="shrink-0 text-primary-600" />
        ) : (
          <Search size={16} className="shrink-0 text-neutral-400" />
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400"
        />
        {confirmed && (
          <button
            type="button"
            onClick={() => { setQuery(''); onChange(null); setResults([]) }}
            className="shrink-0 text-xs text-primary-400 hover:text-primary-700"
          >
            ✕
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && results.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-60 overflow-auto rounded-xl border border-neutral-200 bg-white shadow-xl shadow-neutral-900/10">
          {results.map((r, i) => {
            const city =
              r.address.city ??
              r.address.town ??
              r.address.village ??
              r.address.municipality ??
              r.display_name.split(',')[0]
            const postcode = r.address.postcode?.split(';')[0]
            const region = r.address.state ?? ''

            return (
              <li key={i}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(r)}
                  className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-primary-50"
                >
                  <MapPin size={14} className="mt-0.5 shrink-0 text-primary-500" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-neutral-900">
                      {city}
                      {postcode && <span className="ml-1.5 text-xs font-normal text-neutral-500">{postcode}</span>}
                    </p>
                    {region && (
                      <p className="truncate text-xs text-neutral-400">{region}</p>
                    )}
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {open && !loading && results.length === 0 && query.length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-400 shadow-lg">
          Geen resultaten gevonden voor "{query}"
        </div>
      )}
    </div>
  )
}
