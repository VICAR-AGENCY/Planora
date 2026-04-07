import { forwardRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import { ArrowRight } from 'lucide-react'

interface InteractiveHoverButtonProps {
  children: ReactNode
  className?: string
  asChild?: boolean
  onClick?: () => void
}

export const InteractiveHoverButton = forwardRef<HTMLElement, InteractiveHoverButtonProps>(
  function InteractiveHoverButton({ children, className, asChild, ...props }, ref) {
    // When asChild, we wrap children in styled span and clone the child element's props
    if (asChild && children && typeof children === 'object' && 'type' in children) {
      const child = children as React.ReactElement<any>
      return (
        <child.type
          {...child.props}
          {...props}
          ref={ref}
          className={cn(
            'group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-600/25 hover:bg-primary-700 transition-all duration-300',
            className,
            child.props.className
          )}
        >
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {child.props.children}
          </span>
          <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
        </child.type>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(
          'group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-600/25 hover:bg-primary-700 transition-all duration-300',
          className
        )}
        {...props}
      >
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {children}
        </span>
        <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    )
  }
)
