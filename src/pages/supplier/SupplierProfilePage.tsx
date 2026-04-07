import { useState, useEffect } from 'react'
import {
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  FileText,
  MapPin,
  Tag,
  Upload,
  Check,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useSupplier, useUpdateSupplier } from '@/hooks/useSupplier'

const allRegions = [
  'Antwerpen',
  'Gent',
  'Brussel',
  'Leuven',
  'Brugge',
  'Hasselt',
  'Mechelen',
  'Aalst',
  'Kortrijk',
  'Turnhout',
  'Sint-Niklaas',
  'Roeselare',
]

const allCategories = [
  'Warmtepomp',
  'Zonnepanelen',
  'Dakisolatie',
  'Muurisolatie',
  'Ramen & Deuren',
  'Vloerverwarming',
  'Ventilatie',
  'Elektriciteit',
  'Sanitair',
  'Dak',
]

export function SupplierProfilePage() {
  const { data: supplier, isLoading } = useSupplier()
  const updateSupplier = useUpdateSupplier()

  const [form, setForm] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    website: '',
    description: '',
    regions: [] as string[],
    categories: [] as string[],
  })

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (supplier) {
      setForm({
        company_name: supplier.company_name ?? '',
        contact_name: supplier.contact_name ?? '',
        email: supplier.email ?? '',
        phone: supplier.phone ?? '',
        website: (supplier as any).website ?? '',
        description: (supplier as any).description ?? '',
        regions: supplier.regions ?? [],
        categories: supplier.categories ?? [],
      })
    }
  }, [supplier])

  const handleSave = () => {
    setSaved(false)
    updateSupplier.mutate(form, {
      onSuccess: () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      },
    })
  }

  const toggleRegion = (region: string) => {
    setForm((prev) => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter((r) => r !== region)
        : [...prev.regions, region],
    }))
  }

  const toggleCategory = (cat: string) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">
          Bedrijfsprofiel
        </h1>
        <p className="mt-1 text-neutral-500">
          Beheer je bedrijfsinformatie en voorkeuren.
        </p>
      </div>

      {/* Logo upload placeholder */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Logo</h2>
        <div className="flex items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50">
            <span className="text-2xl font-bold text-primary-600">
              {form.company_name?.charAt(0)?.toUpperCase() ?? 'V'}
            </span>
          </div>
          <div>
            <button className="flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
              <Upload size={16} />
              Logo uploaden
            </button>
            <p className="mt-1.5 text-xs text-neutral-400">
              PNG, JPG tot 2MB. Aanbevolen: 200x200px
            </p>
          </div>
        </div>
      </div>

      {/* Company info */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">
          Bedrijfsinformatie
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            icon={Building2}
            label="Bedrijfsnaam"
            value={form.company_name}
            onChange={(v) => setForm({ ...form, company_name: v })}
          />
          <FormField
            icon={User}
            label="Contactpersoon"
            value={form.contact_name}
            onChange={(v) => setForm({ ...form, contact_name: v })}
          />
          <FormField
            icon={Mail}
            label="E-mailadres"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />
          <FormField
            icon={Phone}
            label="Telefoonnummer"
            type="tel"
            value={form.phone}
            onChange={(v) => setForm({ ...form, phone: v })}
          />
          <FormField
            icon={Globe}
            label="Website"
            value={form.website}
            onChange={(v) => setForm({ ...form, website: v })}
            placeholder="https://www.jouwbedrijf.be"
          />
        </div>
        <div className="mt-4">
          <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-neutral-700">
            <FileText size={14} className="text-neutral-400" />
            Beschrijving
          </label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            placeholder="Vertel huiseigenaars over je bedrijf, ervaring en specialisaties..."
            className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors resize-none"
          />
        </div>
      </div>

      {/* Regions */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-1 text-lg font-semibold text-neutral-900">
          <span className="inline-flex items-center gap-2">
            <MapPin size={18} className="text-primary-600" />
            Werkgebied
          </span>
        </h2>
        <p className="mb-4 text-sm text-neutral-500">
          Selecteer de regio's waar je actief bent.
        </p>
        <div className="flex flex-wrap gap-2">
          {allRegions.map((region) => {
            const selected = form.regions.includes(region)
            return (
              <button
                key={region}
                onClick={() => toggleRegion(region)}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                  selected
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-neutral-300 text-neutral-600 hover:border-neutral-400'
                )}
              >
                {selected && <Check size={12} className="mr-1 inline" />}
                {region}
              </button>
            )
          })}
        </div>
      </div>

      {/* Categories */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-1 text-lg font-semibold text-neutral-900">
          <span className="inline-flex items-center gap-2">
            <Tag size={18} className="text-primary-600" />
            Categorieën
          </span>
        </h2>
        <p className="mb-4 text-sm text-neutral-500">
          Selecteer de diensten die je aanbiedt.
        </p>
        <div className="flex flex-wrap gap-2">
          {allCategories.map((cat) => {
            const selected = form.categories.includes(cat)
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                  selected
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-neutral-300 text-neutral-600 hover:border-neutral-400'
                )}
              >
                {selected && <Check size={12} className="mr-1 inline" />}
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Save button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={updateSupplier.isPending}
          className="rounded-xl bg-primary-600 px-8 py-2.5 text-sm font-medium text-white shadow-md shadow-primary-600/20 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {updateSupplier.isPending ? 'Opslaan...' : 'Profiel opslaan'}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
            <Check size={16} />
            Opgeslagen!
          </span>
        )}
        {updateSupplier.isError && (
          <span className="text-sm text-red-600">
            Er ging iets mis. Probeer opnieuw.
          </span>
        )}
      </div>
    </div>
  )
}

function FormField({
  icon: Icon,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  icon: typeof Building2
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-neutral-700">
        <Icon size={14} className="text-neutral-400" />
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors"
      />
    </div>
  )
}
