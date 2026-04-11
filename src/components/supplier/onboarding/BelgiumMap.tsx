import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'

const NAME_TO_ID: Record<string, string> = {
  'West-Vlaanderen': 'west-vlaanderen',
  'Oost-Vlaanderen': 'oost-vlaanderen',
  'Provincie Antwerpen': 'antwerpen',
  'Limburg': 'limburg',
  'Vlaams-Brabant': 'vlaams-brabant',
  'Brussels Hoofdstedelijk Gewest': 'brussel',
  'Henegouwen': 'hainaut',
  'Namen': 'namur',
  'Luik': 'liege',
  'Luxemburg': 'luxembourg',
  'Waals-Brabant': 'brabant-wallon',
}

export type Province = {
  id: string
  label: string
  labelNl: string
  labelShort: string
}

export const PROVINCES: Province[] = [
  { id: 'antwerpen',       label: 'Antwerpen',      labelNl: 'Antwerpen',    labelShort: 'ANT' },
  { id: 'oost-vlaanderen', label: 'Oost-Vlaanderen', labelNl: 'Oost-Vl.',    labelShort: 'OVL' },
  { id: 'west-vlaanderen', label: 'West-Vlaanderen', labelNl: 'West-Vl.',    labelShort: 'WVL' },
  { id: 'vlaams-brabant',  label: 'Vlaams-Brabant',  labelNl: 'Vl.-Brabant', labelShort: 'VBR' },
  { id: 'brussel',         label: 'Brussel',          labelNl: 'Brussel',     labelShort: 'BRU' },
  { id: 'limburg',         label: 'Limburg',          labelNl: 'Limburg',     labelShort: 'LIM' },
  { id: 'hainaut',         label: 'Henegouwen',       labelNl: 'Henegouwen',  labelShort: 'HAI' },
  { id: 'namur',           label: 'Namen',            labelNl: 'Namen',       labelShort: 'NAM' },
  { id: 'liege',           label: 'Luik',             labelNl: 'Luik',        labelShort: 'LIE' },
  { id: 'luxembourg',      label: 'Luxemburg',        labelNl: 'Luxemburg',   labelShort: 'LUX' },
  { id: 'brabant-wallon',  label: 'Waals-Brabant',    labelNl: 'W.-Brabant',  labelShort: 'WBR' },
]

export type CityPin = {
  label: string
  prefix: string
  lat: number
  lon: number
  selected: boolean
}

const COLORS = {
  default:  '#E8E6F3',
  hover:    '#C4BDE6',
  selected: '#2D2166',
  border:   '#ffffff',
}

interface BelgiumMapProps {
  selected: string[]
  onToggleProvince: (id: string) => void
  cityPins: CityPin[]
  onToggleCity: (prefix: string) => void
}

