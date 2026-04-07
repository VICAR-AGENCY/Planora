import { Link } from 'react-router-dom'
import { Plus, Calculator, Flame, DoorOpen, Home, Calendar } from 'lucide-react'
import { useProjects } from '@/hooks/useProject'
import { useAuth } from '@/hooks/useAuth'

const STATUS_LABELS: Record<string, string> = {
  intake: 'Intake',
  ready: 'Klaar voor matching',
  matching: 'Matching',
  comparing: 'Offertes vergelijken',
  decided: 'Beslist',
  completed: 'Afgerond',
}

const STATUS_COLORS: Record<string, string> = {
  intake: 'bg-warm-100 text-warm-500',
  ready: 'bg-primary-100 text-primary-600',
  matching: 'bg-primary-100 text-primary-600',
  comparing: 'bg-accent-100 text-accent-600',
  decided: 'bg-accent-100 text-accent-700',
  completed: 'bg-neutral-100 text-neutral-600',
}

const CATEGORY_ICONS: Record<string, typeof Flame> = {
  heat_pump_air_water: Flame,
  heat_pump_ground_water: Flame,
  heat_pump_hybrid: Flame,
  windows_doors: DoorOpen,
  roof_insulation: Home,
}

export function DashboardPage() {
  const { data: projects, isLoading } = useProjects()
  const { user } = useAuth()

  return (
    <div>
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">
          Welkom{user?.email ? `, ${user.email.split('@')[0]}` : ''}
        </h1>
        <p className="mt-1 text-neutral-500">Beheer je woningprojecten en vergelijk offertes.</p>
      </div>

      {/* Quick actions */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <Link
          to="/app/nieuw-project"
          className="flex items-center gap-4 rounded-xl border border-primary-100 bg-white p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
            <Plus size={20} className="text-primary-600" />
          </div>
          <div>
            <p className="font-semibold text-neutral-900">Nieuw project</p>
            <p className="text-sm text-neutral-500">Start een nieuw woningproject</p>
          </div>
        </Link>
        <Link
          to="/calculator/warmtepomp"
          className="flex items-center gap-4 rounded-xl border border-primary-100 bg-white p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50">
            <Calculator size={20} className="text-accent-600" />
          </div>
          <div>
            <p className="font-semibold text-neutral-900">Bereken kosten</p>
            <p className="text-sm text-neutral-500">Warmtepomp kostenberekening</p>
          </div>
        </Link>
      </div>

      {/* Projects */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-neutral-900">Mijn projecten</h2>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-xl border border-neutral-100 bg-white p-5">
              <div className="h-4 w-24 rounded bg-neutral-200" />
              <div className="mt-3 h-3 w-16 rounded bg-neutral-100" />
              <div className="mt-4 h-6 w-20 rounded-full bg-neutral-100" />
            </div>
          ))}
        </div>
      ) : !projects?.length ? (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-primary-200 bg-primary-50/50 p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100">
            <Flame className="h-8 w-8 text-primary-400" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-neutral-900">Nog geen projecten</h3>
          <p className="mt-2 text-neutral-500">Start je eerste project en ontvang advies op maat.</p>
          <Link
            to="/app/nieuw-project"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
          >
            <Plus size={16} />
            Start je eerste project
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const Icon = CATEGORY_ICONS[project.category] ?? Flame
            return (
              <Link
                key={project.id}
                to={`/app/project/${project.id}`}
                className="rounded-xl border border-neutral-100 bg-white p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                    <Icon size={18} className="text-primary-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-neutral-900 truncate">{project.title}</h3>
                    <p className="mt-0.5 text-sm text-neutral-500">{project.city}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${STATUS_COLORS[project.status] ?? 'bg-neutral-100 text-neutral-600'}`}>
                    {STATUS_LABELS[project.status] ?? project.status}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-neutral-400">
                    <Calendar size={12} />
                    {new Date(project.created_at).toLocaleDateString('nl-BE')}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
