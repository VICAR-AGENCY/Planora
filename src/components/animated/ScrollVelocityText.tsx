import { cn } from '@/lib/utils/cn'

interface ScrollVelocityTextProps {
  texts: string[]
  className?: string
}

export function ScrollVelocityText({ texts, className }: ScrollVelocityTextProps) {
  const content = texts.join(' — ')

  return (
    <div className={cn('overflow-hidden bg-primary-700 py-3', className)}>
      <div className="flex animate-marquee whitespace-nowrap">
        {[0, 1, 2].map((i) => (
          <span key={i} className="mx-8 text-sm font-medium text-primary-200">
            {content} —
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  )
}
