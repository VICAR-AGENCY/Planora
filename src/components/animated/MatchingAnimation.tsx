import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { MessageSquare, Search, FileCheck, ThumbsUp, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

/* ── step config ── */
const steps = [
  { icon: MessageSquare, title: 'Beschrijf je project', desc: 'Chat met AI over je woning' },
  { icon: Search, title: 'Wij zoeken specialisten', desc: 'Automatisch gematcht' },
  { icon: FileCheck, title: 'Vergelijk offertes', desc: 'Zij-aan-zij met AI analyse' },
  { icon: ThumbsUp, title: 'Beslis met vertrouwen', desc: 'Kies de beste installateur' },
]

const projects = [
  { name: 'Warmtepomp installatie', city: 'Antwerpen', type: 'Lucht-water', emoji: '🔥' },
  { name: 'Dakisolatie', city: 'Gent', type: 'Sarking methode', emoji: '🏠' },
  { name: 'Nieuwe ramen', city: 'Brugge', type: 'PVC driedubbel glas', emoji: '🪟' },
]

const suppliers = [
  { name: 'EcoWarm Solutions', rating: 4.8, match: 98, city: 'Antwerpen' },
  { name: 'GreenHeat Belgium', rating: 4.9, match: 95, city: 'Gent' },
  { name: 'Klimaat Comfort', rating: 4.5, match: 92, city: 'Mechelen' },
]

type Phase = 'idle' | 'flying-in' | 'processing' | 'flying-out' | 'done'

export function MatchingAnimation() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeStep, setActiveStep] = useState(0)
  const [phase, setPhase] = useState<Phase>('idle')
  const [progress, setProgress] = useState(0)
  const [activeIdx, setActiveIdx] = useState(0)
  const [targetSupplier, setTargetSupplier] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const runCycle = useCallback((idx: number) => {
    // Reset
    setActiveIdx(idx)
    setTargetSupplier(idx % 3)
    setActiveStep(0)
    setPhase('idle')
    setProgress(0)

    // Step 1 — highlight project
    timerRef.current = setTimeout(() => {
      setActiveStep(1)
      setPhase('flying-in') // project card flies to center
    }, 800)

    // Step 2 — processing in center
    timerRef.current = setTimeout(() => {
      setPhase('processing')
      // Animate progress bar
      let p = 0
      const iv = setInterval(() => {
        p += 3
        setProgress(Math.min(p, 100))
        if (p >= 100) clearInterval(iv)
      }, 30)
    }, 2200)

    // Step 3 — fly out to supplier
    timerRef.current = setTimeout(() => {
      setActiveStep(2)
      setPhase('flying-out')
    }, 3600)

    // Step 4 — done / matched
    timerRef.current = setTimeout(() => {
      setActiveStep(3)
      setPhase('done')
    }, 4800)

    // Restart
    timerRef.current = setTimeout(() => {
      runCycle((idx + 1) % 3)
    }, 7500)
  }, [])

  useEffect(() => {
    if (!isInView) return
    const t = setTimeout(() => runCycle(0), 600)
    return () => {
      clearTimeout(t)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isInView, runCycle])

  return (
    <section ref={ref} className="relative bg-gradient-to-b from-white via-primary-50/40 to-white py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl">
            Hoe werkt Planora?
          </h2>
          <p className="mt-5 text-lg text-neutral-500 max-w-2xl mx-auto">
            In vier stappen van idee naar de perfecte installateur. Wij doen het zware werk.
          </p>
        </motion.div>

        {/* ── Steps row ── */}
        <motion.div
          className="flex items-center justify-center gap-2 sm:gap-5 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {steps.map((s, i) => (
            <div key={s.title} className="flex items-center gap-2 sm:gap-5">
              <div className="flex flex-col items-center w-20 sm:w-28">
                <motion.div
                  className={cn(
                    'flex h-16 w-16 sm:h-[72px] sm:w-[72px] items-center justify-center rounded-2xl shadow-sm transition-all duration-700',
                    i <= activeStep
                      ? i === 3 && phase === 'done'
                        ? 'bg-accent-500 text-white shadow-accent-500/25'
                        : 'bg-primary-700 text-white shadow-primary-700/25'
                      : 'bg-primary-50 text-primary-300'
                  )}
                  animate={i === activeStep ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                  transition={{ duration: 0.8, repeat: i === activeStep ? Infinity : 0, repeatDelay: 1.2 }}
                >
                  <s.icon size={28} />
                </motion.div>
                <p className={cn(
                  'mt-3 text-xs sm:text-sm font-semibold text-center leading-tight transition-colors duration-500',
                  i <= activeStep ? 'text-neutral-900' : 'text-neutral-300'
                )}>
                  {s.title}
                </p>
                <p className={cn(
                  'text-[10px] sm:text-xs text-center leading-tight mt-1 transition-colors duration-500 hidden sm:block',
                  i <= activeStep ? 'text-neutral-500' : 'text-neutral-300'
                )}>
                  {s.desc}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="relative h-[3px] w-8 sm:w-16 mt-[-36px] bg-primary-100 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-primary-700 rounded-full"
                    animate={{ width: i < activeStep ? '100%' : '0%' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* ── Main card ── */}
        <motion.div
          className="mx-auto max-w-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative rounded-[2rem] border border-primary-100 bg-white shadow-2xl shadow-primary-900/[0.06] overflow-hidden">

            {/* ── Top progress bar ── */}
            <div className="h-2 bg-primary-50">
              <motion.div
                className="h-full rounded-r-full"
                style={{
                  background: phase === 'done'
                    ? 'linear-gradient(90deg, #2D2166, #22c55e)'
                    : 'linear-gradient(90deg, #2D2166, #6651AC)',
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.04, ease: 'linear' }}
              />
            </div>

            <div className="p-10 sm:p-14">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_200px_1fr] items-center min-h-[380px]">

                {/* ── LEFT: Projects ── */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-400 mb-6">
                    Jouw project
                  </p>
                  <div className="space-y-4 relative">
                    {projects.map((p, i) => {
                      const isActive = i === activeIdx
                      const isFlying = isActive && (phase === 'flying-in' || phase === 'processing')
                      return (
                        <motion.div
                          key={p.name}
                          className={cn(
                            'rounded-2xl border-2 p-5 transition-colors duration-500 relative z-10',
                            isActive
                              ? 'border-primary-400 bg-primary-50/80'
                              : 'border-neutral-100 bg-white'
                          )}
                          animate={
                            isFlying
                              ? { x: 80, opacity: 0.3, scale: 0.92 }
                              : { x: 0, opacity: isActive ? 1 : 0.5, scale: 1 }
                          }
                          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{p.emoji}</span>
                            <div>
                              <p className="font-bold text-neutral-900">{p.name}</p>
                              <p className="text-sm text-neutral-500">{p.city} — {p.type}</p>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* ── CENTER: Planora matching engine ── */}
                <div className="flex flex-col items-center justify-center gap-5">
                  {/* Floating project ghost that travels L→C→R */}
                  <AnimatePresence>
                    {(phase === 'flying-in' || phase === 'processing') && (
                      <motion.div
                        className="absolute z-20 rounded-xl bg-primary-100 border border-primary-300 px-4 py-2.5 shadow-lg"
                        initial={{ x: -180, y: 0, opacity: 0, scale: 0.8 }}
                        animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <p className="text-xs font-bold text-primary-700 whitespace-nowrap">
                          {projects[activeIdx].emoji} {projects[activeIdx].name}
                        </p>
                      </motion.div>
                    )}
                    {phase === 'flying-out' && (
                      <motion.div
                        className="absolute z-20 rounded-xl bg-accent-100 border border-accent-300 px-4 py-2.5 shadow-lg"
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{ x: 180, y: 0, opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <p className="text-xs font-bold text-accent-700 whitespace-nowrap">
                          ✓ {suppliers[targetSupplier].match}% match
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Planora icon with animated ring */}
                  <div className="relative">
                    {/* Outer spinning ring */}
                    <svg className="absolute -inset-3 h-[calc(100%+24px)] w-[calc(100%+24px)]" viewBox="0 0 100 100">
                      <circle
                        cx="50" cy="50" r="46"
                        fill="none"
                        stroke="#D5CEE8"
                        strokeWidth="2"
                      />
                      {(phase === 'processing' || phase === 'flying-in') && (
                        <motion.circle
                          cx="50" cy="50" r="46"
                          fill="none"
                          stroke={phase === 'processing' ? '#2D2166' : '#6651AC'}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray="289"
                          initial={{ strokeDashoffset: 289 }}
                          animate={{ strokeDashoffset: phase === 'processing' ? 0 : 200 }}
                          transition={{ duration: phase === 'processing' ? 1.4 : 0.8, ease: 'easeInOut' }}
                          style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
                        />
                      )}
                      {phase === 'done' && (
                        <motion.circle
                          cx="50" cy="50" r="46"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray="289"
                          initial={{ strokeDashoffset: 289 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: 0.6 }}
                          style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
                        />
                      )}
                    </svg>

                    <motion.div
                      className={cn(
                        'relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-700',
                        phase === 'done'
                          ? 'bg-accent-50 shadow-xl shadow-accent-500/20'
                          : phase === 'processing'
                          ? 'bg-primary-50 shadow-xl shadow-primary-600/20'
                          : 'bg-primary-50 shadow-lg shadow-primary-600/10'
                      )}
                      animate={
                        phase === 'processing'
                          ? { scale: [1, 1.05, 0.97, 1] }
                          : phase === 'done'
                          ? { scale: [1, 1.1, 1] }
                          : {}
                      }
                      transition={{ duration: 1.2, repeat: phase === 'processing' ? Infinity : 0 }}
                    >
                      <img src="/favicon.png" alt="Planora" className="h-10 w-10 rounded-lg" />
                    </motion.div>
                  </div>

                  {/* Status text */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={phase}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-center min-h-[44px]"
                    >
                      {phase === 'idle' && (
                        <p className="text-sm text-neutral-400">Project selecteren...</p>
                      )}
                      {phase === 'flying-in' && (
                        <p className="text-sm font-medium text-primary-600">Project ontvangen</p>
                      )}
                      {phase === 'processing' && (
                        <div>
                          <p className="text-sm font-semibold text-primary-700">Installateurs zoeken...</p>
                          <p className="text-xs text-primary-400 mt-1">{Math.round(progress)}%</p>
                        </div>
                      )}
                      {phase === 'flying-out' && (
                        <p className="text-sm font-semibold text-accent-600">Match gevonden!</p>
                      )}
                      {phase === 'done' && (
                        <div>
                          <motion.p
                            className="text-sm font-bold text-accent-600"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                          >
                            3 matches gevonden!
                          </motion.p>
                          <p className="text-xs text-accent-500 mt-1">Top installateurs geselecteerd</p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ── RIGHT: Suppliers ── */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-400 mb-6">
                    Beste installateurs
                  </p>
                  <div className="space-y-4">
                    {suppliers.map((s, i) => {
                      const isTarget = i === targetSupplier
                      const isMatched = phase === 'done' || (phase === 'flying-out' && isTarget)
                      return (
                        <motion.div
                          key={s.name}
                          className={cn(
                            'rounded-2xl border-2 p-5 transition-colors duration-500',
                            isMatched
                              ? isTarget
                                ? 'border-accent-400 bg-accent-50/80'
                                : 'border-accent-200 bg-accent-50/40'
                              : 'border-neutral-100 bg-white'
                          )}
                          animate={
                            isMatched
                              ? { opacity: 1, x: 0 }
                              : phase === 'processing'
                              ? { opacity: 0.35 }
                              : { opacity: 0.3, x: 0 }
                          }
                          transition={{ duration: 0.6, delay: isMatched && phase === 'done' ? i * 0.12 : 0 }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className={cn(
                                'font-bold transition-colors duration-500',
                                isMatched ? 'text-neutral-900' : 'text-neutral-400'
                              )}>
                                {s.name}
                              </p>
                              <p className="text-sm text-neutral-500 mt-0.5">
                                ★ {s.rating} — {s.city}
                              </p>
                            </div>
                            <AnimatePresence>
                              {isMatched && (
                                <motion.span
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ type: 'spring', delay: phase === 'done' ? 0.2 + i * 0.12 : 0 }}
                                  className={cn(
                                    'rounded-full px-3 py-1.5 text-xs font-bold',
                                    isTarget
                                      ? 'bg-accent-500 text-white'
                                      : 'bg-accent-100 text-accent-700'
                                  )}
                                >
                                  {s.match}%
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href="/app/nieuw-project"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-10 py-4 text-base font-semibold text-white shadow-xl shadow-primary-600/25 hover:bg-primary-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5"
          >
            Probeer het zelf — gratis
            <ArrowRight size={18} />
          </a>
          <p className="mt-4 text-sm text-neutral-400">Geen registratie nodig om te starten</p>
        </motion.div>
      </div>
    </section>
  )
}
