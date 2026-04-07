import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageSquare, Search, FileCheck, ThumbsUp, type LucideIcon } from 'lucide-react'

interface TimelineStep {
  icon: LucideIcon
  step: string
  title: string
  description: string
}

const steps: TimelineStep[] = [
  {
    icon: MessageSquare,
    step: '1',
    title: 'Beschrijf je project',
    description: 'Chat met onze AI-assistent over je woning en wensen. Upload foto\'s voor een snellere analyse.',
  },
  {
    icon: Search,
    step: '2',
    title: 'Wij matchen je met installateurs',
    description: 'Op basis van jouw projectbrief selecteren wij de beste gecertificeerde installateurs in jouw regio.',
  },
  {
    icon: FileCheck,
    step: '3',
    title: 'Vergelijk offertes slim',
    description: 'Ontvang offertes en bekijk ze zij-aan-zij. Onze AI analyseert elke offerte en wijst op belangrijke verschillen.',
  },
  {
    icon: ThumbsUp,
    step: '4',
    title: 'Beslis met vertrouwen',
    description: 'Kies de installateur die het best bij jouw project past. Met alle informatie overzichtelijk op één plek.',
  },
]

interface TimelineProps {
  compact?: boolean
}

export function Timeline({ compact }: TimelineProps) {
  return (
    <section className={compact ? 'py-16' : 'py-20'}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {!compact && (
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Hoe Planora werkt</h2>
            <p className="mt-4 text-lg text-neutral-600">In vier stappen van idee naar de juiste installateur.</p>
          </div>
        )}
        <div className="relative space-y-12">
          {/* Vertical line */}
          <div className="absolute left-7 top-0 bottom-0 w-px bg-primary-200 hidden sm:block" />
          {steps.map((s, i) => (
            <TimelineItem key={s.step} step={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ step, index }: { step: TimelineStep; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex gap-6"
    >
      <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
        <step.icon className="h-7 w-7" />
      </div>
      <div>
        <span className="text-sm font-medium text-primary-600">Stap {step.step}</span>
        <h3 className="mt-1 text-xl font-semibold text-neutral-900">{step.title}</h3>
        <p className="mt-2 text-neutral-600">{step.description}</p>
      </div>
    </motion.div>
  )
}
