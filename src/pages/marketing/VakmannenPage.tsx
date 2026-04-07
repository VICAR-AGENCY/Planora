import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  MapPin, 
  Star, 
  CheckCircle2, 
  Filter, 
  X,
  Flame,
  Square,
  Home,
  ChevronDown,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

type VakmanType = 'warmtepomp' | 'ramen-deuren' | 'dakisolatie' | 'algemeen'

interface Vakman {
  id: string
  naam: string
  bedrijf: string
  locatie: string
  provincie: string
  types: VakmanType[]
  rating: number
  aantalReviews: number
  geverifieerd: boolean
  jarEN: number
  beschrijving: string
  afbeelding: string
}

const vakmannen: Vakman[] = [
  {
    id: '1',
    naam: 'Jan Peeters',
    bedrijf: 'Peeters Installaties',
    locatie: 'Antwerpen',
    provincie: 'Antwerpen',
    types: ['warmtepomp', 'algemeen'],
    rating: 4.9,
    aantalReviews: 127,
    geverifieerd: true,
    jarEN: 15,
    beschrijving: 'Specialist in warmtepompen en HVAC-installaties. Erkend installateur voor alle grote merken.',
    afbeelding: '/placeholder-vakman.jpg'
  },
  {
    id: '2',
    naam: 'Marie Janssens',
    bedrijf: 'Janssens Schrijnwerkerij',
    locatie: 'Gent',
    provincie: 'Oost-Vlaanderen',
    types: ['ramen-deuren'],
    rating: 4.8,
    aantalReviews: 89,
    geverifieerd: true,
    jarEN: 22,
    beschrijving: 'Familiebedrijf gespecialiseerd in hoogwaardige ramen en deuren. PVC, aluminium en hout.',
    afbeelding: '/placeholder-vakman.jpg'
  },
  {
    id: '3',
    naam: 'Koen De Smet',
    bedrijf: 'De Smet Dakwerken',
    locatie: 'Brugge',
    provincie: 'West-Vlaanderen',
    types: ['dakisolatie'],
    rating: 4.7,
    aantalReviews: 64,
    geverifieerd: true,
    jarEN: 18,
    beschrijving: 'Expert in dakisolatie en dakrenovatie. Werkt met alle isolatiematerialen.',
    afbeelding: '/placeholder-vakman.jpg'
  },
  {
    id: '4',
    naam: 'Peter Van den Berg',
    bedrijf: 'Van den Berg Energie',
    locatie: 'Leuven',
    provincie: 'Vlaams-Brabant',
    types: ['warmtepomp', 'dakisolatie'],
    rating: 4.9,
    aantalReviews: 156,
    geverifieerd: true,
    jarEN: 12,
    beschrijving: 'Totaaloplossingen voor energiezuinig wonen. Warmtepompen en isolatie onder één dak.',
    afbeelding: '/placeholder-vakman.jpg'
  },
  {
    id: '5',
    naam: 'Sarah Wouters',
    bedrijf: 'Wouters Renovaties',
    locatie: 'Hasselt',
    provincie: 'Limburg',
    types: ['ramen-deuren', 'dakisolatie', 'algemeen'],
    rating: 4.6,
    aantalReviews: 78,
    geverifieerd: true,
    jarEN: 8,
    beschrijving: 'Alleskunner voor renovatieprojecten. Van ramen tot dakwerken, alles in eigen beheer.',
    afbeelding: '/placeholder-vakman.jpg'
  },
  {
    id: '6',
    naam: 'Tom Hermans',
    bedrijf: 'Hermans HVAC Solutions',
    locatie: 'Mechelen',
    provincie: 'Antwerpen',
    types: ['warmtepomp'],
    rating: 5.0,
    aantalReviews: 43,
    geverifieerd: true,
    jarEN: 10,
    beschrijving: 'Gespecialiseerd in lucht-water en grondgekoppelde warmtepompen. Daikin Premium Partner.',
    afbeelding: '/placeholder-vakman.jpg'
  },
  {
    id: '7',
    naam: 'Els Martens',
    bedrijf: 'Martens Ramen & Deuren',
    locatie: 'Aalst',
    provincie: 'Oost-Vlaanderen',
    types: ['ramen-deuren'],
    rating: 4.8,
    aantalReviews: 112,
    geverifieerd: true,
    jarEN: 25,
    beschrijving: 'Al 25 jaar uw partner voor kwalitatief schrijnwerk. Showroom met meer dan 50 modellen.',
    afbeelding: '/placeholder-vakman.jpg'
  },
  {
    id: '8',
    naam: 'Dirk Claes',
    bedrijf: 'Claes Isolatietechnieken',
    locatie: 'Turnhout',
    provincie: 'Antwerpen',
    types: ['dakisolatie'],
    rating: 4.7,
    aantalReviews: 91,
    geverifieerd: true,
    jarEN: 14,
    beschrijving: 'Specialist in PIR, PUR en cellulose isolatie. Gratis energiescan bij elke offerte.',
    afbeelding: '/placeholder-vakman.jpg'
  },
]

