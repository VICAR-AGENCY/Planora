import { useEffect } from 'react'
import { X, ShieldCheck, Star, Clock } from 'lucide-react'
import { LeadCaptureForm } from './LeadCaptureForm'
import { analytics } from '@/lib/analytics'

interface LeadCaptureModalProps {
  open: boolean
  onClose: () => void
  projectType?: string
  source?: string
  calculatorData?: Record<string, unknown>
  /** Heading shown in the modal, defaults to "Ontvang gratis offertes" */
  title?: string
}

export function LeadCaptureModal({
  open,
  onClose,
  projectType,
  source,
  calculatorData,
  title = 'Ontvang gratis offertes',
}: LeadCaptureModalProps) {
  // Track modal open
  useEffect(() => {
    if (open) analytics.leadFormOpen(source ?? 'unknown', projectType)
  }, [open, source, projectType])

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
          aria-label="Sluiten"
        >
          <X size={18} />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-neutral-900">{title}</h2>
            <p className="mt-1.5 text-sm text-neutral-500">
              Vul je gegevens in en ontvang binnen 24u passende offertes van erkende vakmensen.
            </p>
          </div>

          {/* Form */}
          <LeadCaptureForm
            projectType={projectType}
            source={source}
            calculatorData={calculatorData}
            onSuccess={onClose}
          />

          {/* Trust signals */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 border-t border-neutral-100 pt-5 text-xs text-neutral-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-green-500" />
              Gratis &amp; vrijblijvend
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-primary-500" />
              Reactie binnen 24u
            </span>
            <span className="flex items-center gap-1.5">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              4.8/5 — 200+ tevreden klanten
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
