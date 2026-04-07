import { Timeline } from '@/components/animated/Timeline'
import { CTASection } from '@/components/marketing/CTASection'

export function HowItWorksPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-5xl">Hoe Planora werkt</h1>
          <p className="mt-4 text-lg text-neutral-600">
            In vier stappen van idee naar de juiste installateur. Simpel, transparant en gratis.
          </p>
        </div>
      </section>

      <Timeline />

      <CTASection />
    </>
  )
}
