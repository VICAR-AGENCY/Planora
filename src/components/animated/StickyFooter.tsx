import { type ReactNode } from 'react'

interface StickyFooterProps {
  children: ReactNode
}

export function StickyFooter({ children }: StickyFooterProps) {
  return (
    <div className="relative">
      <div className="sticky bottom-0 z-0">
        {children}
      </div>
    </div>
  )
}
