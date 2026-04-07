import { useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface GlareCardProps {
  children: ReactNode
  className?: string
}

export function GlareCard({ children, className }: GlareCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateX = (y - 0.5) * -10
    const rotateY = (x - 0.5) * 10
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`)
    setGlarePos({ x: x * 100, y: y * 100 })
  }

  const handleMouseLeave = () => {
    setTransform('')
    setGlarePos({ x: 50, y: 50 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-primary-100 bg-white p-8 transition-transform duration-200 ease-out',
        className
      )}
      style={{ transform }}
    >
      {/* Glare overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(139,121,192,0.15) 0%, transparent 60%)`,
        }}
      />
      {children}
    </div>
  )
}
