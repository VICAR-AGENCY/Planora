import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Loader2, Check } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useSupplier, useUpdateSupplier } from '@/hooks/useSupplier'
import { supabase } from '@/lib/supabase/client'
import { StepProgress } from '@/components/supplier/onboarding/StepProgress'
import { StepBedrijf } from '@/components/supplier/onboarding/StepBedrijf'
import { StepSpecialisaties } from '@/components/supplier/onboarding/StepSpecialisaties'
import { StepWerkgebied } from '@/components/supplier/onboarding/StepWerkgebied'
import { StepBeschikbaarheid } from '@/components/supplier/onboarding/StepBeschikbaarheid'
import { StepOverzicht } from '@/components/supplier/onboarding/StepOverzicht'
import { EMPTY_ONBOARDING, type OnboardingData } from '@/components/supplier/onboarding/types'

const TOTAL_STEPS = 5

export function SupplierOnboardingPage() {
  const { user } = useAuth()
  const { data: supplier, isLoading: supplierLoading } = useSupplier()
  const { mutateAsync: updateSupplier } = useUpdateSupplier()
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)
  const [data, setData] = useState<OnboardingData>(EMPTY_ONBOARDING)

  // Pre-fill form with existing supplier data
  useEffect(() => {
    if (!supplier) return
    setData({
      company_name: supplier.company_name ?? '',
      contact_name: supplier.contact_name ?? '',
      phone: supplier.phone ?? '',
      website: supplier.website ?? '',
      description: supplier.description ?? '',
      categories: supplier.supplier_categories?.map((c: any) => c.category) ?? [],
      regions: supplier.supplier_regions?.map((r: any) => ({ label: r.city, prefix: r.postal_code_prefix })) ?? [],
      availability: supplier.availability ?? EMPTY_ONBOARDING.availability,
      price_category: supplier.price_category ?? '',
    })
  }, [supplier])

  const update = (partial: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...partial }))
  }

  const canNext = () => {
    if (step === 0) return data.company_name.trim() !== '' && data.contact_name.trim() !== ''
    if (step === 1) return data.categories.length > 0
    if (step === 2) return data.regions.length > 0
    if (step === 3) return data.availability.days.length > 0 && data.price_category !== ''
    return true
  }

  const handleFinish = async () => {
    if (!supplier) return
    setSaving(true)
    try {
      // 1. Update supplier basic info + availability + price + onboarding flag
      await updateSupplier({
        company_name: data.company_name,
        contact_name: data.contact_name,
        phone: data.phone || null,
        website: data.website || null,
        description: data.description || null,
        availability: data.availability,
        price_category: data.price_category,
        onboarding_completed: true,
      })

      // 2. Replace categories
      await supabase.from('supplier_categories').delete().eq('supplier_id', supplier.id)
      if (data.categories.length > 0) {
        await supabase.from('supplier_categories').insert(
          data.categories.map((cat) => ({ supplier_id: supplier.id, category: cat }))
        )
      }

      // 3. Replace regions
      await supabase.from('supplier_regions').delete().eq('supplier_id', supplier.id)
      if (data.regions.length > 0) {
        await supabase.from('supplier_regions').insert(
          data.regions.map((r) => ({ supplier_id: supplier.id, postal_code_prefix: r.prefix, city: r.label }))
        )
      }

      setDone(true)
      setTimeout(() => navigate('/supplier/dashboard'), 2000)
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  if (supplierLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      </div>
    )
  }

  if (!user || !supplier) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-neutral-500">Geen toegang. <Link to="/supplier/login" className="text-primary-600 underline">Inloggen</Link></p>
      </div>
    )
  }

  if (done) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 text-center px-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check size={32} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900">Profiel geactiveerd!</h1>
        <p className="text-neutral-500">Je wordt doorgestuurd naar je dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link to="/" className="shrink-0">
            <img src="/logo.png" alt="Planora" className="h-8" />
          </Link>
          <span className="text-sm text-neutral-400">
            Stap {step + 1} van {TOTAL_STEPS}
          </span>
          <Link to="/supplier/dashboard" className="text-sm text-neutral-400 hover:text-neutral-600">
            Overslaan
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-10">
        {/* Progress */}
        <div className="flex justify-center mb-10">
          <StepProgress current={step} />
        </div>

        {/* Step content */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
          {step === 0 && <StepBedrijf data={data} onChange={update} />}
          {step === 1 && <StepSpecialisaties data={data} onChange={update} />}
          {step === 2 && <StepWerkgebied data={data} onChange={update} />}
          {step === 3 && <StepBeschikbaarheid data={data} onChange={update} />}
          {step === 4 && <StepOverzicht data={data} />}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-30 transition-colors"
          >
            <ArrowLeft size={16} />
            Vorige
          </button>

          {step < TOTAL_STEPS - 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext()}
              className="flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-40 transition-colors"
            >
              Volgende
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
              {saving ? 'Opslaan...' : 'Profiel activeren'}
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