const provincies = [
  'Alle provincies',
  'Antwerpen',
  'Limburg',
  'Oost-Vlaanderen',
  'Vlaams-Brabant',
  'West-Vlaanderen',
]

const typeFilters: { value: VakmanType | 'alle'; label: string; icon: typeof Flame }[] = [
  { value: 'alle', label: 'Alle types', icon: Filter },
  { value: 'warmtepomp', label: 'Warmtepompen', icon: Flame },
  { value: 'ramen-deuren', label: 'Ramen & Deuren', icon: Square },
  { value: 'dakisolatie', label: 'Dakisolatie', icon: Home },
]

export function VakmannenPage() {
  const [zoekterm, setZoekterm] = useState('')
  const [selectedProvincie, setSelectedProvincie] = useState('Alle provincies')
  const [selectedType, setSelectedType] = useState<VakmanType | 'alle'>('alle')
  const [showFilters, setShowFilters] = useState(false)

  const gefilterdVakmannen = useMemo(() => {
    return vakmannen.filter((vakman) => {
      // Zoekterm filter
      const zoekMatch = zoekterm === '' || 
        vakman.naam.toLowerCase().includes(zoekterm.toLowerCase()) ||
        vakman.bedrijf.toLowerCase().includes(zoekterm.toLowerCase()) ||
        vakman.locatie.toLowerCase().includes(zoekterm.toLowerCase())

      // Provincie filter
      const provincieMatch = selectedProvincie === 'Alle provincies' || 
        vakman.provincie === selectedProvincie

      // Type filter
      const typeMatch = selectedType === 'alle' || 
        vakman.types.includes(selectedType)

      return zoekMatch && provincieMatch && typeMatch
    })
  }, [zoekterm, selectedProvincie, selectedType])

  const activeFiltersCount = [
    selectedProvincie !== 'Alle provincies',
    selectedType !== 'alle',
  ].filter(Boolean).length

  const clearFilters = () => {
    setSelectedProvincie('Alle provincies')
    setSelectedType('alle')
    setZoekterm('')
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
              Vind de perfecte vakman voor jouw project
            </h1>
            <p className="mt-4 text-lg text-primary-100 text-pretty">
              Ontdek geverifieerde bouwprofessionals in jouw regio. 
              Alle vakmensen zijn gecheckt op kwaliteit, betrouwbaarheid en expertise.
            </p>
          </div>

          {/* Zoekbalk */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="text"
                placeholder="Zoek op naam, bedrijf of locatie..."
                value={zoekterm}
                onChange={(e) => setZoekterm(e.target.value)}
                className="w-full rounded-xl border-0 bg-white py-4 pl-12 pr-4 text-neutral-900 shadow-lg placeholder:text-neutral-400 focus:ring-2 focus:ring-primary-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <p className="text-sm text-neutral-600">
              <span className="font-semibold text-neutral-900">{gefilterdVakmannen.length}</span> vakmensen gevonden
            </p>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
              >
                <X size={14} />
                Filters wissen
              </button>
            )}
          </div>

          {/* Desktop filters */}
          <div className="hidden md:flex items-center gap-3">
            {/* Provincie dropdown */}
            <div className="relative">
              <select
                value={selectedProvincie}
                onChange={(e) => setSelectedProvincie(e.target.value)}
                className={cn(
                  'appearance-none rounded-lg border bg-white py-2 pl-4 pr-10 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
                  selectedProvincie !== 'Alle provincies' 
                    ? 'border-primary-300 text-primary-700' 
                    : 'border-neutral-200 text-neutral-700'
                )}
              >
                {provincies.map((prov) => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>

            {/* Type filter buttons */}
            <div className="flex items-center gap-1 rounded-lg bg-neutral-100 p-1">
              {typeFilters.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                    selectedType === type.value
                      ? 'bg-white text-primary-700 shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900'
                  )}
                >
                  <type.icon size={16} />
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile filter button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700"
          >
            <Filter size={16} />
            Filters
            {activeFiltersCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile filters panel */}
        {showFilters && (
          <div className="md:hidden mb-6 rounded-xl border border-neutral-200 bg-white p-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Provincie</label>
                <select
                  value={selectedProvincie}
                  onChange={(e) => setSelectedProvincie(e.target.value)}
                  className="w-full rounded-lg border border-neutral-200 py-2 px-3 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                >
                  {provincies.map((prov) => (
                    <option key={prov} value={prov}>{prov}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Type vakman</label>
                <div className="grid grid-cols-2 gap-2">
                  {typeFilters.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setSelectedType(type.value)}
                      className={cn(
                        'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
                        selectedType === type.value
                          ? 'border-primary-300 bg-primary-50 text-primary-700'
                          : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                      )}
                    >
                      <type.icon size={16} />
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results grid */}
        {gefilterdVakmannen.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gefilterdVakmannen.map((vakman) => (
              <VakmanCard key={vakman.id} vakman={vakman} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto h-16 w-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
              <Search size={24} className="text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Geen vakmensen gevonden</h3>
            <p className="text-neutral-600 mb-4">Probeer andere filters of zoektermen.</p>
            <button
              onClick={clearFilters}
              className="text-primary-600 font-medium hover:text-primary-700"
            >
              Alle filters wissen
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Bent u een vakman?</h2>
              <p className="mt-2 text-neutral-600">
                Word onderdeel van ons netwerk en ontvang projectaanvragen van particulieren in uw regio.
              </p>
            </div>
            <Link
              to="/voor-vaklui"
              className="shrink-0 rounded-xl bg-primary-600 px-6 py-3 text-center font-medium text-white shadow-md shadow-primary-600/20 hover:bg-primary-700 transition-colors"
            >
              Registreer als vakman
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function VakmanCard({ vakman }: { vakman: Vakman }) {
  const typeLabels: Record<VakmanType, { label: string; icon: typeof Flame }> = {
    warmtepomp: { label: 'Warmtepompen', icon: Flame },
    'ramen-deuren': { label: 'Ramen & Deuren', icon: Square },
    dakisolatie: { label: 'Dakisolatie', icon: Home },
    algemeen: { label: 'Algemeen', icon: Filter },
  }

  return (
    <div className="group rounded-2xl border border-neutral-200 bg-white p-6 hover:border-primary-200 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-xl font-bold text-primary-700">
            {vakman.naam.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-neutral-900">{vakman.naam}</h3>
              {vakman.geverifieerd && (
                <CheckCircle2 size={16} className="text-primary-600" />
              )}
            </div>
            <p className="text-sm text-neutral-500">{vakman.bedrijf}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1 text-neutral-600">
          <MapPin size={14} />
          {vakman.locatie}
        </div>
        <div className="flex items-center gap-1">
          <Star size={14} className="text-amber-400 fill-amber-400" />
          <span className="font-medium text-neutral-900">{vakman.rating}</span>
          <span className="text-neutral-500">({vakman.aantalReviews})</span>
        </div>
      </div>

      <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
        {vakman.beschrijving}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {vakman.types.filter(t => t !== 'algemeen').map((type) => {
          const typeInfo = typeLabels[type]
          return (
            <span
              key={type}
              className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700"
            >
              <typeInfo.icon size={12} />
              {typeInfo.label}
            </span>
          )
        })}
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-neutral-100">
        <button className="flex-1 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
          <Phone size={14} className="inline mr-2" />
          Bellen
        </button>
        <button className="flex-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
          <Mail size={14} className="inline mr-2" />
          Contact
        </button>
      </div>

      <p className="mt-3 text-xs text-neutral-400 text-center">
        {vakman.jarEN} jaar ervaring
      </p>
    </div>
  )
}
