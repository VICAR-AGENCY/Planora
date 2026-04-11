import { Outlet, Navigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useSupplier } from '@/hooks/useSupplier'
import { Header } from './Header'
import { MobileTabBar } from './MobileTabBar'
import { Wrench } from 'lucide-react'

export function SupplierLayout() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const { data: supplier, isLoading: supplierLoading } = useSupplier()

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
        <div className="rounded-full bg-amber-100 p-4">
          <Wrench className="h-8 w-8 text-amber-600" />
        </div>
        <h1 className="text-xl font-semibold text-neutral-900">
          Geen vakman-account gevonden
        </h1>
        <p className="max-w-sm text-sm text-neutral-500">
          Je bent ingelogd maar hebt nog geen vakman-profiel. Log in via de vakman-pagina om je account te activeren.
        </p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <Link
            to="/supplier/login"
            className="rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
          >
            Naar vakman-login
          </Link>
          <Link
            to="/app/dashboard"
            className="rounded-xl border border-neutral-200 px-6 py-2.5 text-sm font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors"
          >
            Naar particulier dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Subheader zit in Header component zelf (altijd zichtbaar als vakman) */}
      <Header />

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8 pb-24 sm:px-6 md:pb-8 lg:px-8">
        <Outlet />
      </main>

      <MobileTabBar />
    </div>
  )
}
