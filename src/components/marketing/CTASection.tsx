import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { LeadCaptureModal } from '@/components/leads/LeadCaptureModal'

interface CTASectionProps {
  projectType?: string
}

export function CTASection({ projectType }: CTASectionProps = {}) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <section className="bg-primary-700 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            Klaar om slim te beslissen?
          </h2>
          <p className="mt-4 text-lg text-primary-200">
            Begin vandaag met je woningproject. Gratis en zonder verplichtingen.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-primary-700 shadow-lg hover:bg-primary-50 transition-colors"
          >
            Ontvang gratis offertes
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <LeadCaptureModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        projectType={projectType}
        source="cta_section"
      />
    </>
  )
}
