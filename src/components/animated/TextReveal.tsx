import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface TextRevealProps {
  text: string
  className?: string
}

export function TextReveal({ text, className }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.3'],
  })

  const words = text.split(' ')

  return (
    <div ref={ref} className={className}>
      <p className="text-2xl font-bold leading-relaxed text-neutral-900 sm:text-3xl lg:text-4xl max-w-[680px]">
        {words.map((word, i) => (
          <Word key={i} index={i} total={words.length} progress={scrollYProgress}>
            {word}
          </Word>
        ))}
      </p>
    </div>
  )
}

function Word({
  children,
  index,
  total,
  progress,
}: {
  children: string
  index: number
  total: number
  progress: any
}) {
  const start = index / total
  const end = start + 1 / total
  const opacity = useTransform(progress, [start, end], [0.2, 1])

  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  )
}
