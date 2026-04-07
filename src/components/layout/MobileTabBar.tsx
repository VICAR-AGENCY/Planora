import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, MessageCircle, User } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const tabs = [
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/app/berichten', icon: MessageCircle, label: 'Berichten', badge: true },
  { to: '/app/profiel', icon: User, label: 'Profiel' },
]

export function MobileTabBar() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-primary-100 bg-white md:hidden">
      <div className="flex h-16 items-center justify-around">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.to)
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors',
                isActive ? 'text-primary-700' : 'text-neutral-400'
              )}
            >
              <div className="relative">
                <tab.icon size={22} />
                {tab.badge && (
                  <span className="absolute -right-1.5 -top-1.5 h-2.5 w-2.5 rounded-full bg-red-500" />
                )}
              </div>
              {tab.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
