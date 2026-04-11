import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AnimatedTextCycle } from './AnimatedTextCycle'
import { InteractiveHoverButton } from './InteractiveHoverButton'
import { LeadCaptureModal } from '@/components/leads/LeadCaptureModal'

export function AnimatedHero() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.h1
            className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            Slim beslissen over je{' '}
            <AnimatedTextCycle words={['warmtepomp', 'ramen & deuren', 'dakisolatie']} />
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-neutral-600 sm:text-xl"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            Planora helpt je stap voor stap: van oriëntatie tot de juiste installateur.
            Geen verkooppraatjes, wel eerlijke vergelijkingen.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <InteractiveHoverButton onClick={() => setModalOpen(true)}>
              Ontvang gratis offertes
            </InteractiveHoverButton>
            <Link
              to="/calculator/warmtepomp"
              className="flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-8 py-3.5 text-base font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Bereken je kosten
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <LeadCaptureModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        source="homepage_hero"
      />
    </section>
  )
}
