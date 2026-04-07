import { Outlet, Navigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useSupplier } from '@/hooks/useSupplier'
import { cn } from '@/lib/utils/cn'
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  MessageSquare,
  UserCircle,
  Menu,
  X,
  Wrench,
} from 'lucide-react'
import { useState } from 'react'

const supplierNavItems = [
  { label: 'Dashboard', to: '/supplier/dashboard', icon: LayoutDashboard },
  { label: 'Projecten', to: '/supplier/projecten', icon: FolderOpen },
  { label: 'Offertes', to: '/supplier/offertes', icon: FileText },
  { label: 'Berichten', to: '/supplier/berichten', icon: MessageSquare },
  { label: 'Profiel', to: '/supplier/profiel', icon: UserCircle },
]

export function SupplierLayout() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const { data: supplier, isLoading: supplierLoading } = useSupplier()
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (authLoading || supplierLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!supplier) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="rounded-full bg-red-100 p-4">
          <X className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-xl font-semibold text-neutral-900">
          Geen toegang
        </h1>
        <p className="max-w-md text-neutral-500">
          Je hebt geen leveranciersaccount. Neem contact op met Planora als je
          denkt dat dit een fout is.
        </p>
        <Link
          to="/"
          className="mt-2 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
        >
          Terug naar home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="border-b border-primary-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link to="/supplier/dashboard" className="shrink-0">
              <img src="/logo.png" alt="Planora" className="h-8" />
            </Link>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
              <Wrench size={12} />
              Installateur
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {supplierNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.to)
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  )}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right side */}
          <div className="hidden items-center gap-3 md:flex">
            <div className="text-right">
              <p className="text-sm font-medium text-neutral-900">
                {supplier.company_name}
              </p>
              <p className="text-xs text-neutral-500">
                {supplier.contact_name}
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-sm font-bold text-primary-700">
                {supplier.company_name?.charAt(0)?.toUpperCase() ?? 'V'}
              </span>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="border-t border-primary-100 bg-white px-4 pb-4 md:hidden">
            <div className="flex flex-col gap-1 pt-3">
              {supplierNavItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname.startsWith(item.to)
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'text-primary-700 bg-primary-50'
                        : 'text-neutral-600 hover:bg-neutral-50'
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </nav>
        )}
      </header>

      {/* Mobile bottom tab bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white md:hidden">
        <nav className="mx-auto flex max-w-lg items-center justify-around px-2 py-1.5">
          {supplierNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname.startsWith(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 text-[10px] font-medium transition-colors',
                  isActive
                    ? 'text-primary-700'
                    : 'text-neutral-400 hover:text-neutral-600'
                )}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8 pb-24 sm:px-6 md:pb-8 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}
