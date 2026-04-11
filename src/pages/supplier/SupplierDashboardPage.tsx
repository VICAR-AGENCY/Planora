import { Link } from 'react-router-dom'
import {
  ClipboardList,
  FolderOpen,
  FileText,
  MessageSquare,
  ArrowRight,
  MapPin,
  Clock,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useSupplier, useSupplierMatches, useSupplierStats } from '@/hooks/useSupplier'

const statusLabels: Record<string, string> = {
  pending: 'Nieuw',
  accepted: 'Geaccepteerd',
  rejected: 'Afgewezen',
  completed: 'Afgerond',
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  completed: 'bg-neutral-100 text-neutral-600',
}

export function SupplierDashboardPage() {
  const { data: supplier } = useSupplier()
  const { data: matches, isLoading: matchesLoading } = useSupplierMatches()
  const { data: stats, isLoading: statsLoading } = useSupplierStats()

  const recentMatches = matches?.slice(0, 5) ?? []

  return (
    <div className="space-y-8">
      {/* Onboarding banner */}
      {supplier && !supplier.onboarding_completed && (
        <div className="flex items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <AlertCircle size={20} className="text-amber-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-amber-900">Jouw profiel is nog niet volledig</p>
            <p className="mt-1 text-sm text-amber-700">
              Vul je specialisaties, werkgebied en beschikbaarheid in zodat klanten je kunnen vinden.
            </p>
          </div>
          <Link
            to="/supplier/onboarding"
            className="shrink-0 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 transition-colors"
          >
            Profiel voltooien
          </Link>
        </div>
      )}

      {/* Welcome header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Welkom terug, {supplier?.company_name ?? 'Installateur'}
          </h1>
          <p className="mt-1 text-neutral-500">
            Beheer je projecten, offertes en berichten op een plek.
          </p>
        </div>
        <Link
          to="/supplier/onboarding"
          className="hidden sm:flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors"
        >
          <RefreshCw size={14} />
          Profiel bijwerken
        </Link>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={ClipboardList}
          label="Nieuwe aanvragen"
          value={stats?.pendingMatches ?? 0}
          loading={statsLoading}
          color="amber"
        />
        <StatCard
          icon={FolderOpen}
          label="Actieve projecten"
          value={stats?.activeProjects ?? 0}
          loading={statsLoading}
          color="green"
        />
        <StatCard
          icon={FileText}
          label="Verstuurde offertes"
          value={stats?.totalQuotes ?? 0}
          loading={statsLoading}
          color="primary"
        />
      </div>

      {/* Recent matches */}
      <div className="rounded-2xl border border-neutral-200 bg-white">
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-neutral-900">
            Recente projectmatches
          </h2>
          <Link
            to="/supplier/projecten"
            className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            Alle projecten
            <ArrowRight size={14} />
          </Link>
        </div>

        {matchesLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-200 border-t-primary-600" />
          </div>
        ) : recentMatches.length === 0 ? (
          <div className="py-12 text-center">
            <FolderOpen className="mx-auto h-10 w-10 text-neutral-300" />
            <p className="mt-3 text-sm text-neutral-500">
              Nog geen projectmatches. Nieuwe aanvragen verschijnen hier.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {recentMatches.map((match: any) => (
              <li key={match.id}>
                <Link
                  to={`/supplier/projecten/${match.project?.id}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                    <FolderOpen size={18} className="text-primary-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-neutral-900">
                      {match.project?.title ?? 'Onbekend project'}
                    </p>
                    <div className="mt-0.5 flex items-center gap-3 text-xs text-neutral-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {match.project?.city ?? '—'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(match.created_at).toLocaleDateString('nl-BE')}
                      </span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      'shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium',
                      statusColors[match.status] ?? statusColors.pending
                    )}
                  >
                    {statusLabels[match.status] ?? match.status}
                  </span>
                  <ArrowRight size={16} className="shrink-0 text-neutral-300" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick links */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/supplier/berichten"
          className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white px-6 py-5 hover:border-primary-200 hover:shadow-sm transition-all"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
            <MessageSquare size={22} className="text-primary-600" />
          </div>
          <div>
            <p className="font-medium text-neutral-900">Berichten</p>
            <p className="text-sm text-neutral-500">
              Communiceer met huiseigenaars
            </p>
          </div>
        </Link>
        <Link
          to="/supplier/offertes"
          className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white px-6 py-5 hover:border-primary-200 hover:shadow-sm transition-all"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
            <FileText size={22} className="text-primary-600" />
          </div>
          <div>
            <p className="font-medium text-neutral-900">Offertes</p>
            <p className="text-sm text-neutral-500">
              Bekijk en beheer je offertes
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  loading,
  color,
}: {
  icon: typeof ClipboardList
  label: string
  value: number
  loading: boolean
  color: 'amber' | 'green' | 'primary'
}) {
  const bgColors = {
    amber: 'bg-amber-50',
    green: 'bg-green-50',
    primary: 'bg-primary-50',
  }
  const iconColors = {
    amber: 'text-amber-600',
    green: 'text-green-600',
    primary: 'text-primary-600',
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl',
            bgColors[color]
          )}
        >
          <Icon size={20} className={iconColors[color]} />
        </div>
        <div>
          <p className="text-sm text-neutral-500">{label}</p>
          {loading ? (
            <div className="mt-1 h-7 w-12 animate-pulse rounded bg-neutral-100" />
          ) : (
            <p className="text-2xl font-bold text-neutral-900">{value}</p>
          )}
        </div>
      </div>
    </div>
  )
}
