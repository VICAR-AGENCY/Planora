import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface AnimatedTextCycleProps {
  words: string[]
  className?: string
}

export function AnimatedTextCycle({ words, className }: AnimatedTextCycleProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <span className={cn('inline-block relative', className)} style={{ minWidth: '200px' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="inline-block text-primary-500"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
