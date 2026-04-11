import { useEffect, useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, LogOut, Shield } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { cn } from '@/lib/utils/cn'

export function AdminLayout() {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const verify = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate('/admin/login', { replace: true })
        return
      }
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      console.log('[AdminLayout] profile:', profile, 'error:', error)

      if (error || profile?.role !== 'admin') {
        await supabase.auth.signOut()
        navigate('/admin/login', { replace: true })
        return
      }
      setChecking(false)
    }
    verify()
  }, [navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-700 border-t-primary-300" />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-neutral-950 text-white">
      {/* Sidebar */}
      <aside className="flex w-56 flex-col border-r border-white/8 bg-neutral-900">
        {/* Logo */}
        <div className="flex items-center gap-2.5 border-b border-white/8 px-5 py-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600">
            <Shield size={14} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Planora</p>
            <p className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Admin</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 px-3 py-4">
          <NavItem to="/admin" icon={LayoutDashboard} label="Overzicht" end />
          <NavItem to="/admin/gebruikers" icon={Users} label="Gebruikers" />
        </nav>

        {/* Logout */}
        <div className="border-t border-white/8 px-3 py-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/50 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut size={16} />
            Uitloggen
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-neutral-950">
        <div className="mx-auto max-w-6xl px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

function NavItem({
  to,
  icon: Icon,
  label,
  end,
}: {
  to: string
  icon: typeof LayoutDashboard
  label: string
  end?: boolean
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-primary-600/20 text-primary-300'
            : 'text-white/50 hover:bg-white/5 hover:text-white'
        )
      }
    >
      <Icon size={16} />
      {label}
    </NavLink>
  )
}
