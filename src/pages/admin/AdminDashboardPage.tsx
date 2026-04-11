import { Users, Wrench, TrendingUp, Mail } from 'lucide-react'
import { useAdminStats } from '@/hooks/useAdmin'

export function AdminDashboardPage() {
  const { data: stats, isLoading } = useAdminStats()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Overzicht</h1>
        <p className="mt-1 text-sm text-white/40">Platform statistieken in real-time.</p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Particulieren"
          value={stats?.totalHomeowners ?? 0}
          sub={`+${stats?.newHomeowners ?? 0} deze week`}
          loading={isLoading}
          color="blue"
        />
        <StatCard
          icon={Wrench}
          label="Vakmensen"
          value={stats?.totalSuppliers ?? 0}
          sub={`+${stats?.newSuppliers ?? 0} deze week`}
          loading={isLoading}
          color="purple"
        />
        <StatCard
          icon={TrendingUp}
          label="Totaal gebruikers"
          value={(stats?.totalHomeowners ?? 0) + (stats?.totalSuppliers ?? 0)}
          sub="Particulieren + vakmensen"
          loading={isLoading}
          color="green"
        />
        <StatCard
          icon={Mail}
          label="Leads"
          value={stats?.totalLeads ?? 0}
          sub="Pre-registraties"
          loading={isLoading}
          color="amber"
        />
      </div>

      {/* Quick links */}
      <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
        <h2 className="mb-4 text-sm font-semibold text-white/60 uppercase tracking-wider">Snelle acties</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <QuickLink
            href="/admin/gebruikers"
            icon={Users}
            label="Alle particulieren bekijken"
            desc={`${stats?.totalHomeowners ?? '—'} geregistreerde huiseigenaars`}
          />
          <QuickLink
            href="/admin/gebruikers"
            icon={Wrench}
            label="Alle vakmensen bekijken"
            desc={`${stats?.totalSuppliers ?? '—'} geregistreerde installateurs`}
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  loading,
  color,
}: {
  icon: typeof Users
  label: string
  value: number
  sub: string
  loading: boolean
  color: 'blue' | 'purple' | 'green' | 'amber'
}) {
  const iconBg = {
    blue:   'bg-blue-500/15 text-blue-400',
    purple: 'bg-primary-500/15 text-primary-400',
    green:  'bg-green-500/15 text-green-400',
    amber:  'bg-amber-500/15 text-amber-400',
  }[color]

  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon size={18} />
        </div>
        <p className="text-sm text-white/50">{label}</p>
      </div>
      {loading ? (
        <div className="h-8 w-16 animate-pulse rounded-lg bg-white/8" />
      ) : (
        <p className="text-3xl font-bold text-white">{value.toLocaleString('nl-BE')}</p>
      )}
      <p className="mt-1 text-xs text-white/30">{sub}</p>
    </div>
  )
}

function QuickLink({
  href,
  icon: Icon,
  label,
  desc,
}: {
  href: string
  icon: typeof Users
  label: string
  desc: string
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/3 px-5 py-4 transition-colors hover:border-primary-500/40 hover:bg-primary-500/5"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-500/15">
        <Icon size={18} className="text-primary-400" />
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-xs text-white/40">{desc}</p>
      </div>
    </a>
  )
}
