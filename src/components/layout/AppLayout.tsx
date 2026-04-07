import { Outlet, Navigate } from 'react-router-dom'
import { Header } from './Header'
import { MobileTabBar } from './MobileTabBar'
import { useAuth } from '@/hooks/useAuth'

export function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 pb-24 sm:px-6 md:pb-8 lg:px-8">
        <Outlet />
      </main>
      <MobileTabBar />
    </div>
  )
}