export function BelgiumMap({ selected, onToggleProvince, cityPins, onToggleCity }: BelgiumMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<import('leaflet').Map | null>(null)
  const layersRef = useRef<Record<string, import('leaflet').GeoJSON>>({})
  const markersRef = useRef<Record<string, import('leaflet').Marker>>({})

  const selectedRef = useRef(selected)
  const onToggleProvinceRef = useRef(onToggleProvince)
  const cityPinsRef = useRef(cityPins)
  const onToggleCityRef = useRef(onToggleCity)

  useEffect(() => { selectedRef.current = selected }, [selected])
  useEffect(() => { onToggleProvinceRef.current = onToggleProvince }, [onToggleProvince])
  useEffect(() => { cityPinsRef.current = cityPins }, [cityPins])
  useEffect(() => { onToggleCityRef.current = onToggleCity }, [onToggleCity])

  // ── Init map once ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const initMap = async () => {
      const L = (await import('leaflet')).default

      const map = L.map(containerRef.current!, {
        center: [50.5, 4.5],
        zoom: 7,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
        dragging: true,
        doubleClickZoom: false,
      })

      // Zoom control top-right
      L.control.zoom({ position: 'topright' }).addTo(map)

      // Grey tiles, no labels
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
        { subdomains: 'abcd', maxZoom: 19 }
      ).addTo(map)

      const res = await fetch('/belgium-provinces.geojson')
      const geojson = await res.json()

      for (const feature of geojson.features) {
        const name = feature.properties?.name as string
        const id = NAME_TO_ID[name]
        if (!id) continue

        const layer = L.geoJSON(feature, {
          style: () => ({
            fillColor: selectedRef.current.includes(id) ? COLORS.selected : COLORS.default,
            fillOpacity: 0.88,
            color: COLORS.border,
            weight: 2,
            opacity: 1,
          }),
        })

        layer.on('click', () => onToggleProvinceRef.current(id))
        layer.on('mouseover', () => {
          if (!selectedRef.current.includes(id)) {
            layer.setStyle({ fillColor: COLORS.hover })
          }
          layer.bringToFront()
        })
        layer.on('mouseout', () => {
          layer.setStyle({
            fillColor: selectedRef.current.includes(id) ? COLORS.selected : COLORS.default,
          })
        })

        layer.addTo(map)
        layersRef.current[id] = layer
      }

      mapRef.current = map
    }

    initMap()

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
      layersRef.current = {}
      markersRef.current = {}
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Re-style province layers ────────────────────────────────────────────────
  useEffect(() => {
    for (const [id, layer] of Object.entries(layersRef.current)) {
      layer.setStyle({
        fillColor: selected.includes(id) ? COLORS.selected : COLORS.default,
      })
    }
  }, [selected])

  // ── Sync city pins ──────────────────────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const initPins = async () => {
      const L = (await import('leaflet')).default

      // Remove markers that are no longer in cityPins
      const currentPrefixes = new Set(cityPins.map((p) => p.prefix))
      for (const [prefix, marker] of Object.entries(markersRef.current)) {
        if (!currentPrefixes.has(prefix)) {
          marker.remove()
          delete markersRef.current[prefix]
        }
      }

      // Add or update markers
      for (const pin of cityPins) {
        if (markersRef.current[pin.prefix]) {
          // Update icon color
          const marker = markersRef.current[pin.prefix]
          marker.setIcon(makePinIcon(L, pin.selected))
          continue
        }

        const marker = L.marker([pin.lat, pin.lon], {
          icon: makePinIcon(L, pin.selected),
          title: pin.label,
        })

        marker.on('click', (e) => {
          // Prevent province click from firing too
          e.originalEvent.stopPropagation()
          onToggleCityRef.current(pin.prefix)
        })

        marker.bindTooltip(pin.label, {
          direction: 'top',
          offset: [0, -28],
          className: 'planora-tooltip',
        })

        marker.addTo(map)
        markersRef.current[pin.prefix] = marker
      }
    }

    initPins()
  }, [cityPins])

  return (
    <>
      <style>{`
        .planora-tooltip {
          background: #2D2166;
          border: none;
          border-radius: 6px;
          color: white;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 8px;
          box-shadow: 0 2px 8px rgba(45,33,102,0.25);
          white-space: nowrap;
        }
        .planora-tooltip::before {
          border-top-color: #2D2166 !important;
        }
        .leaflet-tooltip-top.planora-tooltip::before {
          border-top-color: #2D2166 !important;
        }
      `}</style>
      <div
        ref={containerRef}
        className="w-full rounded-2xl overflow-hidden border border-neutral-200 shadow-sm"
        style={{ height: 460 }}
      />
    </>
  )
}

function makePinIcon(L: typeof import('leaflet'), selected: boolean) {
  const color = selected ? '#2D2166' : '#9B93C9'
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
      <path d="M14 0C6.27 0 0 6.27 0 14c0 9.63 14 22 14 22s14-12.37 14-22C28 6.27 21.73 0 14 0z"
        fill="${color}" opacity="0.95"/>
      <circle cx="14" cy="14" r="5.5" fill="white"/>
    </svg>
  `
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    tooltipAnchor: [0, -36],
  })
}
